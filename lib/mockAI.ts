export async function mockAIReply(userText: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 700));

  const safeReplies = [
    "I understand. Can you tell me a bit more about how you're feeling today?",
    "That sounds important. Would you like to track this in your symptom tracker?",
    "I'm here to help guide you, but remember this is not medical advice.",
    "Thanks for sharing. Do you want to continue or start a new chat?",
    "Noted. Would you like me to summarize this for you later?",
  ];

  return safeReplies[Math.floor(Math.random() * safeReplies.length)];
}
