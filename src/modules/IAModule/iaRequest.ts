import { groqApiKey, groqApi, iaModel } from "../../config/config.js";

export const iaRequest = async (prompt: string) => {
  try {
    const response = await fetch(`${groqApi}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        "Content-Type": "application/json", // fixed typo in "Content-Type"
      },
      body: JSON.stringify({
        model: iaModel,
        messages: [
          {
            role: "user",
            content: prompt, // changed _promt to prompt for clarity
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // added await to properly parse JSON
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in iaRequest: ${error.message}`);
    }
    throw new Error("An unknown error occurred in iaRequest");
  }
};
