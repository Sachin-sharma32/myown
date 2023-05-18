import { client } from "../../../sanity";

export default async function tags(req, res) {
    if (req.method == "GET") {
        const query = `*[_type == 'tag']`;
        const data = await client.fetch(query);
        res.status(200).json(data);
    } else if (req.method == "POST") {
        req.body;
        const exist = await client.fetch(
            `*[_type == "tag" && title == $title][0]`,
            {
                title: req.body.title,
            }
        );
        if (exist) {
            return res
                .status(400)
                .json({ message: "Tag with this name already exists" });
        }
        const projectId = process.env.SANITY_PROJECT_ID;
        const dataset = process.env.SANITY_DATASET;
        const token = process.env.SANITY_TOKEN;
        const mutations = [
            {
                create: {
                    _type: "tag",
                    title: req.body.title,
                },
            },
        ];
        fetch(
            `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`,
            {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ mutations }),
            }
        );
        const query = `*[_type == 'tag']`;
        const data = await client.fetch(query);
        res.status(200).json(data);
    }
}
