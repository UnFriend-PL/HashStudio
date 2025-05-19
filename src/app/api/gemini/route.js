import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { prompt } = await request.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('GEMINI_API_KEY is not configured in environment variables');
            return NextResponse.json(
                { error: 'API key is not configured' },
                { status: 500 }
            );
        }

        console.log('Initializing Gemini API with key:', apiKey.substring(0, 5) + '...');
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        console.log('Sending prompt to Gemini API...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log('Received response from Gemini API');

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error('Detailed Gemini API error:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        return NextResponse.json(
            { 
                error: 'Failed to generate response',
                details: error.message 
            },
            { status: 500 }
        );
    }
} 