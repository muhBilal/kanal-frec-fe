// pages/api/chat.js

import axios from "axios";

const ChatGPTURL = "https://api.openai.com/v1/completions";

export default async function handler(req, res) {
    const { message } = req.body;

    try {
        const response = await axios.post(ChatGPTURL, {
            prompt: message,
            model: "chatgpt",
            temperature: 0.7,
            top_p: 1,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
            },
        });

        const botResponse = response.data.completions[0].text;
        res.json({ botResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong." });
    }
}
