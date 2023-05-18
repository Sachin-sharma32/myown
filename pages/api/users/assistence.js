import cors from "cors";
import { Configuration, OpenAiApi } from "openai";

export default async function Assistence(req, res) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openAiApi = new OpenAiApi(configuration);
    if (req.method === "POST") {
        const data = await openAiApi.createCompletion({
            model: "text-davinci-003",
            prompt: `${req.body.prompt}`,
            //* risk - temprature
            temperature: 0,
            //* response size (characters)
            max_tokens: 3000,
            top_p: 1,
            //* likelyhood of repeating the same response
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: Response.data.choices[0].text,
        });
    }
}
