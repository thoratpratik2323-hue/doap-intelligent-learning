import { Router } from 'express';
import vm from 'vm';

const router = Router();

// Standard predefined problem test suites
const PROBLEM_TEST_SUITES = {
  '01': {
    name: 'Two Sum',
    fnName: 'twoSum',
    tests: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] }
    ]
  },
  '02': {
    name: 'Valid Parentheses',
    fnName: 'isValid',
    tests: [
      { input: ['()'], expected: true },
      { input: ['()[]{}'], expected: true },
      { input: ['(]'], expected: false },
      { input: ['([)]'], expected: false }
    ]
  },
  '03': {
    name: 'Merge Two Sorted Lists',
    fnName: 'mergeTwoLists',
    tests: [
      { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
      { input: [[], []], expected: [] },
      { input: [[], [0]], expected: [0] }
    ]
  }
};

/**
 * POST /api/code/run
 * Runs JavaScript code in an isolated VM with timeout
 */
router.post('/run', async (req, res) => {
  const { code, problemId, customInput } = req.body;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Source code is required.' });
  }

  const logs = [];
  const sandbox = {
    console: {
      log: (...args) => logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
      warn: (...args) => logs.push('[WARN] ' + args.join(' ')),
      error: (...args) => logs.push('[ERROR] ' + args.join(' '))
    },
    Math,
    Array,
    Object,
    String,
    Number,
    Boolean,
    Date,
    JSON,
    parseInt,
    parseFloat,
    isNaN,
    isFinite
  };

  const context = vm.createContext(sandbox);

  try {
    const script = new vm.Script(code);
    script.runInContext(context, { timeout: 1500 });

    const testSuite = PROBLEM_TEST_SUITES[problemId];
    const testResults = [];

    if (testSuite && typeof context[testSuite.fnName] === 'function') {
      const targetFn = context[testSuite.fnName];

      for (let i = 0; i < testSuite.tests.length; i++) {
        const t = testSuite.tests[i];
        const startTime = Date.now();
        try {
          const actual = targetFn(...t.input);
          const durationMs = Date.now() - startTime;
          const passed = JSON.stringify(actual) === JSON.stringify(t.expected);

          testResults.push({
            testIndex: i + 1,
            input: JSON.stringify(t.input),
            expected: JSON.stringify(t.expected),
            actual: JSON.stringify(actual),
            passed,
            durationMs
          });
        } catch (execErr) {
          testResults.push({
            testIndex: i + 1,
            input: JSON.stringify(t.input),
            expected: JSON.stringify(t.expected),
            actual: 'Error: ' + execErr.message,
            passed: false,
            durationMs: 0
          });
        }
      }
    }

    const allPassed = testResults.length > 0 && testResults.every(t => t.passed);

    return res.json({
      success: true,
      logs,
      hasTestSuite: Boolean(testSuite),
      allPassed,
      testResults,
      executedAt: new Date().toISOString()
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err.message,
      logs
    });
  }
});

export default router;
