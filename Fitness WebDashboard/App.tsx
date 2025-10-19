import React, { useState, useCallback, useEffect } from 'react';
import { Task, PetState, UserStats, PetMood, LeaderboardUser, Reward, Post, Event, Article, Friend, Competition, UserProfile, CommunityGoal, TaskCategory, Quiz } from './types';
import { INITIAL_TASKS, REWARDS, LEADERBOARD_DATA, INITIAL_EVENTS, POST_REWARD_POINTS, DAILY_POST_LIMIT, INITIAL_ARTICLES, INITIAL_FRIENDS, INITIAL_COMPETITIONS, WATER_GOAL, WATER_GOAL_POINTS, DAILY_TASK_LIMIT, WATER_COOLDOWN_HOURS, REFERRAL_POINTS, INITIAL_COMMUNITY_GOALS } from './constants';
import { generatePersonalizedHealthGoals, generatePersonalizedQuiz } from './services/geminiService';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import Pet from './components/Pet';
import TaskList from './components/TaskList';
import AIGoalGenerator from './components/AIGoalGenerator';
import Leaderboard from './components/Leaderboard';
import RewardsComponent from './components/Rewards';
import TrophyIcon from './components/icons/TrophyIcon';
import CoinIcon from './components/icons/CoinIcon';
import FireIcon from './components/icons/FireIcon';
import Navbar, { ActiveTab } from './components/Navbar';
import DietTracker from './components/DietTracker';
import Posts from './components/Posts';
import EventsComponent from './components/Events';
import QrCodeModal from './components/QrCodeModal';
import Learn from './components/Learn';
import ArticleModal from './components/ArticleModal';
import WaterTracker from './components/WaterTracker';
import SleepCard from './components/SleepCard';
import SleepOverlay from './components/SleepOverlay';
import Friends from './components/Friends';
import ChallengeFriendModal from './components/ChallengeFriendModal';
import Profile from './components/Profile';
import Login from './components/Login';
import Community from './components/Community';
import ShareModal from './components/ShareModal';
import CreateCompetitionModal from './components/CreateCompetitionModal';
import QuizModal from './components/QuizModal';


