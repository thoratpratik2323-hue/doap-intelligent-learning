/**
 * MYRAA Persistent Memory Engine
 * Stores 7-category memories in localStorage and syncs with Ziv's cognitive memoryBrain
 */

const STORAGE_KEY = 'myraa_memories_v2';

const SEED_MEMORIES = [
  {
    id: 'seed-1',
    category: 'identity',
    text: 'Student preparing for Software Engineering and Full-Stack Developer roles.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'seed-2',
    category: 'preference',
    text: 'Prefers deep conceptual explanations first, followed by practical code snippets.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'seed-3',
    category: 'goal',
    text: 'Master Data Structures & Algorithms, React Internals, and System Design interviews.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function loadMemories() {
  if (typeof window === 'undefined') return SEED_MEMORIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MEMORIES));
      return SEED_MEMORIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_MEMORIES;
  } catch (e) {
    console.warn('[Myraa Memory] Could not load memories from localStorage:', e);
    return SEED_MEMORIES;
  }
}

export function saveMemories(memories) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  } catch (e) {
    console.error('[Myraa Memory] Failed to save memories to localStorage:', e);
  }
}

export function addMemory(category, text) {
  const current = loadMemories();
  const newMemory = {
    id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    category,
    text: text.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const updated = [newMemory, ...current];
  saveMemories(updated);
  return newMemory;
}

export function deleteMemory(id) {
  const current = loadMemories();
  const updated = current.filter(m => m.id !== id);
  saveMemories(updated);
  return updated;
}

export function formatMemoriesForPrompt() {
  const memories = loadMemories();
  if (!memories.length) return '';

  const categorized = {};
  memories.forEach(m => {
    if (!categorized[m.category]) categorized[m.category] = [];
    categorized[m.category].push(m.text);
  });

  let prompt = '\n=== MYRAA LONG-TERM RECOLLECTIONS & MEMORY VAULT ===\n';
  for (const [cat, items] of Object.entries(categorized)) {
    prompt += `[${cat.toUpperCase()}]:\n`;
    items.forEach(item => {
      prompt += ` - ${item}\n`;
    });
  }
  prompt += '===================================================\n';
  return prompt;
}
