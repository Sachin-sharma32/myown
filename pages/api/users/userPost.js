import { uuid } from "uuidv4";
import { client } from "../../../sanity";

export default async function userPost(req, res) {
    if (req.method === "POST") {
        req.body;
        const { title, image, content, category, tags, type, userId } =
            req.body;
        const userPost = {
            _type: "userPost",
            title,
            image,
            content,
            category,
            tags,
            type,
        };
        const createdPost = await client.create(userPost);
        const data = await client
            .patch(userId)
            .setIfMissing({ posts: [] })
            .insert("after", "posts[-1]", [
                {
                    _key: uuid(),
                    _ref: createdPost._id,
                },
            ])
            .commit();
        "data", data;
        res.status(200).json({ data });
    }
}
