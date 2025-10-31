import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { productDescription, productName } = await req.json();

    if (!productDescription) {
      return new NextResponse('Product description is required', { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return new NextResponse('API configuration error', { status: 500 });
    }

    // Call Gemini API with the latest model
    const prompt = `Create a brief, engaging 1-2 sentence product summary for: "${productName}". Description: "${productDescription}". Focus on key benefits and appeal to online shoppers.`;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', await response.text());
      return new NextResponse('AI service error', { status: 500 });
    }

    const data = await response.json();
    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate summary';

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('[SUMMARIZE_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
