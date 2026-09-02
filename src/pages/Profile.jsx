import React, { useState } from 'react';
import { Pencil, Target, Palette, Plus, User, Mail, GraduationCap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AppearancePage } from '../components/Shell/AppearancePage';

export const Profile = () => {
  const { profile, setIsEditProfileOpen, isDarkMode, activeAccentHex } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  const hasEducation = profile?.university || profile?.course || profile?.year;
  const hasSkills = profile?.skills && profile.skills.length > 0;
  const hasInterests = profile?.interests && profile.interests.length > 0;
  const hasGoals = profile?.careerGoals && profile.careerGoals.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 md:py-6 animate-page-transition select-none">
      {/* Tab header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--doap-text-prim)' }}>
            {activeTab === 'profile' ? 'Profile' : 'Appearance'}
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--doap-text-sec)' }}>
            {activeTab === 'profile' ? 'Verified student identity & career portfolio' : 'Global personalization system'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 p-1 rounded-2xl border"
            style={{ backgroundColor: 'var(--doap-surface)', borderColor: 'var(--doap-border)' }}
          >
            {[
              { id: 'profile', label: 'Overview' },
              { id: 'appearance', label: 'Appearance', icon: Palette },
            ].map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  style={{
                    backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: active ? 'var(--doap-text-prim)' : 'var(--doap-text-sec)',
                    boxShadow: active ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
                  }}
                >
                  {Icon && <Icon size={13} />}
                  {label}
                </button>
              );
            })}
          </div>

          {activeTab === 'profile' && (
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer hover-glide doap-card"
            >
              <Pencil size={13} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'appearance' && (
        <AppearancePage />
      )}

      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          {/* Left Profile Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl text-center space-y-4 doap-card">
              <div className="flex justify-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black border"
                  style={{ backgroundColor: 'var(--doap-accent)', color: isDarkMode ? '#000' : '#fff', borderColor: 'var(--doap-border)' }}
                >
                  {profile?.avatar || 'U'}
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold" style={{ color: 'var(--doap-text-prim)' }}>{profile?.name || 'User'}</h2>
                <p className="text-xs font-mono" style={{ color: 'var(--doap-text-sec)' }}>{profile?.email || ''}</p>
                {profile?.title && (
                  <p className="text-xs font-semibold pt-1" style={{ color: accentHex }}>{profile.title}</p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 pt-4 border-t text-center" style={{ borderColor: 'var(--doap-border)' }}>
                <div>
                  <div className="text-lg font-black font-mono" style={{ color: 'var(--doap-text-prim)' }}>{profile?.stats?.achievements || 0}</div>
                  <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--doap-text-muted)' }}>Achievements</div>
                </div>
                <div>
                  <div className="text-lg font-black font-mono" style={{ color: 'var(--doap-text-prim)' }}>{profile?.stats?.dayStreak || 1}</div>
                  <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--doap-text-muted)' }}>Day Streak</div>
                </div>
                <div>
                  <div className="text-lg font-black font-mono" style={{ color: 'var(--doap-accent)' }}>{profile?.stats?.aiReadiness || 0}%</div>
                  <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--doap-text-muted)' }}>AI Ready</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-8 space-y-6">
            {/* About Me */}
            <div className="p-6 rounded-3xl space-y-5 doap-card">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest block" style={{ color: 'var(--doap-text-sec)' }}>ABOUT ME</span>
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="text-xs font-semibold flex items-center gap-1 text-neutral-400 hover:text-white"
                >
                  <Pencil size={12} />
                  <span>Edit</span>
                </button>
              </div>

              {profile?.bio ? (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--doap-text-prim)' }}>{profile.bio}</p>
              ) : (
                <div className="py-2 text-center border border-dashed rounded-2xl p-4" style={{ borderColor: 'var(--doap-border)' }}>
                  <p className="text-xs font-mono text-neutral-500 mb-2">No bio added yet.</p>
                  <button
                    onClick={() => setIsEditProfileOpen(true)}
                    className="text-xs font-bold underline cursor-pointer"
                    style={{ color: accentHex }}
                  >
                    + Add Bio & About Details
                  </button>
                </div>
              )}

              {/* Education Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: 'var(--doap-border)' }}>
                {[
                  ['UNIVERSITY / COLLEGE', profile?.university],
                  ['DEGREE / COURSE', profile?.course],
                  ['YEAR OF STUDY', profile?.year]
                ].map(([label, value]) => (
                  <div key={label}>
                    <span className="text-[10px] font-mono uppercase tracking-wider block" style={{ color: 'var(--doap-text-sec)' }}>{label}</span>
                    <span className="text-sm font-bold mt-0.5 block" style={{ color: value ? 'var(--doap-text-prim)' : 'var(--doap-text-muted)' }}>
                      {value || 'Not specified'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div className="p-6 rounded-3xl space-y-4 doap-card">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest block" style={{ color: 'var(--doap-text-sec)' }}>TECHNICAL SKILLS</span>
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="text-xs font-semibold flex items-center gap-1 text-neutral-400 hover:text-white"
                >
                  <Plus size={12} />
                  <span>Add Skills</span>
                </button>
              </div>

              {hasSkills ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-full text-xs font-mono font-semibold doap-card-sec">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="py-2 text-center border border-dashed rounded-2xl p-4" style={{ borderColor: 'var(--doap-border)' }}>
                  <p className="text-xs font-mono text-neutral-500 mb-2">No technical skills added yet.</p>
                  <button
                    onClick={() => setIsEditProfileOpen(true)}
                    className="text-xs font-bold underline cursor-pointer"
                    style={{ color: accentHex }}
                  >
                    + Add Skills (e.g. React, Python, Data Structures)
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Interests */}
              <div className="p-6 rounded-3xl space-y-3 doap-card">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest block" style={{ color: 'var(--doap-text-sec)' }}>INTERESTS</span>
                  <button
                    onClick={() => setIsEditProfileOpen(true)}
                    className="text-xs font-semibold text-neutral-400 hover:text-white"
                  >
                    Edit
                  </button>
                </div>

                {hasInterests ? (
                  <ul className="space-y-2 text-xs font-semibold">
                    {profile.interests.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
                        <span style={{ color: 'var(--doap-text-prim)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-2">
                    <p className="text-xs font-mono text-neutral-500 mb-2">No interests added yet.</p>
                    <button
                      onClick={() => setIsEditProfileOpen(true)}
                      className="text-xs font-bold underline cursor-pointer"
                      style={{ color: accentHex }}
                    >
                      + Add Interests (e.g. AI, Cloud)
                    </button>
                  </div>
                )}
              </div>

              {/* Career Goals */}
              <div className="p-6 rounded-3xl space-y-3 doap-card">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest block" style={{ color: 'var(--doap-text-sec)' }}>CAREER GOALS</span>
                  <button
                    onClick={() => setIsEditProfileOpen(true)}
                    className="text-xs font-semibold text-neutral-400 hover:text-white"
                  >
                    Edit
                  </button>
                </div>

                {hasGoals ? (
                  <ul className="space-y-2 text-xs font-semibold">
                    {profile.careerGoals.map((goal, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <Target size={14} style={{ color: accentHex }} />
                        <span style={{ color: 'var(--doap-text-prim)' }}>{goal}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-2">
                    <p className="text-xs font-mono text-neutral-500 mb-2">No career goals added yet.</p>
                    <button
                      onClick={() => setIsEditProfileOpen(true)}
                      className="text-xs font-bold underline cursor-pointer"
                      style={{ color: accentHex }}
                    >
                      + Add Career Goals (e.g. SDE at Google)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
