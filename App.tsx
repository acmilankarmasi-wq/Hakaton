import React, { useState } from 'react';
import { ViewState, Student, LanguageCode, Expense, SavingsGoal, Badge, Notification } from './types';
import { Dashboard } from './components/Dashboard';
import { StudentList } from './components/StudentList';
import { AIAdvisor } from './components/AIAdvisor';
import { DailyAnalysis } from './components/DailyAnalysis';
import { SettingsPanel } from './components/SettingsPanel';
import { LoginScreen } from './components/LoginScreen';
import { BudgetPlanner } from './components/BudgetPlanner';
import { FinancialEducation } from './components/FinancialEducation';
import { translations } from './utils/translations';
import { LayoutDashboard, Users, Sparkles, GraduationCap, Calculator, Target, Trophy, Bell } from 'lucide-react';

// Sample Data
const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Alice Johnson', major: 'Computer Science', monthlySalary: 4500, totalLoan: 25000 },
  { id: '2', name: 'Bob Smith', major: 'Philosophy', monthlySalary: 2800, totalLoan: 45000 },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  
  // New Feature States
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  
  // Initial notifications with translation keys
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: '1', 
      title: 'Welcome!', 
      message: 'Start tracking your loans today.', 
      translationKeyTitle: 'welcomeTitle',
      translationKeyMessage: 'welcomeMsg',
      type: 'info', 
      read: false, 
      time: 'Now' 
    },
    { 
      id: '2', 
      title: 'Tip', 
      message: 'Check the Daily Simulator to save money.',
      translationKeyTitle: 'tipTitle',
      translationKeyMessage: 'tipMsg', 
      type: 'success', 
      read: false, 
      time: '1h ago' 
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Language State
  const [language, setLanguage] = useState<LanguageCode>('English');
  const t = translations[language];

  // Global Simulation State
  const [interestRate, setInterestRate] = useState<number>(5.5); 
  const [loanTermYears, setLoanTermYears] = useState<number>(10);

  const backgroundUrl = "https://images.unsplash.com/photo-1635324647369-42b6a5035229?q=80&w=2070&auto=format&fit=crop";

  const handleAddStudent = (newStudent: Student) => setStudents([...students, newStudent]);
  const handleUpdateStudent = (updatedStudent: Student) => setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  const handleDeleteStudent = (id: string) => setStudents(students.filter(s => s.id !== id));
  
  const handleEarnBadge = (badge: Badge) => {
    setBadges([...badges, badge]);
    setNotifications(prev => [{
        id: crypto.randomUUID(),
        title: 'New Badge Unlocked!',
        message: `You earned the ${badge.name} badge!`,
        translationKeyTitle: 'badgeUnlocked',
        translationKeyMessage: 'badgeEarned',
        translationParams: { badgeName: badge.name },
        type: 'success',
        read: false,
        time: 'Just now'
    }, ...prev]);
  };

  const isRTL = language === 'Arabic';

  // Helper to translate notifications
  const getTranslatedText = (notification: Notification, type: 'title' | 'message'): string => {
    const key = type === 'title' ? notification.translationKeyTitle : notification.translationKeyMessage;
    const fallback = type === 'title' ? notification.title : notification.message;
    
    if (key && t[key]) {
      let text = t[key];
      if (notification.translationParams) {
        Object.entries(notification.translationParams).forEach(([param, value]) => {
          text = text.replace(`{${param}}`, value);
        });
      }
      return text;
    }
    return fallback;
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen 
        onLogin={() => setIsAuthenticated(true)}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Container */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundUrl}')` }}
      >
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
              <GraduationCap size={32} className="text-white" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold tracking-tight">{t.appTitle}</h1>
              <p className="text-blue-200 text-sm">{t.appSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 relative bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <Bell size={20} />
                    {notifications.some(n => !n.read) && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-[#1a1f2e]"></span>}
                </button>
                
                {showNotifications && (
                    <div className="absolute right-0 top-12 w-80 bg-[#1a1f2e] border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
                        <div className="p-3 border-b border-white/10 flex justify-between items-center">
                            <span className="font-bold text-sm">{t.notifications}</span>
                            <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))} className="text-xs text-blue-400 hover:text-blue-300">{t.markAllRead}</button>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-4 text-center text-white/40 text-xs">{t.noNotifications}</div>
                            ) : (
                                notifications.map(n => (
                                    <div key={n.id} className={`p-3 border-b border-white/5 hover:bg-white/5 ${!n.read ? 'bg-blue-500/10' : ''}`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-xs text-white">
                                              {getTranslatedText(n, 'title')}
                                            </span>
                                            <span className="text-[10px] text-white/40">{n.time}</span>
                                        </div>
                                        <p className="text-xs text-white/70">
                                          {getTranslatedText(n, 'message')}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
              </div>

              {/* Navigation */}
              <nav className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/10 overflow-x-auto max-w-full">
                <button onClick={() => setView(ViewState.DASHBOARD)} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs font-medium whitespace-nowrap ${view === ViewState.DASHBOARD ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/10 text-white/70'}`}>
                  <LayoutDashboard size={16} /> {t.dashboard}
                </button>
                <button onClick={() => setView(ViewState.MANAGE)} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs font-medium whitespace-nowrap ${view === ViewState.MANAGE ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/10 text-white/70'}`}>
                  <Users size={16} /> {t.loans}
                </button>
                <button onClick={() => setView(ViewState.BUDGET)} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs font-medium whitespace-nowrap ${view === ViewState.BUDGET ? 'bg-orange-600 text-white shadow-lg' : 'hover:bg-white/10 text-white/70'}`}>
                  <Target size={16} /> {t.budget}
                </button>
                <button onClick={() => setView(ViewState.DAILY)} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs font-medium whitespace-nowrap ${view === ViewState.DAILY ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-white/10 text-white/70'}`}>
                  <Calculator size={16} /> {t.dailyAnalysis}
                </button>
                <button onClick={() => setView(ViewState.LEARN)} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs font-medium whitespace-nowrap ${view === ViewState.LEARN ? 'bg-yellow-600 text-white shadow-lg' : 'hover:bg-white/10 text-white/70'}`}>
                  <Trophy size={16} /> {t.learn}
                </button>
                <button onClick={() => setView(ViewState.INSIGHTS)} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs font-medium whitespace-nowrap ${view === ViewState.INSIGHTS ? 'bg-purple-600 text-white shadow-lg' : 'hover:bg-white/10 text-white/70'}`}>
                  <Sparkles size={16} /> {t.aiAdvisor}
                </button>
              </nav>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="min-h-[600px] mb-20">
          {view === ViewState.DASHBOARD && <Dashboard students={students} language={language} />}
          {view === ViewState.MANAGE && (
            <StudentList 
              students={students} 
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
              language={language}
            />
          )}
          {view === ViewState.BUDGET && (
            <BudgetPlanner 
                language={language}
                expenses={expenses}
                goals={goals}
                onAddExpense={(e) => setExpenses([...expenses, e])}
                onAddGoal={(g) => setGoals([...goals, g])}
            />
          )}
          {view === ViewState.DAILY && (
            <DailyAnalysis 
              students={students} 
              interestRate={interestRate}
              setInterestRate={setInterestRate}
              loanTermYears={loanTermYears}
              setLoanTermYears={setLoanTermYears}
              language={language}
            />
          )}
          {view === ViewState.LEARN && (
             <FinancialEducation 
                language={language}
                badges={badges}
                onEarnBadge={handleEarnBadge}
             />
          )}
          {view === ViewState.INSIGHTS && <AIAdvisor students={students} language={language} />}
        </main>
        
        <footer className="mt-20 py-6 border-t border-white/10 text-center text-white/40 text-sm">
          <p>© 2024 EduFinance Tracker. Background design via Canva.</p>
        </footer>

        {/* Floating Settings Panel */}
        <SettingsPanel 
          students={students}
          interestRate={interestRate}
          loanTermYears={loanTermYears}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
    </div>
  );
};

export default App;
