
export enum InterviewMode {
  FAANG_TECHNICAL = 'FAANG_TECHNICAL',
  AGGRESSIVE_HR = 'AGGRESSIVE_HR',
  STARTUP_CHAOS = 'STARTUP_CHAOS'
}

export interface UserProfile {
  name: string;
  targetRole: string;
  resumeText: string;
}

export interface ChatMessage {
  role: 'interviewer' | 'candidate';
  content: string;
  timestamp: number;
}

export interface QuestionRecord {
  id: string;
  question: string;
  response: string;
  intent: string;
  followUpLevel: number;
}

export interface InterviewSession {
  id: string;
  mode: InterviewMode;
  user: UserProfile;
  history: ChatMessage[];
  records: QuestionRecord[];
  status: 'SETUP' | 'ACTIVE' | 'EVALUATING' | 'COMPLETED';
  startTime: number;
}

export interface EvaluationMetric {
  category: string;
  score: number;
  observation: string;
  evidence: string;
}

export interface Scorecard {
  overallScore: number;
  metrics: EvaluationMetric[];
  strengths: string[];
  weaknesses: string[];
  verdict: 'HIRE' | 'NO_HIRE' | 'STRONG_HIRE' | 'LEAN_NO_HIRE';
  actionableFeedback: string[];
}
