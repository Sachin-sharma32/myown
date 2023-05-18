import jwt from "jsonwebtoken";
import { client } from "../../../sanity";

export default async function getMe(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const existUser = await client.fetch(
            `*[_type == "user" && _id == $id][0]`,
            {
                id: user.id,
            }
        );
        const image = await client.fetch(
            `*[_type == 'user' && _id == $id][0]{
            image{asset->{_id,url}}
        }`,
            {
                id: user.id,
            }
        );
        if (image.image?.asset?.url) {
            return res.status(200).json({
                status: "success",
                user: { ...existUser, image: image.image.asset.url },
            });
        } else {
            return res.status(200).json({
                status: "success",
                user: { ...existUser },
            });
        }
    }
    return res.json({ message: "jwt not provided or is incorrect" });
}
