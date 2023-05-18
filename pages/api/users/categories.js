import { client } from "../../../sanity";

export default async function categories(req, res) {
    const query = `*[_type == 'category']`;
    const data = await client.fetch(query);
    res.status(200).json(data);
}