const CURRENT_USER_ID = 2;

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [petState, setPetState] = useState<PetState>({
        name: 'Sparky',
        mood: PetMood.Neutral,
        happiness: 50,
    });
    const [userStats, setUserStats] = useState<UserStats>({
        points: 1890,
        wellnessCoins: 125,
        dailyStreak: 3,
    });
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(LEADERBOARD_DATA);
    const [rewards] = useState<Reward[]>(REWARDS);
    const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
    const [claimedRewardIds, setClaimedRewardIds] = useState<number[]>([]);
    
    // Feature states
    const [posts, setPosts] = useState<Post[]>([]);
    const [postsToday, setPostsToday] = useState<number>(0);
    const [events] = useState<Event[]>(INITIAL_EVENTS);
    const [registeredEventIds, setRegisteredEventIds] = useState<number[]>([]);
    const [attendedEventIds, setAttendedEventIds] = useState<number[]>([]);
    const [activeModalEvent, setActiveModalEvent] = useState<Event | null>(null);
    const [articles] = useState<Article[]>(INITIAL_ARTICLES);
    const [completedArticleIds, setCompletedArticleIds] = useState<number[]>([]);
    const [activeArticle, setActiveArticle] = useState<Article | null>(null);
    const [waterCount, setWaterCount] = useState(4);
    const [waterGoalCompleted, setWaterGoalCompleted] = useState(false);
    const [isSleeping, setIsSleeping] = useState(false);
    const [sleepStartTime, setSleepStartTime] = useState<Date | null>(null);
    const [friends] = useState<Friend[]>(INITIAL_FRIENDS);
    const [competitions, setCompetitions] = useState<Competition[]>(INITIAL_COMPETITIONS);
    
    // New restriction states
    const [tasksCompletedToday, setTasksCompletedToday] = useState(0);
    const [lastWaterLogTime, setLastWaterLogTime] = useState<Date | null>(null);
    const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile>({
        height: '',
        weight: '',
        age: '',
        conditions: '',
    });
    const [communityGoals, setCommunityGoals] = useState<CommunityGoal[]>(INITIAL_COMMUNITY_GOALS);
    const [postToShare, setPostToShare] = useState<Post | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isCreateCompetitionModalOpen, setIsCreateCompetitionModalOpen] = useState(false);
    const [hasSpunToday, setHasSpunToday] = useState(false);

    // Personalized Quiz States
    const [personalizedQuiz, setPersonalizedQuiz] = useState<Quiz | null>(null);
    const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
    const [isPersonalizedQuizModalOpen, setIsPersonalizedQuizModalOpen] = useState(false);


    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    const awardPoints = useCallback((pointsToAdd: number, fromCategory?: TaskCategory | 'water' | 'other', isBonus: boolean = false) => {
        if (pointsToAdd <= 0) return;

        setUserStats(prev => {
            const newPoints = prev.points + pointsToAdd;
            setLeaderboard(l => l.map(u => u.isCurrentUser ? { ...u, points: newPoints } : u));
            setCompetitions(prevComps => prevComps.map(comp => {
                if (comp.participants.some(p => p.id === CURRENT_USER_ID)) {
                    return {
                        ...comp,
                        participants: comp.participants.map(p => 
                            p.id === CURRENT_USER_ID ? { ...p, points: p.points + pointsToAdd } : p
                        )
                    };
                }
                return comp;
            }));
            return { ...prev, points: newPoints };
        });

        if (!isBonus) {
            setCommunityGoals(prevGoals =>
                prevGoals.map(goal => {
                    if (goal.completed) return goal;
                    if (goal.id === 1 && fromCategory !== 'water') return goal;
                    if (goal.id === 2 && fromCategory !== TaskCategory.Financial) return goal;

                    const newCurrentPoints = goal.currentPoints + pointsToAdd;
                    const justCompleted = newCurrentPoints >= goal.targetPoints;

                    if (justCompleted && !goal.completed) {
                        setTimeout(() => {
                            showToast(`Community Goal: "${goal.title}" completed! +${goal.pointBonus} bonus points!`);
                            awardPoints(goal.pointBonus, 'other', true);
                        }, 500);
                    }
                    
                    return { ...goal, currentPoints: newCurrentPoints, completed: goal.completed || justCompleted };
                })
            );
        }
    }, []);

    const deductPoints = useCallback((pointsToDeduct: number) => {
         if (pointsToDeduct <= 0) return;
         setUserStats(prev => {
            const newPoints = prev.points - pointsToDeduct;
            setLeaderboard(l => l.map(u => u.isCurrentUser ? { ...u, points: newPoints } : u));
            setCompetitions(prevComps => prevComps.map(comp => {
                if (comp.participants.some(p => p.id === CURRENT_USER_ID)) {
                    return {
                        ...comp,
                        participants: comp.participants.map(p => 
                            p.id === CURRENT_USER_ID ? { ...p, points: Math.max(0, p.points - pointsToDeduct) } : p
                        )
                    };
                }
                return comp;
            }));
            return { ...prev, points: newPoints };
        });
    }, []);

    const updatePetState = useCallback((newHappiness: number) => {
        const clampedHappiness = Math.max(0, Math.min(100, newHappiness));
        let newMood = PetMood.Neutral;
        if (clampedHappiness > 70) newMood = PetMood.Happy;
        else if (clampedHappiness <= 30) newMood = PetMood.Sad;

        setPetState(prev => ({ ...prev, happiness: clampedHappiness, mood: newMood }));
    }, []);

    const handleAddTasks = useCallback((newTasks: Omit<Task, 'id' | 'completed'>[]) => {
        const tasksToAdd = newTasks.map((task, index) => ({
            ...task,
            id: Date.now() + index,
            completed: false,
        }));
        setTasks(prev => [...prev, ...tasksToAdd]);
    }, []);

    const handleTaskCompletion = useCallback((id: number, completed: boolean) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        const pointsChange = completed ? task.points : -task.points;
        const happinessChange = completed ? 10 : -10;
        const completionCountChange = completed ? 1 : -1;
        
        if (pointsChange > 0) {
            awardPoints(pointsChange, task.category);
        } else {
            deductPoints(-pointsChange);
        }

        setTasks(currentTasks =>
            currentTasks.map(t =>
                t.id === id ? { ...t, completed } : t
            )
        );
        setTasksCompletedToday(prev => prev + completionCountChange);
        updatePetState(petState.happiness + happinessChange);
    }, [tasks, petState.happiness, updatePetState, awardPoints, deductPoints]);

    const handleToggleTask = useCallback((id: number) => {
        const taskToToggle = tasks.find(t => t.id === id);
        if (!taskToToggle) return;

        if (!taskToToggle.completed && tasksCompletedToday >= DAILY_TASK_LIMIT) {
            showToast(`Daily limit of ${DAILY_TASK_LIMIT} goals reached. Come back tomorrow!`);
            return;
        }

        handleTaskCompletion(id, !taskToToggle.completed);
    }, [tasks, tasksCompletedToday, handleTaskCompletion]);
    
    const handleTaskAction = (action: Task['action']) => {
        switch(action) {
            case 'challengeFriend':
                setIsChallengeModalOpen(true);
                break;
            default:
                console.warn('Unknown task action:', action);
        }
    };

    const handleChallengeSent = () => {
        const challengeTask = tasks.find(t => t.action === 'challengeFriend');
        if (challengeTask && !challengeTask.completed) {
            if (tasksCompletedToday >= DAILY_TASK_LIMIT) {
                showToast(`Daily limit of ${DAILY_TASK_LIMIT} goals reached. Come back tomorrow!`);
            } else {
                handleTaskCompletion(challengeTask.id, true);
            }
        }
        setIsChallengeModalOpen(false);
    };

    const handleNextDay = useCallback(() => {
        const allCompleted = tasks.every(t => t.completed);
        const newStreak = allCompleted ? userStats.dailyStreak + 1 : 0;
        const streakBonus = allCompleted ? 50 : 0;
        const coinBonus = allCompleted ? 10 : 0;

        setTasks(INITIAL_TASKS.map(t => ({...t, completed: false})));
        setUserStats(prev => ({
            ...prev,
            dailyStreak: newStreak,
            wellnessCoins: prev.wellnessCoins + coinBonus,
        }));
        if(streakBonus > 0) awardPoints(streakBonus, 'other');
        
        updatePetState(petState.happiness - 15);
        setPostsToday(0);
        setWaterCount(0);
        setWaterGoalCompleted(false);
        setTasksCompletedToday(0);
        setLastWaterLogTime(null);
        setHasSpunToday(false);
    }, [tasks, userStats.dailyStreak, petState.happiness, updatePetState, awardPoints]);
    
     const handleClaimReward = useCallback((reward: Reward) => {
        if (userStats.points >= reward.pointsRequired && !claimedRewardIds.includes(reward.id)) {
            deductPoints(reward.pointsRequired);
            setClaimedRewardIds(prev => [...prev, reward.id]);
        }
    }, [userStats.points, claimedRewardIds, deductPoints]);

    const handleMealAnalyzed = useCallback((points: number) => {
        if (points > 0) awardPoints(points, TaskCategory.Health);
        else deductPoints(-points);
        
        const happinessChange = Math.floor(points / 2);
        updatePetState(petState.happiness + happinessChange);
    }, [petState.happiness, updatePetState, awardPoints, deductPoints]);
    
    const handleCreatePost = useCallback((content: string) => {
        if (postsToday >= DAILY_POST_LIMIT) return;

        const newPost: Post = {
            id: Date.now(),
            content,
            timestamp: new Date().toLocaleString(),
        };
        setPosts(prev => [newPost, ...prev]);
        setPostsToday(prev => prev + 1);
        awardPoints(POST_REWARD_POINTS, TaskCategory.Social);
        updatePetState(petState.happiness + 5);
    }, [postsToday, petState.happiness, updatePetState, awardPoints]);

    const handleRegisterEvent = useCallback((eventId: number) => {
        if (!registeredEventIds.includes(eventId)) {
            setRegisteredEventIds(prev => [...prev, eventId]);
        }
    }, [registeredEventIds]);

    const handleAttendEvent = useCallback((eventId: number) => {
        if (attendedEventIds.includes(eventId)) return;

        const event = events.find(e => e.id === eventId);
        if (event) {
            awardPoints(event.points, 'other');
            updatePetState(petState.happiness + 20);
            setAttendedEventIds(prev => [...prev, eventId]);
            setTimeout(() => setActiveModalEvent(null), 1000);
        }
    }, [attendedEventIds, events, petState.happiness, updatePetState, awardPoints]);

    const handleQuizComplete = useCallback((articleId: number, pointsEarned: number) => {
        if (!completedArticleIds.includes(articleId)) {
            awardPoints(pointsEarned, 'other');
            setCompletedArticleIds(prev => [...prev, articleId]);
        }
        setActiveArticle(null);
    }, [completedArticleIds, awardPoints]);

    const handleDrinkWater = useCallback(() => {
        if(lastWaterLogTime) {
            const hoursSinceLast = (new Date().getTime() - lastWaterLogTime.getTime()) / (1000 * 60 * 60);
            if (hoursSinceLast < WATER_COOLDOWN_HOURS) {
                showToast(`Please wait before logging another glass.`);
                return;
            }
        }

        const newCount = waterCount + 1;
        setWaterCount(newCount);
        setLastWaterLogTime(new Date());
        awardPoints(1, 'water');

        if (newCount >= WATER_GOAL && !waterGoalCompleted) {
            awardPoints(WATER_GOAL_POINTS, 'water');
            updatePetState(petState.happiness + 15);
            setWaterGoalCompleted(true);
        }
    }, [waterCount, waterGoalCompleted, petState.happiness, updatePetState, awardPoints, lastWaterLogTime]);

    const handleSleep = useCallback(() => {
        setIsSleeping(true);
        setSleepStartTime(new Date());
    }, []);

    const handleWakeUp = useCallback(() => {
        if (!sleepStartTime) return;
        const sleepEndTime = new Date();
        const durationHours = (sleepEndTime.getTime() - sleepStartTime.getTime()) / (1000 * 60 * 60);

        let points = 0;
        let happinessBoost = 0;
        if (durationHours >= 7 && durationHours <= 9) {
            points = 30;
            happinessBoost = 20;
        } else if (durationHours > 4 && durationHours < 12) {
            points = 15;
            happinessBoost = 10;
        } else {
            points = 5;
            happinessBoost = 0;
        }

        if (points > 0) awardPoints(points, TaskCategory.Health);
        updatePetState(petState.happiness + happinessBoost);
        setIsSleeping(false);
        setSleepStartTime(null);
    }, [sleepStartTime, petState.happiness, updatePetState, awardPoints]);

    const handleReferFriend = useCallback(() => {
        awardPoints(REFERRAL_POINTS, TaskCategory.Social);
        return true;
    }, [awardPoints]);

    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        setTasks(INITIAL_TASKS);
        setUserStats({ points: 1890, wellnessCoins: 125, dailyStreak: 3 });
        setPetState({ name: 'Sparky', mood: PetMood.Neutral, happiness: 50 });
        setActiveTab('dashboard');
    }, []);

    const handleSaveProfile = async (profile: UserProfile) => {
        setUserProfile(profile);
        const newGoals = await generatePersonalizedHealthGoals(profile);
        if (newGoals.length > 0) {
            handleAddTasks(newGoals);
            setActiveTab('dashboard');
        }
    };

    const handleCreateCompetition = (title: string, participantIds: number[]) => {
        const currentUser = { id: CURRENT_USER_ID, name: 'You', avatar: 'https://picsum.photos/seed/you/100', points: 0 };
        const participants = [currentUser, ...friends.filter(f => participantIds.includes(f.id))];

        const newCompetition: Competition = {
            id: Date.now(),
            title,
            endsIn: '7 days',
            participants: participants.map(p => ({ ...p, points: 0 })),
            ownerId: CURRENT_USER_ID,
        };
        setCompetitions(prev => [newCompetition, ...prev]);
        setIsCreateCompetitionModalOpen(false);
    };

    const handleEndCompetition = (competitionId: number) => {
        setCompetitions(prev => prev.filter(c => c.id !== competitionId));
    };
    
    const handleSpinWheel = (prize: number) => {
        awardPoints(prize, 'other', true);
        setHasSpunToday(true);
        showToast(`You won ${prize} points!`);
    };

    const handleGeneratePersonalizedQuiz = async () => {
        setIsGeneratingQuiz(true);
        const quiz = await generatePersonalizedQuiz(userProfile);
        if (quiz) {
            setPersonalizedQuiz(quiz);
            setIsPersonalizedQuizModalOpen(true);
        } else {
            showToast("Couldn't generate a quiz. Make sure your health conditions are specific.");
        }
        setIsGeneratingQuiz(false);
    };

    const handlePersonalizedQuizComplete = (pointsEarned: number) => {
        awardPoints(pointsEarned, 'other');
        showToast(`You earned ${pointsEarned} points from the quiz!`);
        setIsPersonalizedQuizModalOpen(false);
        setPersonalizedQuiz(null);
    };

    useEffect(() => {
        const completedCount = tasks.filter(t => t.completed).length;
        setTasksCompletedToday(completedCount);
        const initialHappiness = 50 + (completedCount * 10) - ((tasks.length - completedCount) * 5);
        updatePetState(initialHappiness);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if (!isAuthenticated) {
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'leaderboard':
                return <Leaderboard users={leaderboard} />;
            case 'rewards':
                return <RewardsComponent rewards={rewards} userStats={userStats} claimedRewardIds={claimedRewardIds} onClaimReward={handleClaimReward} />;
            case 'diet':
                return <DietTracker onMealAnalyzed={handleMealAnalyzed} />;
            case 'posts':
                return <Posts posts={posts} postsToday={postsToday} onCreatePost={handleCreatePost} onSharePost={setPostToShare} />;
            case 'events':
                return <EventsComponent events={events} registeredEventIds={registeredEventIds} attendedEventIds={attendedEventIds} onRegister={handleRegisterEvent} onViewQrCode={setActiveModalEvent} />;
            case 'learn':
                return <Learn 
                            articles={articles} 
                            completedArticleIds={completedArticleIds} 
                            onReadArticle={setActiveArticle}
                            userProfile={userProfile}
                            onGenerateQuiz={handleGeneratePersonalizedQuiz}
                            isGeneratingQuiz={isGeneratingQuiz}
                        />;
            case 'friends':
                return <Friends friends={friends} competitions={competitions} currentUserId={CURRENT_USER_ID} onOpenCreateCompetition={() => setIsCreateCompetitionModalOpen(true)} onEndCompetition={handleEndCompetition} />;
            case 'community':
                return <Community communityGoals={communityGoals} />;
            case 'profile':
                return <Profile petState={petState} userProfile={userProfile} hasSpunToday={hasSpunToday} onSaveProfile={handleSaveProfile} onReferFriend={handleReferFriend} onLogout={handleLogout} onSpinWheel={handleSpinWheel} />;
            case 'dashboard':
            default:
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <StatsCard icon={<TrophyIcon className="w-6 h-6"/>} label="Total Points" value={userStats.points.toLocaleString()} color="bg-indigo-500/30 text-indigo-300" />
                            <StatsCard icon={<CoinIcon className="w-6 h-6"/>} label="Wellness Coins" value={userStats.wellnessCoins} color="bg-cyan-500/30 text-cyan-300" />
                            <StatsCard icon={<FireIcon className="w-6 h-6"/>} label="Daily Streak" value={userStats.dailyStreak} color="bg-orange-500/30 text-orange-300" />
                            <div className="md:col-span-2 lg:col-span-1 bg-slate-800 p-4 rounded-xl shadow-lg text-center flex flex-col justify-center">
                                 <p className="text-slate-300">Goals Today: {tasksCompletedToday}/{DAILY_TASK_LIMIT}</p>
                                 <p className="text-lg font-bold text-white">Let's make today a great day.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <WaterTracker count={waterCount} onDrink={handleDrinkWater} lastLogTime={lastWaterLogTime} />
                            <SleepCard onSleep={handleSleep} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                               <TaskList tasks={tasks} onToggleTask={handleToggleTask} onTaskAction={handleTaskAction} />
                            </div>
                            <div className="space-y-6">
                               <Pet petState={petState} />
                               <AIGoalGenerator currentTasks={tasks} addTasks={handleAddTasks} />
                            </div>
                        </div>
                    </>
                );
        }
    };


    return (
        <div className="min-h-screen bg-slate-900 font-sans">
            {toastMessage && (
                <div className="fixed top-20 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-pulse-slow">
                    {toastMessage}
                </div>
            )}
            {isSleeping && <SleepOverlay sleepStartTime={sleepStartTime} onWakeUp={handleWakeUp} />}
            <Header onNextDay={handleNextDay} />
            <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                <Navbar activeTab={activeTab} setActiveTab={setActiveTab} hasSpunToday={hasSpunToday} />
                {renderContent()}
            </main>
            {activeModalEvent && (
                <QrCodeModal 
                    event={activeModalEvent} 
                    isAttended={attendedEventIds.includes(activeModalEvent.id)}
                    onClose={() => setActiveModalEvent(null)}
                    onAttend={handleAttendEvent}
                />
            )}
            {activeArticle && (
                <ArticleModal
                    article={activeArticle}
                    onClose={() => setActiveArticle(null)}
                    onQuizComplete={handleQuizComplete}
                />
            )}
            {isPersonalizedQuizModalOpen && personalizedQuiz && (
                <QuizModal
                    quiz={personalizedQuiz}
                    title="Your Personalized Quiz"
                    onClose={() => setIsPersonalizedQuizModalOpen(false)}
                    onQuizComplete={handlePersonalizedQuizComplete}
                />
            )}
            {isChallengeModalOpen && (
                <ChallengeFriendModal
                    friends={friends}
                    onClose={() => setIsChallengeModalOpen(false)}
                    onChallenge={handleChallengeSent}
                />
            )}
            {postToShare && (
                <ShareModal
                    post={postToShare}
                    onClose={() => setPostToShare(null)}
                    onShared={() => showToast('Shared successfully!')}
                />
            )}
            {isCreateCompetitionModalOpen && (
                <CreateCompetitionModal
                    friends={friends}
                    onClose={() => setIsCreateCompetitionModalOpen(false)}
                    onCreateCompetition={handleCreateCompetition}
                />
            )}
        </div>
    );
};

export default App;