import { client } from "../../../sanity";

export default async function Preferences(req, res) {
    if (req.method === "PUT") {
        req.body;
        const data = await client
            .patch(req.body.userId)
            .setIfMissing({ preferences: [] })
            .set({
                preferences: req.body.preferences,
            })
            .commit();
        res.status(200).json(data);
    }
}
