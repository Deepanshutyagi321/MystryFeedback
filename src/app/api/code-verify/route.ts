import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/user";

export async function POST(request: Request) {
    dbConnect();

    try {
        const { username, code } = await request.json();

        const user = await UserModel.findOne({ username });

        if (!user) {
            return Response.json({
                success: false,
                message: "user not found"
            }, { status: 500 })
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();
            return Response.json({
                success: true,
                message: "Account verified successfully "
            }, { status: 200 })
        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "Verification code is expired, please signup again to get a new code"
            }, { status: 400 })
        } else {
            return Response.json({
                success: false,
                message: "Verification code is inCorrect"
            }, { status: 400 })
        }
    } catch (error) {
        console.error("Error verifying code", error);
        return Response.json({
            success: false,
            message: "Error verifying code"
        }, { status: 400 })
    }
}