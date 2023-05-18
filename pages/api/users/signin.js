import { client } from "../../../sanity";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export default async function signin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const exists = await client.fetch(
        `*[_type == 'user' && email == $email][0]`,
        {
            email: req.body.email,
        }
    );
    if (exists) {
        if (!exists.password) {
            return res.status(400).json({
                status: "error",
                message: "Please Sign In using the below providers",
            });
        }
        const existsPassword = CryptoJS.AES.decrypt(
            exists.password,
            process.env.CRYPTO_SECRET
        ).toString(CryptoJS.enc.Utf8);
        if (password != existsPassword) {
            return res
                .status(400)
                .json({ status: "error", message: "password is incorrect" });
        }
        const accessToken = jwt.sign(
            { id: exists._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );
        return res.status(200).json({
            status: "success",
            data: exists,
            cookie: accessToken,
        });
    } else {
        return res.status(404).json({
            message: "user with this email does not exist",
        });
    }
}
