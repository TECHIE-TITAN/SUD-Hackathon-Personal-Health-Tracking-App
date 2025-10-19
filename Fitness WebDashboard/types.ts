export enum PetMood {
  Happy = 'Happy',
  Neutral = 'Neutral',
  Sad = 'Sad',
}

export enum TaskCategory {
  Health = 'Health',
  Financial = 'Financial',
  Social = 'Social'
}

export interface Task {
  id: number;
  title: string;
  category: TaskCategory;
  points: number;
  completed: boolean;
  action?: 'challengeFriend'; // New property for action-based tasks
}

export interface PetState {
  name: string;
  mood: PetMood;
  happiness: number; // 0-100
}

export interface UserStats {
  points: number;
  wellnessCoins: number;
  dailyStreak: number;
}

export interface Reward {
  id: number;
  title: string;
  description: string;
  pointsRequired: number;
}

export interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  points: number;
  isCurrentUser?: boolean;
}

export interface DietAnalysisResult {
  points: number;
  justification: string;
  suggestion: string;
}

export interface Post {
  id: number;
  content: string;
  timestamp: string;
}

export enum EventCategory {
    Fitness = 'Fitness',
    Financial = 'Financial',
}

export interface Event {
    id: number;
    title: string;
    category: EventCategory;
    date: string;
    location: string;
    points: number;
}

// New types for Learn & Quiz feature
export enum ArticleCategory {
  Blog = 'Blog',
  News = 'News',
  Article = 'Article',
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct option
  points: number;
}

export interface Quiz {
  questions: Question[];
}

export interface Article {
  id: number;
  title: string;
  category: ArticleCategory;
  content: string;
  quiz: Quiz;
}

// New types for Friends feature
export interface Friend {
  id: number;
  name: string;
  avatar: string;
  points: number;
}

export interface Competition {
  id: number;
  title: string;
  endsIn: string;
  participants: Friend[];
  ownerId?: number;
}

// New type for Profile Personalization
export interface UserProfile {
    height: string;
    weight: string;
    age: string;
    conditions: string;
}

// New type for Community Goals
export interface CommunityGoal {
  id: number;
  title: string;
  description: string;
  targetPoints: number;
  currentPoints: number;
  pointBonus: number;
  charityAction: string;
  completed: boolean;
}