import Groq from "groq-sdk";

// Function to create a Groq instance with a specific API key
function createGroqInstance(): Groq {
  return new Groq({ apiKey: process.env.GROQ_API_KEY || "" });
}

export async function getGroqChatCompletion(
  SYSTEM_MESSAGE: string,
  message: string,
) {
  let lastError: unknown;
  const groq = createGroqInstance();

  try {
    // Attempt the request
    return await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_MESSAGE,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "mixtral-8x7b-32768",
    });
  } catch (error: unknown) {
    lastError = error;

    // If all keys fail, throw the last encountered error
    throw lastError || new Error("All API keys failed.");
  }
}
