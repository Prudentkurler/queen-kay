import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, conversationHistory } = await req.json();

    if (!message) {
      return new NextResponse('Message is required', { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return new NextResponse('API configuration error', { status: 500 });
    }

    // Build conversation context
    const contents = conversationHistory || [];
    contents.push({
      parts: [{ text: message }],
      role: 'user',
    });

    // Call Gemini API with the latest model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{
              text: 'You are a helpful customer service assistant for Queenkay Importation, an e-commerce store that sells products from China and has in-stock items. Be friendly, concise, and helpful. Answer questions about products, shipping, returns, and pre-orders.'
            }]
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', await response.text());
      return new NextResponse('AI service error', { status: 500 });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process that request.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('[CHAT_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
