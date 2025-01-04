import { getGroqChatCompletion } from "@/app/api/platform/utils";

const SYSTEM_MESSAGE = `You are a platform that summarizes poeples' day, basically the user will pass the things they did at what point of time, it will be an array of javascript object, they want to retrospect so you should summarize their day. Reply as markdown, and really summarize it, do not write long paragraphs. ONLY ONE SUMMARY PER DAY RULE!! Only summarise it if user has some entries, otherwise tell him to add entries and come back tomorrw, because one user can only summarise his day once! if the user has provided something, then summarize in a helpful way so that the user can retrospect on the day. Do not make it too big like adding all the activities in there. But give them reflection so that they may improve or continue being the best they can! 
This is what the user wants:
	•	Get personalized daily summaries.
	•	Spot patterns and highlights.
	•	Discover areas for improvement.

please follow this pattern:
**[Date] Summary**
summarise the full day
**Reflections**
Add points to reflect on
`;

export async function POST(request: Request) {
  const res = await request.json().catch(() => {
    return Response.json(
      { error: "Expected a json with message field in the request." },
      { status: 400 },
    );
  });
  if (!res && !res.message) {
    return Response.json({ error: "no message provided" }, { status: 400 });
  }
  const chatCompletion = await getGroqChatCompletion(
    SYSTEM_MESSAGE,
    res.message,
  );
  const reply = chatCompletion.choices[0].message.content!;
  if (reply === null)
    return Response.json({ error: "Couldn't get reply" }, { status: 500 });
  return Response.json(reply);
}
