import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import query from "../../../queries/getAllPosts";
import { client } from "../../../sanity";

export default async function oauth(req, res) {
    if (req.method === "POST") {
        const { name, email, image } = req.body;
        const exists = await client.fetch(
            `*[_type == 'user' && email == $email][0]`,
            {
                email: req.body.email,
            }
        );
        if (exists) {
            const accessToken = jwt.sign(
                { id: exists._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "30d",
                }
            );
            return res.status(200).json({ data: exists, token: accessToken });
        } else {
            const data = await client.create({
                _type: "user",
                name,
                email,
            });
            const accessToken = jwt.sign(
                { id: data._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "30d",
                }
            );
            return res.status(200).json({ data, token: accessToken });
        }
    }
}
