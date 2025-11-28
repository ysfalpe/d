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

  // Kredi kontrolü
  const creditResult = await useCredit();
  
  if (!creditResult.success) {
    throw new Error(creditResult.error || 'No credits remaining. Please upgrade to Pro.');
  }

  if (!OPENROUTER_API_KEY) {
    throw new Error('API Key is missing');
  }

  const { appName, description, tone, language = 'English' } = options;

  // --- SUPER PROMPT WITH JSON OUTPUT ---
  let systemPrompt = `You are an expert App Store designer and copywriter.
Your task is to analyze an app screenshot and generate a structured JSON response for a marketing card.

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

  let userPrompt = 'Analyze this app screenshot.';

  if (appName) {
    userPrompt += ` App Name: "${appName}".`;
  }

  if (description) {
    userPrompt += ` Context: "${description}".`;
  }

  if (tone) {
    userPrompt += ` Tone: "${tone}".`;
  }

  userPrompt += ` TARGET LANGUAGE: ${language}. Write the headline in ${language}.`;
  userPrompt += `\n\nGenerate the JSON response. Focus on benefits. Make the design pop!`;

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
            creditsRemaining: creditResult.remaining
        };
    } catch (e) {
        console.error("JSON Parse Error:", e);
        // Fallback logic
        return {
            headline: "Experience The Best",
            highlight: "Best",
            icon: "star",
            color: "#fbbf24",
            creditsRemaining: creditResult.remaining
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
