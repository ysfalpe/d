'use server';

import { auth } from '@clerk/nextjs/server';
import { useCredit } from './user';
import { rateLimit } from '@/lib/rateLimit';

const OPENROUTER_API_KEY = process.env.OPENAI_API_KEY;
const OPENROUTER_BASE_URL = process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1';

interface GenerateOptions {
  appName?: string;
  description?: string;
  tone?: string;
  language?: string;
}

export interface AIResponse {
  headline: string;
  highlight: string;
  icon: string;
  color: string;
  creditsRemaining?: number;
}

export async function generateCaptionAction(imageBase64: string, options: GenerateOptions = {}): Promise<AIResponse> {
  // Auth kontrolü
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Not authenticated');
  }

  // Rate limiting (kullanıcı başına dakikada 10 istek)
  const rateLimitResult = rateLimit(userId, 10, 60000);
  if (!rateLimitResult.success) {
    throw new Error(`Too many requests. Please wait ${rateLimitResult.resetIn} seconds.`);
  }

  // Image size kontrolü (max 5MB base64 = ~6.6MB string)
  const MAX_IMAGE_SIZE = 7 * 1024 * 1024; // 7MB base64 string
  if (imageBase64.length > MAX_IMAGE_SIZE) {
    throw new Error('Image too large. Please use an image smaller than 5MB.');
  }

  // Kredi kontrolü - TEMPORARY BYPASS
  // const creditResult = await useCredit();

  // if (!creditResult.success) {
  //   throw new Error(creditResult.error || 'No credits remaining. Please upgrade to Pro.');
  // }

  if (!OPENROUTER_API_KEY) {
    throw new Error('API Key is missing');
  }

  const { appName, description, tone, language = 'English' } = options;

  // --- SUPER PROMPT WITH JSON OUTPUT ---
  let systemPrompt = `You are an elite App Store optimization expert and creative director.
Your goal is to generate the perfect marketing caption for an app screenshot.

PROCESS (Follow these steps internally):
1. **Context Absorption**: Deeply analyze the provided App Name and Description. Understand the app's core value and target audience. Ask yourself: "What problem does this app solve?"
2. **Visual Analysis**: Examine the screenshot. What specific feature or screen is shown? Does it match the description? (e.g., Is it a dashboard? A settings screen? A chat interface?)
3. **Ideation**: Generate 3 distinct, high-quality headline options that connect the *visuals* to the *value proposition*.
4. **Evaluation**: Critically review your 3 options. Which one is the most catchy? Which one fits the requested Tone best? Which one is short and punchy (Max 6 words)?
5. **Selection**: Pick the single best option.

STRICT OUTPUT RULES:
1. Output MUST be valid JSON only. No markdown formatting like \`\`\`json.
2. The JSON structure must be:
{
  "headline": "The full headline text (Max 6 words)",
  "highlight": "The specific word(s) from the headline to highlight/color",
  "icon": "A Lucide React icon name that matches the content (e.g., 'zap', 'shield', 'heart', 'trending-up')",
  "color": "A hex color code that fits the vibe (e.g., '#facc15' for energy, '#4ade80' for growth)"
}
3. Use Title Case for the headline.
4. Ensure the 'highlight' word exists inside the 'headline'.`;

  let userPrompt = `Here is the App Context and the Screenshot to analyze:`;

  if (appName) {
    userPrompt += `\n\nAPP NAME: "${appName}"`;
  }

  if (description) {
    userPrompt += `\nAPP DESCRIPTION: "${description}"`;
  }

  if (tone) {
    userPrompt += `\nREQUESTED TONE: "${tone}"`;
  }

  userPrompt += `\nTARGET LANGUAGE: ${language}. (Write the headline in ${language})`;
  userPrompt += `\n\nTASK: Analyze the screenshot in the context of the app description. Generate the single best JSON response based on your internal evaluation.`;

  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://d-sigma-five.vercel.app',
        'X-Title': 'AppShot AI',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        response_format: { type: 'json_object' }, // Force JSON mode if supported
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: userPrompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API Error:', errorText);
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    let rawContent = data.choices[0]?.message?.content?.trim();

    // Cleanup: Remove markdown code blocks if present
    rawContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsed: AIResponse = JSON.parse(rawContent);

      // Fallbacks if AI misses fields
      return {
        headline: parsed.headline || "Amazing Feature",
        highlight: parsed.highlight || "",
        icon: parsed.icon || "sparkles",
        color: parsed.color || "#fbbf24",
        creditsRemaining: 100 // Mock credit remaining since we bypassed check
      };
    } catch (e) {
      console.error("JSON Parse Error:", e);
      // Fallback logic
      return {
        headline: "Experience The Best",
        highlight: "Best",
        icon: "star",
        color: "#fbbf24",
        creditsRemaining: 100 // Mock credit remaining
      };
    }

  } catch (error) {
    console.error('Error generating caption:', error);
    // Eğer kredi hatası ise, özel mesaj göster
    if (error instanceof Error && error.message.includes('credits')) {
      throw error; // Kredi hatasını yukarı fırlat
    }
    return {
      headline: "Error Generating",
      highlight: "",
      icon: "alert-circle",
      color: "#ef4444"
    };
  }
}
