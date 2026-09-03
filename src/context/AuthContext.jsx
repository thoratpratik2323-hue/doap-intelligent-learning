import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged, 
  updateProfile as updateFirebaseProfile 
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { firebaseAuth, db } from '../lib/firebaseClient';

const AuthContext = createContext();

const mapFirebaseAuthError = (err) => {
  if (!err) return '';
  const code = (err.code || '').toLowerCase();
  const message = err.message || '';

  if (code.includes('email-already-in-use') || code.includes('email-already-exists')) {
    return 'An account with this email already exists. Please sign in instead.';
  }
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
    return 'Incorrect email address or password.';
  }
  if (code.includes('weak-password')) {
    return 'Password is too weak. Please use at least 8 characters.';
  }
  if (code.includes('invalid-email')) {
    return 'Please enter a valid email address.';
  }
  if (code.includes('too-many-requests')) {
    return 'Too many failed attempts. Please wait a few moments and try again.';
  }
  if (code.includes('network-request-failed')) {
    return 'Network connection error. Please check your internet connection.';
  }
  if (code.includes('operation-not-allowed') || code.includes('admin-restricted-operation')) {
    return 'Email/Password sign-in is not enabled in Firebase Console. Please enable it in Firebase Authentication > Sign-in method.';
  }
  return message || 'Authentication failed. Please try again.';
};

function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const DEFAULT_USER_PROGRESS = {
  tasks: [],
  courses: {},
  solvedProblems: [],
  assessments: [],
  interviewCount: 0
};

