"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import messages from "@/messages.json"
import Autoplay from 'embla-carousel-autoplay'



export default function Home() {
  return (
    <>  
   <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
   <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>
    <Carousel 
    plugins={[Autoplay({delay: 3000})]}
    className="w-full max-w-lg md:max-w-xl">
      <CarouselContent>
        {
          messages.map((message, index) => (
            <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader>
                  <CardTitle>{message.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                  <span className="text-4xl font-semibold">{message.content}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          ))
        }
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
   
   </main>
   <footer className="bg-gray-900 text-white p-4 md:p-6">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
    <div className="text-center md:text-left mb-4 md:mb-0">
      <p>© 2023 True MysteryFeedback. All rights reserved.</p>
      <p>Made by Deepanshu Tyagi</p>
    </div>

    <div className="text-center space-x-4">
      <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
        <li>
          <a 
            href="/privacy-policy" 
           
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a 
            href="/terms-&-conditons" 
            
          >
            Terms and Conditions
          </a>
        </li>
      </ul>
    </div>
  </div>
</footer>


   </>

  )
}