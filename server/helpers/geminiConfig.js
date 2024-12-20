// Make sure to include these imports:
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const geminiPrompt = async (prompt = String) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const schema = {
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        recommendation: {
          type: SchemaType.STRING,
        },
      },
      required: ["recommendation"],
    },
  };
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });
  const result = await model.generateContent(prompt);
  return result;
};

module.exports = geminiPrompt;
