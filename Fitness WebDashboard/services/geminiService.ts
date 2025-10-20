import { GoogleGenAI, Type } from "@google/genai";
import { Task, TaskCategory, DietAnalysisResult, UserProfile, Quiz } from '../types';

const ai = new GoogleGenAI({ apiKey: 'GEMINI_API_KEY' });

export const generatePersonalizedGoals = async (completedTasks: Task[], incompleteTasks: Task[]): Promise<Omit<Task, 'id' | 'completed'>[]> => {
  const completedTitles = completedTasks.map(t => t.title).join(', ') || 'None';
  const incompleteTitles = incompleteTasks.map(t => t.title).join(', ') || 'None';

  const prompt = `
    You are a motivational wellness coach for a gamified app.
    Based on the user's recent activity, generate 3 new personalized wellness goals.
    Create a mix of health, financial, and social goals that are creative and engaging.
    Avoid suggesting goals the user already has.

    User's completed tasks today: ${completedTitles}
    User's current incomplete tasks: ${incompleteTitles}

    Return the goals as a JSON array of objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: 'The title of the goal. Make it actionable and concise.'
              },
              category: {
                type: Type.STRING,
                description: `The category of the goal. Must be one of: '${TaskCategory.Health}', '${TaskCategory.Financial}', or '${TaskCategory.Social}'.`
              },
              points: {
                type: Type.INTEGER,
                description: 'A point value for the goal, between 10 and 50, based on difficulty.'
              }
            },
            required: ['title', 'category', 'points']
          },
        },
      },
    });

    const jsonString = response.text;
    const generatedGoals = JSON.parse(jsonString);

    // Validate that the returned categories are valid
    return generatedGoals.filter((goal: any) => 
      Object.values(TaskCategory).includes(goal.category)
    );

  } catch (error) {
    console.error("Error generating personalized goals:", error);
    // Fallback goals in case of API error
    return [
      { title: 'Try a 5-minute meditation', category: TaskCategory.Health, points: 15 },
      { title: 'Set a savings goal for the week', category: TaskCategory.Financial, points: 20 },
    ];
  }
};

export const analyzeDiet = async (mealDescription: string): Promise<DietAnalysisResult> => {
  const prompt = `
    As a nutritional assistant in a wellness app, analyze the user's meal.
    The user had: "${mealDescription}".
    Based on this meal, provide a health score, a justification, and a suggestion.
    - Points should range from -10 (very unhealthy) to 30 (super healthy and balanced).
    - Justification should be a brief, positive, and encouraging explanation for the score.
    - Suggestion should be a simple, actionable tip for their next meal or a related health activity.
    Return the response as a JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            points: {
              type: Type.INTEGER,
              description: 'The score for the meal, from -10 to 30.'
            },
            justification: {
              type: Type.STRING,
              description: 'A brief, encouraging explanation for the score.'
            },
            suggestion: {
              type: Type.STRING,
              description: 'An actionable tip for the next meal or a health activity.'
            }
          },
          required: ['points', 'justification', 'suggestion']
        },
      },
    });
    
    const jsonString = response.text;
    return JSON.parse(jsonString) as DietAnalysisResult;

  } catch (error) {
    console.error("Error analyzing diet:", error);
    // Fallback in case of API error
    return {
      points: 5,
      justification: "Couldn't analyze the meal right now, but good job for tracking it!",
      suggestion: "Try to include some colorful vegetables in your next meal."
    };
  }
};

export const generatePersonalizedHealthGoals = async (profile: UserProfile): Promise<Omit<Task, 'id' | 'completed'>[]> => {
    const prompt = `
        You are a specialized wellness coach. A user has provided their health metrics.
        Generate 2-3 new, actionable, and personalized HEALTH goals based on this data.
        These goals MUST be specific to the user's data.
        IMPORTANT: DO NOT generate generic goals like "drink water", "go for a walk", "exercise", or "get enough sleep". The app already has these.
        Focus on goals tailored to their specific conditions, height, weight, and age.

        User's Profile:
        - Age: ${profile.age || 'Not provided'}
        - Height: ${profile.height ? profile.height + ' cm' : 'Not provided'}
        - Weight: ${profile.weight ? profile.weight + ' kg' : 'Not provided'}
        - Health Conditions: ${profile.conditions || 'None specified'}

        Example for someone with 'knee pain': "Research and perform 10 minutes of low-impact knee-strengthening exercises."
        Example for someone with 'high stress': "Practice a 5-minute box breathing session to manage stress."

        Return the goals as a JSON array of objects.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: {
                                type: Type.STRING,
                                description: 'The title of the goal. Make it highly specific and actionable based on the user profile.'
                            },
                            category: {
                                type: Type.STRING,
                                description: `The category must be '${TaskCategory.Health}'.`
                            },
                            points: {
                                type: Type.INTEGER,
                                description: 'A point value between 20 and 50, based on the goal\'s positive impact.'
                            }
                        },
                        required: ['title', 'category', 'points']
                    },
                },
            },
        });

        const jsonString = response.text;
        const generatedGoals = JSON.parse(jsonString);

        return generatedGoals.filter((goal: any) => goal.category === TaskCategory.Health);
    } catch (error) {
        console.error("Error generating personalized health goals:", error);
        return [{ title: 'Explore a new healthy recipe online', category: TaskCategory.Health, points: 20 }];
    }
};

export const generatePersonalizedQuiz = async (profile: UserProfile): Promise<Quiz | null> => {
    if (!profile.conditions) {
        return null;
    }
    const prompt = `
        You are a health educator creating a quiz for a wellness app.
        The user has specified the following health condition(s): "${profile.conditions}".
        Generate a short, helpful, and educational multiple-choice quiz with 3 questions related to managing or understanding this condition.
        For each question, provide 3 plausible options, with only one being correct.
        The goal is to educate the user in a positive and empowering way.
        Return the quiz as a JSON object.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING, description: 'The question text.' },
                                    options: {
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING },
                                        description: 'An array of 3 string options.'
                                    },
                                    correctAnswer: { type: Type.INTEGER, description: 'The 0-based index of the correct answer.' },
                                    points: { type: Type.INTEGER, description: 'Assign 15 points for each question.' }
                                },
                                required: ['question', 'options', 'correctAnswer', 'points']
                            }
                        }
                    },
                    required: ['questions']
                },
            },
        });

        const jsonString = response.text;
        const quizData = JSON.parse(jsonString);
        // Basic validation
        if (quizData.questions && quizData.questions.length > 0) {
            return quizData as Quiz;
        }
        return null;
    } catch (error) {
        console.error("Error generating personalized quiz:", error);
        return null;
    }
};
