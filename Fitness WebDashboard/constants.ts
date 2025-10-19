import { Task, Reward, LeaderboardUser, TaskCategory, Event, EventCategory, Article, ArticleCategory, Friend, Competition, CommunityGoal } from './types';

export const INITIAL_TASKS: Task[] = [
  { id: 2, title: '30-minute walk or workout', category: TaskCategory.Health, points: 25, completed: false },
  { id: 3, title: 'Track daily expenses', category: TaskCategory.Financial, points: 15, completed: false },
  { id: 4, title: 'Read a financial news article', category: TaskCategory.Financial, points: 10, completed: false },
  { id: 6, title: 'Challenge a friend to a step count contest', category: TaskCategory.Social, points: 15, completed: false, action: 'challengeFriend' },
];

export const REWARDS: Reward[] = [
    { id: 1, title: '20% off Gym Membership', description: 'Partner gym discount', pointsRequired: 1000 },
    { id: 2, title: 'Free Financial Consultation', description: '30-min session with a pro', pointsRequired: 2500 },
    { id: 3, title: '1-month Yoga App Subscription', description: 'Premium access to partner app', pointsRequired: 1500 },
    { id: 4, title: '$5 Healthy Smoothie Voucher', description: 'Redeem at local health cafes', pointsRequired: 500 },
];

export const LEADERBOARD_DATA: LeaderboardUser[] = [
  { id: 1, name: 'Alex', avatar: 'https://picsum.photos/seed/alex/100', points: 2450 },
  { id: 2, name: 'You', avatar: 'https://picsum.photos/seed/you/100', points: 1890, isCurrentUser: true },
  { id: 3, name: 'Maria', avatar: 'https://picsum.photos/seed/maria/100', points: 1720 },
  { id: 4, name: 'David', avatar: 'https://picsum.photos/seed/david/100', points: 1500 },
  { id: 5, name: 'Chloe', avatar: 'https://picsum.photos/seed/chloe/100', points: 1130 },
];

export const INITIAL_EVENTS: Event[] = [
    { id: 1, title: 'Community 5K Fun Run', category: EventCategory.Fitness, date: 'Saturday, 10:00 AM', location: 'Central Park', points: 100 },
    { id: 2, title: 'Intro to Stock Investing Webinar', category: EventCategory.Financial, date: 'Tuesday, 7:00 PM', location: 'Online', points: 75 },
    { id: 3, title: 'Outdoor Yoga Session', category: EventCategory.Fitness, date: 'Sunday, 9:00 AM', location: 'Sunset Hill', points: 100 },
    { id: 4, title: 'Budgeting 101 Workshop', category: EventCategory.Financial, date: 'Thursday, 6:30 PM', location: 'Community Center', points: 75 },
];

export const POST_REWARD_POINTS = 15;
export const DAILY_POST_LIMIT = 2;

export const INITIAL_ARTICLES: Article[] = [
    {
        id: 1,
        title: "The Power of Compound Interest",
        category: ArticleCategory.Article,
        content: "Compound interest is the eighth wonder of the world. It is the interest you earn on interest. This concept can make a deposit or loan grow at a faster rate than simple interest, which is interest calculated only on the principal amount. The power of compounding can have a significant impact on your savings and investments over time. Starting early is key, as it allows your money more time to grow.",
        quiz: {
            questions: [
                { question: "What is compound interest?", options: ["Interest on principal", "Interest on interest", "A type of tax", "A bank fee"], correctAnswer: 1, points: 10 },
                { question: "What is the key to maximizing compound interest?", options: ["Starting late", "Withdrawing often", "Starting early", "Investing in a single stock"], correctAnswer: 2, points: 10 },
            ]
        }
    },
    {
        id: 2,
        title: "Benefits of High-Intensity Interval Training (HIIT)",
        category: ArticleCategory.Blog,
        content: "High-Intensity Interval Training (HIIT) involves short bursts of intense exercise alternated with low-intensity recovery periods. It is one of the most time-efficient ways to exercise. A HIIT workout can range from 10 to 30 minutes in duration. Despite the short duration, it can produce health benefits similar to twice the amount of moderate-intensity exercise. Benefits include burning a lot of calories in a short time, boosting your metabolic rate for hours after exercise, and improving oxygen consumption.",
        quiz: {
            questions: [
                { question: "What does HIIT stand for?", options: ["High-Intensity Interval Training", "Highly Important Intense Training", "Healthy Individual's Timed Training"], correctAnswer: 0, points: 10 },
                { question: "What is a major benefit of HIIT?", options: ["It takes a long time", "It's not very effective", "It's time-efficient", "It's only for professional athletes"], correctAnswer: 2, points: 10 },
            ]
        }
    },
];

export const INITIAL_FRIENDS: Friend[] = [
    LEADERBOARD_DATA[0], // Alex
    LEADERBOARD_DATA[2], // Maria
    LEADERBOARD_DATA[3], // David
    LEADERBOARD_DATA[4], // Chloe
];

export const INITIAL_COMPETITIONS: Competition[] = [
    {
        id: 1,
        title: 'Weekly Points Challenge',
        endsIn: '3 days',
        participants: [
            { id: 2, name: 'You', avatar: 'https://picsum.photos/seed/you/100', points: 320 },
            { id: 1, name: 'Alex', avatar: 'https://picsum.photos/seed/alex/100', points: 450 },
            { id: 3, name: 'Maria', avatar: 'https://picsum.photos/seed/maria/100', points: 280 },
        ]
    },
    {
        id: 2,
        title: 'Weekend Warrior',
        endsIn: '1 day',
        participants: [
            { id: 2, name: 'You', avatar: 'https://picsum.photos/seed/you/100', points: 150 },
            { id: 4, name: 'David', avatar: 'https://picsum.photos/seed/david/100', points: 120 },
            { id: 5, name: 'Chloe', avatar: 'https://picsum.photos/seed/chloe/100', points: 180 },
        ],
        ownerId: 2 // 'You' are the owner
    }
];

export const WATER_GOAL = 8;
export const WATER_GOAL_POINTS = 20;

export const DAILY_TASK_LIMIT = 10;
export const WATER_COOLDOWN_HOURS = 2;
export const REFERRAL_POINTS = 100;

export const INITIAL_COMMUNITY_GOALS: CommunityGoal[] = [
    {
        id: 1,
        title: 'Community Hydration Challenge',
        description: 'The whole community is working together to drink 10,000 glasses of water. Every glass you log contributes!',
        targetPoints: 10000,
        currentPoints: 4350,
        pointBonus: 150,
        charityAction: 'the company will donate $200 to a clean water charity.',
        completed: false,
    },
    {
        id: 2,
        title: 'Financial Wellness Sprint',
        description: 'Accumulate points from completing financial tasks to unlock a community reward.',
        targetPoints: 7500,
        currentPoints: 6890,
        pointBonus: 100,
        charityAction: 'the company will sponsor a financial literacy workshop for local students.',
        completed: false,
    },
];

export const SPIN_WHEEL_PRIZES: number[] = [10, 25, 5, 50, 15, 100, 20, 5];
