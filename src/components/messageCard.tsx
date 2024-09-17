"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
  import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import axios from "axios"
import { Message } from "@/models/user"
import { useToast } from "@/hooks/use-toast"
import { apiResponse } from "@/types/apiResponse"
import dayjs from 'dayjs'
type MessageCardProps = {
  message: Message,
  onMessageDelete: (messageId: string) => void
}

export default function MessageCard({message , onMessageDelete}: MessageCardProps) {
        const {toast} = useToast()
    const handelDeleteConformation = async() => {
        const response = await axios.delete<apiResponse>(`/api/delete-message/${message._id}`)
        // console.log(response)
        toast({
            title: response.data.message,
            description: "message deleted successfully",
            variant: "destructive",
        })
        onMessageDelete(message._id as string);
    }
    return (
      <Card className="card-bordered">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{message.content}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handelDeleteConformation}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
      
    )    
}