import { GoogleGenAI } from '@google/genai';

// Inicializamos el motor con tu llave
const ai = new GoogleGenAI({ apiKey: "const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });" });

export async function buscarTraduccionNostalgica(antojoUsuario) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-flash-lite-latest",
            contents: antojoUsuario,
            config: {
                responseMimeType: "application/json",
                systemInstruction: `Eres el motor de datos de Latino Foodie Guide. Tu tarea es traducir antojos o ingredientes latinoamericanos a sus equivalentes en Manila, Filipinas, combinando precisión técnica con un toque de calidez comunitaria.

SIEMPRE debes responder exclusivamente con un objeto JSON válido, sin textos introductorios ni bloques de código Markdown (no uses \`\`\`json).

Usa exactamente la siguiente estructura de datos:
{
  "ingrediente_buscado": "Nombre del ingrediente ingresado",
  "sustituto_local": "El equivalente o sustituto en el mercado filipino",
  "donde_comprar": "Tiendas online o supermercados locales en Manila",
  "consejo_culinario": "Un tip corto, empático y nostálgico sobre cómo adaptarlo en la cocina (máximo 2 frases)"
}`
            }
        });

        // Retornamos el objeto JSON listo para que la PWA lo pinte en pantalla
        return JSON.parse(response.text);

    } catch (error) {
        console.error("Error en el motor de Latino Foodie Guide:", error);
        return null;
    }
}
