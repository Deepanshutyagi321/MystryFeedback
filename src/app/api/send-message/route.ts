import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/user";
import { Message } from "@/models/user";

export async function POST(req: Request) {
    await dbConnect();
    const { username, content } = await req.json();
    

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return Response.json({
                success: false,
                message: "user not found"
            }, { status: 404 })
        }

        //check if user is accepting messages
        if (!user?.isAcceptingMessage) {
            return Response.json({
                success: false,
                message: "user is not accepting messages"
            }, { status: 404 })
        }

        const newMessage = { content, createdAt: new Date() };
        user.message.push(newMessage as Message);
        await user.save();

        return Response.json({
            success: true,
            message: "message sent successfully"
        }, { status: 200 })

    } catch (error) {
        console.log("Error sending message", error);
        return Response.json({
            success: false,
            message: "failed to send message"
        }, { status: 500 })
    }
}