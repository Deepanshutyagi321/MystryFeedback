"use client"
import { useToast } from "@/hooks/use-toast";
import { apiResponse } from "@/types/apiResponse";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { messageSchemaValidation } from "@/schemas/messageSchema";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
export default function Page({ params }: { params: { slug: string } }) {
  const [isAccept, setIsAccept] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const username = params.slug;
  const { toast } = useToast()
  const router = useRouter();


  


  const onSubmit = async (data: z.infer<typeof messageSchemaValidation>) => {
      setisLoading(true);
      try {
        const response = await axios.post<apiResponse>('/api/send-message', { username, content: data.content });
        console.log(response)
        if (!response.data.success) {
          toast({
            title: 'Error',
            description: response.data.message ?? 'Something went wrong',
            variant: 'destructive',
          })
        }

        toast({
          title: 'Success',
          description: "Message sent successfully",
        })
        form.reset({ ...form.getValues(), content: '' });
      } catch (error) {
        const axiosError = error as AxiosError<apiResponse>;
        toast({
          title: 'Error',
          description: axiosError.response?.data.message ?? 'Something went wrong',
          variant: 'destructive',
        })
      } finally {
        setisLoading(false);
      }
   

  }


  const form = useForm({
    resolver: zodResolver(messageSchemaValidation),
    defaultValues: {
      content: '',
    }
  })
  const redirectTosignUp = ()=>{
    router.replace("/sign-up")
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">

      <h4 className=" flex justify-center items-center text-4xl font-bold mb-4 my-4 ">Public Profile Link</h4>

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to ,{params.slug}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                Send It
              </Button>
            )}
          </div>      </form>
      </Form>
      <div className="flex justify-center mt-20">
        <p>Get Your Message Board</p>
        
      </div>
      <div className="flex justify-center mt-4">
      <Button onClick={redirectTosignUp}>Create Your Account</Button>
      </div>

    </div>
  )
}