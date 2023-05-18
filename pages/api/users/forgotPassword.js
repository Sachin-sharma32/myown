import { client } from "../../../sanity";
import sendEmail from "../../../utils/email";

export default async function forgotPassword(req, res) {
    const existUser = await client.fetch(
        `*[_type == "user" && email == $email][0]`,
        {
            email: req.body.email,
        }
    );
    if (existUser) {
        existUser;
        await sendEmail({
            email: req.body.email,
            name: req.body.email,
            subject: "Password reset link",
            url: `${process.env.SITE_URL}/resetPassword?email=${req.body.email}`,
            message: `${process.env.SITE_URL}/resetPassword?email=${req.body.email}`,
            button: "RESET PASSWORD",
        });
        res.status(200).json({ status: "success" });
    } else {
        return res
            .status(400)
            .json({ message: "No user found with this email" });
    }
}
