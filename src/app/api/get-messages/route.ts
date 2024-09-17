import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/user";
import dbConnect from "@/lib/dbconnect";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET() {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User
    // console.log(user)

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        }, { status: 401 })
    }
    const userId = new mongoose.Types.ObjectId(user._id);
    // console.log(user)
    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: "$message" },
            { $sort: { "message.createdAt": -1 } },
            { $group: { _id: "$_id", message: { $push: "$message" } } }
        ])
       
        if (!user || user.length === 0) {
            return Response.json({
                success: false,
                message: "user not found"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            messages: user[0].message
        }, { status: 200 })
    } catch (error) {
        console.log("Error is getting messages", error);
        return Response.json({
            success: false,
            message: "Error is getting messages"
        }, { status: 500 })
    }
}