export interface Student {
  id: string;
  name: string;
  major: string;
  monthlySalary: number;
  totalLoan: number;
}

export interface FinancialStats {
  totalStudents: number;
  averageSalary: number;
  totalLoans: number;
  averageLoan: number;
  debtToIncomeRatio: number;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  MANAGE = 'MANAGE',
  DAILY = 'DAILY',
  BUDGET = 'BUDGET',
  LEARN = 'LEARN',
  INSIGHTS = 'INSIGHTS'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type LanguageCode = 
  | 'English' 
  | 'Mandarin Chinese' 
  | 'Hindi' 
  | 'Spanish' 
  | 'Arabic' 
  | 'French' 
  | 'Bengali' 
  | 'Portuguese' 
  | 'Russian' 
  | 'Indonesian' 
  | 'Azerbaijani' 
  | 'Turkish';

export interface Expense {
  id: string;
  category: string;
  amount: number;
  name: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  color: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  translationKeyTitle?: string;
  translationKeyMessage?: string;
  translationParams?: Record<string, string>;
  type: 'info' | 'warning' | 'success';
  read: boolean;
  time: string;
}
