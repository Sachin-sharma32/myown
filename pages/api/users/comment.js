import { uuid } from "uuidv4";
import { client } from "../../../sanity";

export default async function comment(req, res) {
    if (req.method === "PUT") {
        const date = new Date().toJSON();
        const { postId, values } = req.body;
        const comment = {
            _type: "comment",
            name: values.name,
            email: values.email,
            comment: values.comment,
            publishedAt: date,
        };
        const createdComment = await client.create(comment);
        const data = await client
            .patch(postId)
            .setIfMissing({ comments: [] })
            .insert("after", "comments[-1]", [
                {
                    _key: uuid(),
                    _ref: createdComment._id,
                },
            ])
            .commit();
        const postComments = await client.fetch(
            `*[_type == 'post' && _id == $id][0]{
              comments[]->
          }`,
            {
                id: data._id,
            }
        );
        res.status(200).json(postComments);
    }
}
