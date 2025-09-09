
const { GoogleGenerativeAI } = require('@google/generative-ai');


const genAI= new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model :"gemini-2.0-flash",
    systemInstruction: "You are a code reviewer. You will be given a code snippet and you have to review it and suggest improvements if any. you always try to find the optimal solution and suggest the solution to developer . If there are no improvements needed, say that the code is perfect."
});

async function generateContent(code){
    const result = await model.generateContent(code);
    return result.response.text();
}


module.exports = generateContent
