import { client } from "../../../sanity";
import CryptoJS from "crypto-js";

export default async function verifyUser(req, res) {
    const existUser = await client.fetch(
        `*[_type == "user" && email == $email][0]`,
        {
            email: req.query.email,
        }
    );
    if (existUser) {
        return res.status(400).json({ message: "Session expired" });
    } else {
        const queryName = req.query.name.replace("-", " ");
        const queryPassword = req.query.password.replace("-", " ");
        const projectId = process.env.SANITY_PROJECT_ID;
        const dataset = process.env.SANITY_DATASET;
        const token = process.env.SANITY_TOKEN;
        const mutations = [
            {
                create: {
                    _type: "user",
                    name: queryName,
                    email: req.query.email,
                    password: CryptoJS.AES.encrypt(
                        queryPassword,
                        process.env.CRYPTO_SECRET
                    ).toString(),
                    isAdmin: false,
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
                res.redirect(`${process.env.SITE_URL}/signin`);
            })
            .catch((error) => {
                res.status(400).json({
                    status: "Error",
                    message: "something went wrong",
                });
            });
    }
}
