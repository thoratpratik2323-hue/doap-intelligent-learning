import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const EditProfileModal = () => {
  const { profile, updateProfile, isEditProfileOpen, setIsEditProfileOpen, isDarkMode } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    university: '',
    course: '',
    year: '',
    bio: '',
    skills: '',
    interests: '',
    careerGoals: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        title: profile.title || '',
        university: profile.university || '',
        course: profile.course || '',
        year: profile.year || '',
        bio: profile.bio || '',
        skills: (profile.skills || []).join(', '),
        interests: (profile.interests || []).join(', '),
        careerGoals: (profile.careerGoals || []).join(', ')
      });
    }
  }, [profile, isEditProfileOpen]);

  if (!isEditProfileOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      title: formData.title,
      university: formData.university,
      course: formData.course,
      year: formData.year,
      bio: formData.bio,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean),
      careerGoals: formData.careerGoals.split(',').map(c => c.trim()).filter(Boolean)
    });
    setIsEditProfileOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
      <div className={`rounded-3xl max-w-lg w-full p-6 shadow-2xl border transition-colors max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-[#0a0a0a] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
      }`}>
        <div className={`flex items-center justify-between border-b pb-4 mb-5 ${
          isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
        }`}>
          <h3 className="text-xl font-bold tracking-tight">Edit Profile</h3>
          <button 
            onClick={() => setIsEditProfileOpen(false)}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'text-neutral-400 hover:text-white hover:bg-neutral-900' : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white' 
                  : 'bg-neutral-50 border-neutral-200 text-black focus:border-black'
              }`}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>University</label>
              <input 
                type="text" 
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white' 
                    : 'bg-neutral-50 border-neutral-200 text-black focus:border-black'
                }`}
              />
            </div>
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>Year</label>
              <input 
                type="text" 
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white' 
                    : 'bg-neutral-50 border-neutral-200 text-black focus:border-black'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>Course / Major</label>
            <input 
              type="text" 
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white' 
                  : 'bg-neutral-50 border-neutral-200 text-black focus:border-black'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>Bio</label>
            <textarea 
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors resize-none ${
                isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white' 
                  : 'bg-neutral-50 border-neutral-200 text-black focus:border-black'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>Technical Skills (comma separated)</label>
            <input 
              type="text" 
              placeholder="e.g. React, Python, JavaScript, DSA, Node.js"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white' 
                  : 'bg-neutral-50 border-neutral-200 text-black focus:border-black'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>Interests (comma separated)</label>
            <input 
              type="text" 
              placeholder="e.g. Artificial Intelligence, Web Development, Cloud Computing, System Design"
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white' 
                  : 'bg-neutral-50 border-neutral-200 text-black focus:border-black'
              }`}
            />
            {/* Quick Preset Chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['AI / ML', 'Web Development', 'Cloud Computing', 'DSA & Algorithms', 'Cybersecurity', 'Open Source'].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => {
                    const current = formData.interests ? formData.interests.split(',').map(s => s.trim()).filter(Boolean) : [];
                    if (!current.includes(tag)) {
                      setFormData({ ...formData, interests: [...current, tag].join(', ') });
                    }
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-colors cursor-pointer ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700' : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:text-black'
                  }`}
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>Career Goals (comma separated)</label>
            <input 
              type="text" 
              placeholder="e.g. Full Stack Engineer at Google, Machine Learning Engineer, Crack FAANG"
              value={formData.careerGoals}
              onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white' 
                  : 'bg-neutral-50 border-neutral-200 text-black focus:border-black'
              }`}
            />
            {/* Quick Preset Goals */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['Software Engineer (SDE)', 'AI / ML Engineer', 'Full Stack Developer', 'Cloud Architect', 'Crack FAANG Interview'].map((goal) => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => {
                    const current = formData.careerGoals ? formData.careerGoals.split(',').map(s => s.trim()).filter(Boolean) : [];
                    if (!current.includes(goal)) {
                      setFormData({ ...formData, careerGoals: [...current, goal].join(', ') });
                    }
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-colors cursor-pointer ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700' : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:text-black'
                  }`}
                >
                  + {goal}
                </button>
              ))}
            </div>
          </div>

          <div className={`flex justify-end gap-3 pt-4 border-t ${
            isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
          }`}>
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className={`px-4 py-2 rounded-xl font-medium text-xs transition-colors ${
                isDarkMode ? 'text-neutral-400 hover:text-white hover:bg-neutral-900' : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
              }`}
            >
              <Check size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
