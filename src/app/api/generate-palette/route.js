import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { color } = await request.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key is not configured' },
                { status: 500 }
            );
        }

        if (!color || typeof color !== 'string') {
            return NextResponse.json(
                { error: 'Invalid color format' },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Given the color "${color}", generate a creative and harmonious color palette. 
        For each color in the palette, provide:
        1. The RGB values
        2. A brief description of where this color appears in nature or design
        3. The symbolism and meaning of the color
        4. What this color pairs well with
        
        Return ONLY a valid JSON object in this exact format, with no additional text or formatting:
        {
            "colors": [
                {
                    "rgb": "rgb(r, g, b)",
                    "description": "brief description",
                    "symbolism": "color meaning",
                    "pairings": "what it pairs with"
                }
            ]
        }`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        try {
            // Try to parse the response as JSON
            const parsedResponse = JSON.parse(text);
            return NextResponse.json(parsedResponse);
        } catch (parseError) {
            // If parsing fails, try to extract JSON from the response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    const parsedResponse = JSON.parse(jsonMatch[0]);
                    return NextResponse.json(parsedResponse);
                } catch (e) {
                    throw new Error('Failed to parse AI response as JSON');
                }
            }
            throw new Error('No valid JSON found in AI response');
        }
    } catch (error) {
        return NextResponse.json(
            {
                error: 'Failed to generate color palette',
                details: error.message
            },
            { status: 500 }
        );
    }
} 