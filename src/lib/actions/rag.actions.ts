"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

export async function queryWithGenAi({
    query
}: {
    query: string
}) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: query,
        });
        if (!response.candidates || !response.candidates[0]) {
            throw new Error("Something went wrong while generating response with GenAI.");
        }
        return response.candidates[0].content?.parts?.[0].text
    } catch (error: any) {
        console.error(error);
        throw new Error(error?.message || "Something went wrong while generating response with GenAI.");
    }
}