import { uuid } from "uuidv4";
import { client } from "../../../sanity";

export default async function like(req, res) {
    if (req.method === "PUT") {
        const { userId, postId, bookmark } = req.body;
        const data = bookmark
            ? await client
                  .patch(userId)
                  .setIfMissing({ bookmarks: [] })
                  .insert("after", "bookmarks[-1]", [
                      {
                          _key: uuid(),
                          _ref: postId,
                      },
                  ])
                  .commit()
            : await client
                  .patch(userId)
                  .unset([`bookmarks[_ref=="${postId}"]`])
                  .commit();
        res.status(200).json(data);
    }
}
