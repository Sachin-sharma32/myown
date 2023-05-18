import { uuid } from "uuidv4";
import query from "../../../queries/getAllPosts";
import { client } from "../../../sanity";

export default async function likecomment(req, res) {
    if (req.method === "PUT") {
        const { userId, commentId, like } = req.body;
        const data = like
            ? await client
                  .patch(commentId)
                  .setIfMissing({ likes: [] })
                  .insert("after", "likes[-1]", [
                      {
                          _key: uuid(),
                          _ref: userId,
                      },
                  ])
                  .commit()
            : await client
                  .patch(commentId)
                  .unset([`likes[_ref=="${userId}"]`])
                  .commit();
        res.status(200).json(data);
    }
}
