import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/user";
import { sendVerificationEmail } from "@/helper/sendVerficationEmail";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();

        const existingUserbyUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        if (existingUserbyUsername) {
            return Response.json({
                success: false,
                message: "Username already taken"
            }, { status: 400 })
        };

        const exitingUserByemail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();

        if (exitingUserByemail) {
            if (exitingUserByemail.isVerified) {
                return Response.json({
                    success: false,
                    message: "user already exist with this email"
                }, { status: 400 })
            } else {
                const hashPassword = await bcrypt.hash(password, 10);
                exitingUserByemail.password = hashPassword;
                exitingUserByemail.verifyCode = verifyCode;
                exitingUserByemail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await exitingUserByemail.save()
            }

        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                message: []
            });

            await newUser.save()
        }
        //send verification email
        const emailRespones = await sendVerificationEmail(email, username, verifyCode);

        if (!sendVerificationEmail) {
            return Response.json({
                success: false,
                message: emailRespones.message
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "User register successfully. Please verify your email"
        }, { status: 201 })
    } catch (error) {
        console.error("Error registring user", error);
        return Response.json({
            success: false,
            message: "Error in registring user"
        }, {
            status: 500
        })
    }
}