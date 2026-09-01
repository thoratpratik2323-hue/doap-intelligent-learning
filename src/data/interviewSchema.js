// Structured data models for Interview, Evaluations, and Proctoring Backend API entities

export const INTERVIEW_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  SYSTEM_CHECK: 'SYSTEM_CHECK',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  TERMINATED_PROCTORING_VIOLATION: 'TERMINATED_PROCTORING_VIOLATION'
};

export const PROCTORING_VIOLATION_TYPES = {
  FACE_NOT_DETECTED: 'FACE_NOT_DETECTED',
  MULTIPLE_FACES: 'MULTIPLE_FACES',
  PROLONGED_LOOK_AWAY: 'PROLONGED_LOOK_AWAY',
  FULLSCREEN_EXIT: 'FULLSCREEN_EXIT',
  CAMERA_DISABLED: 'CAMERA_DISABLED',
  MICROPHONE_DISABLED: 'MICROPHONE_DISABLED',
  RECORDING_INTERRUPTED: 'RECORDING_INTERRUPTED',
  BROWSER_VISIBILITY_CHANGE: 'BROWSER_VISIBILITY_CHANGE',
  INTERVIEW_TAB_HIDDEN: 'INTERVIEW_TAB_HIDDEN'
};

export const createInterviewSessionModel = ({
  candidateName,
  candidateId,
  positionId,
  positionTitle,
  interviewType,
  difficulty,
  duration,
  jobDescription = ""
}) => {
  return {
    id: `int_${Date.now()}`,
    candidate: {
      name: candidateName || "Candidate",
      id: candidateId || `usr_${Date.now()}`
    },
    position: {
      id: positionId,
      title: positionTitle
    },
    config: {
      type: interviewType,
      difficulty,
      duration,
      jobDescription
    },
    startTime: new Date().toISOString(),
    endTime: null,
    status: INTERVIEW_STATUS.SYSTEM_CHECK,
    proctoring: {
      status: 'PASSED', // PASSED | WARNING | TERMINATED
      strikeCount: 0,
      maxStrikes: 3,
      events: []
    },
    answers: [],
    evaluationResult: null
  };
};

export const createAnswerModel = ({
  questionId,
  questionCategory,
  questionText,
  transcript,
  recordingDurationSeconds
}) => {
  return {
    id: `ans_${Date.now()}`,
    questionId,
    questionCategory,
    questionText,
    transcript,
    recordingDurationSeconds,
    timestamp: new Date().toISOString(),
    evaluation: null // Backend AI connection point
  };
};
