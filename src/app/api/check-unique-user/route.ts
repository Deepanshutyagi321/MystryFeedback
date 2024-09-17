import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get("username")
        }

        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParams);

        if (!result.success) {

            const usernameError = result.error.format().username?._errors || [];

            return Response.json({
                success: false,
                message: usernameError?.length > 0 ? usernameError.join(",") :
                    "Invelid query Parameter"
            }, { status: 400 })

        }
        const { username } = result.data

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true });

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username already taken"
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: "Username unique"
        }, { status: 200 })

    } catch (error) {
        console.error("Error checking username", error);
        return Response.json({
            success: false,
            message: "Error checking username"
        }, { status: 400 })
    }
}