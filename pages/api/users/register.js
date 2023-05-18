import { client } from "../../../sanity";
import sendEmail from "../../../utils/email";

export default async function register(req, res) {
    req.body;
    const existUser = await client.fetch(
        `*[_type == "user" && email == $email][0]`,
        {
            email: req.body.email,
        }
    );
    if (existUser) {
        return res
            .status(400)
            .json({ message: "user with this email already exist" });
    } else {
        const queryName = req.body.name.replace(" ", "-");
        const queryPassword = req.body.password.replace(" ", "-");
        await sendEmail({
            email: req.body.email,
            name: req.body.name,
            subject: "User verification link",
            url: `${process.env.SITE_URL}/api/users/verifyUser?name=${queryName}&email=${req.body.email}&password=${queryPassword}`,
            message: `${process.env.SITE_URL}/api/users/verifyUser?name=${queryName}&email=${req.body.email}&password=${queryPassword}`,
            button: "REGISTER",
        });
        //     .then((data) => {
        //     })
        //     .catch((error) => {
        //         res.status(400).json({ data: error });
        //     });
        res.status(200).json({ status: "success" });
    }
}
