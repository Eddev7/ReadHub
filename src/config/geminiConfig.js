import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  // Set the `responseMimeType` to output JSON
  generationConfig: { 
    responseMimeType: "application/json",
    temperature: 0.1,
  }
});

export default model;