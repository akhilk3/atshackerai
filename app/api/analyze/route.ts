import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

// Initialize the official SDK using your secure environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { jd, resumeText } = await request.json();

    if (!jd || !resumeText) {
      return NextResponse.json({ error: 'Missing Data Streams' }, { status: 400 });
    }

    // Call Gemini with Structured JSON Output constraints
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are an expert ATS (Applicant Tracking System) parser and HR analyst. 
              Analyze the following Resume against the Job Description (JD).
              
              Calculate a strict, realistic match score (0-100%) based on matching skills, experience level, tools, and domain alignment.
              Provide specific, actionable bullet points highlighting missing keywords, formatting errors, or experience gaps.
              
              JOB DESCRIPTION:
              ${jd}
              
              RESUME MATRIX:
              ${resumeText}`
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { 
              type: Type.INTEGER, 
              description: 'Strict percentage score matching applicant matrix to target JD' 
            },
            feedback: { 
              type: Type.STRING, 
              description: 'Professional bulleted list outlining critical missing keywords, technical gaps, and direct recommendations' 
            }
          },
          required: ['score', 'feedback'],
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error('Empty model matrix response');

    const parsedData = JSON.parse(resultText);
    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error('AI Edge Analysis Engine Failure:', error);
    return NextResponse.json(
      { error: 'Internal Core Analysis Failed', details: error.message }, 
      { status: 500 }
    );
  }
}