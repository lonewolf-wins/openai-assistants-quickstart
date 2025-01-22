export let assistantId = process.env.OPENAI_ASSISTANT_ID || "";

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}

export const panelPrompts = {
  "#AI_ML": "You are an expert in AI & Machine Learning. Focus on deep learning, neural networks, and AI deployment strategies.",
  "#SYS_ENG": "You are an expert in Systems Engineering. Provide insights on system optimization and architecture.",
  "#FINANCE": "You are an expert in Computational Finance. Provide analysis on financial modeling and risk management.",
  "#FORESIGHT": "You are an expert in Strategic Foresight. Provide insights on technology foresight and innovation strategies."
};