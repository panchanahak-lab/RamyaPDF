
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Initialized GoogleGenAI with named parameter as required by the coding guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const performOCR = async (base64Image: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: "Extract all text from this PDF page image accurately. Maintain formatting if possible." }
        ]
      }
    });
    return response.text || "No text detected.";
  } catch (error) {
    console.error("OCR Error:", error);
    return "Failed to perform OCR.";
  }
};

export const summarizePDF = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Please summarize the following document content professionally: ${text.substring(0, 10000)}`
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Summary Error:", error);
    return "Failed to summarize.";
  }
};

export const detectFormFields = async (base64Image: string): Promise<any[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: "Identify all form fields (inputs, checkboxes, signature areas) in this image and return their approximate positions as a JSON array." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              label: { type: Type.STRING },
              x: { type: Type.NUMBER },
              y: { type: Type.NUMBER },
              width: { type: Type.NUMBER },
              height: { type: Type.NUMBER }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Form Detection Error:", error);
    return [];
  }
};