function createCleanUserProfile(firebaseUser, fullName = '') {
  const resolvedName = fullName || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User';
  return {
    user_id: firebaseUser.uid,
    name: resolvedName,
    full_name: resolvedName,
    email: firebaseUser.email || '',
    avatar: getInitials(resolvedName),
    avatar_url: '',
    title: '',
    university: '',
    course: '',
    year: '',
    education: '',
    bio: '',
    skills: [],
    interests: [],
    careerGoals: [],
    stats: {
      achievements: 0,
      dayStreak: 1,
      aiReadiness: 0
    },
    progress: { ...DEFAULT_USER_PROGRESS }
  };
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'reset'

  // Load user profile & progress from Firestore Cloud Database + local storage
  const loadProfile = async (firebaseUser, defaultName = '') => {
    const uid = firebaseUser.uid;
    const storageKey = `doap_user_profile_${uid}`;
    let baseProfile = null;

    // 1. Instant local storage read
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        baseProfile = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse local profile', e);
    }

    if (!baseProfile) {
      baseProfile = createCleanUserProfile(firebaseUser, defaultName);
      try {
        localStorage.setItem(storageKey, JSON.stringify(baseProfile));
      } catch {}
    }

    setProfile(baseProfile);

    // 2. Fetch live data from Firestore across all devices
    if (db) {
      try {
        const userDocRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const remoteData = docSnap.data();
          const merged = { 
            ...baseProfile, 
            ...remoteData,
            progress: {
              ...DEFAULT_USER_PROGRESS,
              ...(baseProfile.progress || {}),
              ...(remoteData.progress || {})
            }
          };
          setProfile(merged);
          try {
            localStorage.setItem(storageKey, JSON.stringify(merged));
          } catch {}
        } else {
          // If profile doc does not exist yet on cloud, create clean profile
          await setDoc(userDocRef, baseProfile);
        }
      } catch (err) {
        console.warn('[Firestore] Sync notice:', err.message);
      }
    }
  };

  useEffect(() => {
    if (!firebaseAuth) {
      setLoading(false);
      return;
    }

    // Safety timeout: Never stay stuck on loading screen
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 400);

    let unsubscribeDoc = null;

    const unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      clearTimeout(safetyTimer);
      if (firebaseUser) {
        const displayName = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User';
        const userObj = {
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: displayName,
          user_metadata: { full_name: displayName }
        };

        setUser(userObj);
        setSession({ user: userObj });
        await loadProfile(firebaseUser);

        // Realtime Firestore Listener for Cross-Device Sync
        if (db) {
          try {
            unsubscribeDoc = onSnapshot(doc(db, 'users', firebaseUser.uid), (docSnap) => {
              if (docSnap.exists()) {
                const cloudData = docSnap.data();
                setProfile(prev => {
                  if (!prev) return cloudData;
                  const updated = { ...prev, ...cloudData };
                  try {
                    localStorage.setItem(`doap_user_profile_${firebaseUser.uid}`, JSON.stringify(updated));
                  } catch {}
                  return updated;
                });
              }
            }, (err) => {
              console.warn('[Firestore Snapshot] Warning:', err.message);
            });
          } catch (e) {}
        }
      } else {
        if (unsubscribeDoc) unsubscribeDoc();
        setUser(null);
        setSession(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      clearTimeout(safetyTimer);
      if (unsubscribeDoc) unsubscribeDoc();
      unsubscribeAuth();
    };
  }, []);

  // Real Email / Password Signup with Firebase
  const signUp = async (email, password, fullName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const createdUser = userCredential.user;

      if (fullName) {
        await updateFirebaseProfile(createdUser, { displayName: fullName });
      }

      // Initialize clean 100% real user profile (ZERO FAKE DATA)
      const cleanProfile = createCleanUserProfile(createdUser, fullName);
      const storageKey = `doap_user_profile_${createdUser.uid}`;
      try {
        localStorage.setItem(storageKey, JSON.stringify(cleanProfile));
      } catch {}
      setProfile(cleanProfile);

      // Save directly to Firestore Cloud Database
      if (db) {
        setDoc(doc(db, 'users', createdUser.uid), cleanProfile).catch((e) => {
          console.warn('[Firestore] Profile save warning:', e.message);
        });
      }

      const mappedUser = {
        id: createdUser.uid,
        uid: createdUser.uid,
        email: createdUser.email,
        displayName: fullName || createdUser.displayName,
        user_metadata: { full_name: fullName || createdUser.displayName }
      };

      setUser(mappedUser);
      setSession({ user: mappedUser });

      return { user: mappedUser, session: { user: mappedUser } };
    } catch (error) {
      throw new Error(mapFirebaseAuthError(error));
    }
  };

  // Real Email / Password Sign In with Firebase
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const signedInUser = userCredential.user;

      const mappedUser = {
        id: signedInUser.uid,
        uid: signedInUser.uid,
        email: signedInUser.email,
        displayName: signedInUser.displayName || signedInUser.email?.split('@')[0] || 'User',
        user_metadata: { full_name: signedInUser.displayName }
      };

      setUser(mappedUser);
      setSession({ user: mappedUser });
      await loadProfile(signedInUser);

      return { user: mappedUser, session: { user: mappedUser } };
    } catch (error) {
      throw new Error(mapFirebaseAuthError(error));
    }
  };

  // Sign Out
  const signOut = async () => {
    if (firebaseAuth) {
      try {
        await firebaseSignOut(firebaseAuth);
      } catch (e) {}
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  // Password Reset Email
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      return { message: "Password reset link sent to your email." };
    } catch (error) {
      throw new Error(mapFirebaseAuthError(error));
    }
  };

  // Update Profile across Memory, LocalStorage, and Firestore
  const updateProfileData = async (updatedFields) => {
    const uid = user ? user.uid : 'guest';
    const storageKey = user ? `doap_user_profile_${uid}` : 'doap_profile';

    let nextProfile = null;
    setProfile(prev => {
      const next = { ...(prev || createCleanUserProfile({ uid: 'guest' })), ...updatedFields };
      if (updatedFields.name) {
        next.avatar = getInitials(updatedFields.name);
        next.full_name = updatedFields.name;
      }
      nextProfile = next;
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
        localStorage.setItem('doap_profile', JSON.stringify(next));
      } catch {}
      return next;
    });

    // Save to Firestore Cloud Database if user is logged in
    if (db && user && nextProfile) {
      try {
        await setDoc(doc(db, 'users', uid), nextProfile, { merge: true });
      } catch (err) {
        console.warn('[Firestore] Update failed:', err.message);
      }
    }

    if (updatedFields.name && firebaseAuth.currentUser) {
      updateFirebaseProfile(firebaseAuth.currentUser, { displayName: updatedFields.name }).catch(() => {});
    }
  };

  // Update User Learning / Task / Quiz / Coding Progress across Cloud & Local
  const updateUserProgress = async (progressPatch, statsPatch = null) => {
    const uid = user ? user.uid : 'guest';
    const storageKey = user ? `doap_user_profile_${uid}` : 'doap_profile';

    let nextProfile = null;
    setProfile(prev => {
      const current = prev || createCleanUserProfile({ uid: 'guest' });
      const currentProgress = current.progress || { ...DEFAULT_USER_PROGRESS };
      const nextProgress = { ...currentProgress, ...progressPatch };
      const nextStats = statsPatch ? { ...(current.stats || {}), ...statsPatch } : current.stats;
      
      const next = {
        ...current,
        stats: nextStats,
        progress: nextProgress
      };
      nextProfile = next;
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
        localStorage.setItem('doap_profile', JSON.stringify(next));
      } catch {}
      return next;
    });

    if (db && user && nextProfile) {
      try {
        await setDoc(doc(db, 'users', uid), nextProfile, { merge: true });
      } catch (err) {
        console.warn('[Firestore] Progress save failed:', err.message);
      }
    }
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      userProgress: profile?.progress || DEFAULT_USER_PROGRESS,
      loading,
      isConfigured: true,
      isDevBypass: false,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authMode,
      setAuthMode,
      openAuthModal,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updateProfileData,
      updateUserProgress,
      refreshProfile: () => user && loadProfile(user)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
