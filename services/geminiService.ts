import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCaptionForImage = async (base64Image: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock caption.");
    return "API Anahtarı eksik olduğu için otomatik başlık oluşturulamadı. Harika bir fotoğraf! ✨";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Sen popüler bir Türk sosyal medya fenomenisin. 
      Aşağıdaki görsele uygun, etkileşim alacak, eğlenceli ve samimi bir Instagram gönderi açıklaması (caption) yaz.
      Türkçe dilini doğal ve akıcı kullan.
      Emoji kullan.
      En sona 3-5 tane popüler ve görselle ilgili Türkçe hashtag ekle.
      Sadece caption metnini döndür, başka açıklama yapma.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg for simplicity, API handles standard types well
              data: base64Image
            }
          },
          { text: prompt }
        ]
      }
    });

    return response.text?.trim() || "Harika bir kare! ✨ #turkagram";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Fotoğraf analiz edilemedi ama eminim harikadır! ✨ #turkagram";
  }
};

export const suggestHashtags = async (caption: string): Promise<string[]> => {
    if (!apiKey) return ['#turkagram', '#kesfet', '#yeni'];

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Bu Instagram açıklaması için 5 tane popüler Türkçe hashtag öner: "${caption}". Sadece hashtagleri boşlukla ayrılmış olarak ver.`
        });
        const text = response.text || "";
        return text.split(' ').filter(t => t.startsWith('#'));
    } catch (e) {
        return ['#turkagram', '#kesfet'];
    }
}