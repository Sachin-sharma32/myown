import { uuid } from "uuidv4";
import query from "../../../queries/getAllPosts";
import { client } from "../../../sanity";

export default async function like(req, res) {
    if (req.method === "PUT") {
        const { userId, postId, like } = req.body;
        const data = like
            ? await client
                  .patch(postId)
                  .setIfMissing({ likes: [] })
                  .insert("after", "likes[-1]", [
                      {
                          _key: uuid(),
                          _ref: userId,
                      },
                  ])
                  .commit()
            : await client
                  .patch(postId)
                  .unset([`likes[_ref=="${userId}"]`])
                  .commit();
        const posts = await client.fetch(query);
        res.status(200).json({ data, posts });
    }
}
