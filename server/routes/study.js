import { Router } from 'express';

const router = Router();

// In-memory persistent state (synced across server lifetime)
let studyTasks = [
  { id: 1, time: '09:00', title: 'Data Structures', duration: '60m', completed: true },
  { id: 2, time: '10:30', title: 'Java', duration: '60m', completed: true },
  { id: 3, time: '14:00', title: 'AI Fundamentals', duration: '60m', completed: false },
  { id: 4, time: '16:00', title: 'Prompt Engineering', duration: '45m', completed: false },
  { id: 5, time: '18:00', title: 'Coding Practice', duration: '90m', completed: false }
];

/**
 * GET /api/study-plan
 */
router.get('/', (req, res) => {
  res.json({
    tasks: studyTasks,
    completedCount: studyTasks.filter(t => t.completed).length,
    totalCount: studyTasks.length,
    streak: 7
  });
});

/**
 * POST /api/study-plan/toggle
 */
router.post('/toggle', (req, res) => {
  const { id } = req.body;
  studyTasks = studyTasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t));
  res.json({ success: true, tasks: studyTasks });
});

/**
 * POST /api/study-plan/add
 */
router.post('/add', (req, res) => {
  const { title, time, duration } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTask = {
    id: Date.now(),
    title,
    time: time || '12:00',
    duration: duration || '45m',
    completed: false
  };

  studyTasks.push(newTask);
  res.json({ success: true, task: newTask, tasks: studyTasks });
});

export default router;
