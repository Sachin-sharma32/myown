import { client } from "../../../sanity";

export default async function updateuser(req, res) {
    const { values, userId, image } = req.body;
    const projectId = process.env.SANITY_PROJECT_ID;
    const dataset = process.env.SANITY_DATASET;
    const token = process.env.SANITY_TOKEN;
    const mutations = [
        {
            patch: {
                id: userId,
                set: {
                    name: values.name,
                    image,
                    bio: values.bio,
                    location: values.location,
                    work: values.work,
                    education: values.education,
                },
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
    )
        .then((response) => {
            res.status(200).json({ data: req.body });
        })
        .catch((error) => {
            res.status(404).json({
                status: "Error",
                message: "something went wrong",
            });
        });
}
