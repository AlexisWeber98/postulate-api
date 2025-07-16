import { groqApiKey, groqApi, iaModel } from "../../config/config.js";

export const iaRequest = async (prompt: string) => {
  try {
    const response = await fetch(`${groqApi}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        model: iaModel,
        messages: [
          {
            role: "user",
            content: `Eres un experto en empleabilidad y optimización de CV. Te proporcionaré la URL de una vacante de empleo. Analiza la vacante y dame una lista de recomendaciones específicas para adaptar y mejorar mi CV, con el objetivo de aumentar mis posibilidades de ser seleccionado para ese puesto. La URL de la vacante es: ${prompt}`, 
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    const data = await response.json(); 
   
    // Extraer solo la respuesta de la IA 
    console.log("RESPUESTSA DE IA",data);
    const iaText = data.choices[0].message.content;
    console.log("RESPUESTSA DE IA",iaText);

    // Calcular tokens restantes (ajusta maxTokens según modelo)
    const maxTokens = 4096; 
    const userdTokens = data.usage.total_tokens;
    const tokensRemaining = maxTokens - userdTokens;

    return {
      iaText,
      tokensRemaining
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in iaRequest: ${error.message}`);
    }
    throw new Error("An unknown error occurred in iaRequest");
  }
};
