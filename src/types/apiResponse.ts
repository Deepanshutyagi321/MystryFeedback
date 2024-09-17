import { Message } from "@/models/user";

export interface apiResponse{
    success: boolean,
    message: string,
    isAcceptingMessage?: boolean,
    messages?:Array<Message>
}