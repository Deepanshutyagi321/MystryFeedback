import { resend } from "@/app/lib/resend"
import VerificationEmail from "../../email/VerificationEmail"
import { apiResponse } from "@/types/apiResponse"
import { verify } from "crypto";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
):Promise<apiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystryfeedback | Verication code',
            react: VerificationEmail({username , otp: verifyCode}),
        })
        return {success: true, message:" verification email successfully send"}
    } catch (emailerror) {
        console.error("Error sending verification email",emailerror);
        return {success: false, message:"failed to send verification email"}
    }
}
