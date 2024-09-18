"use client";

import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <>  
     <div className="  bg-gray-800">
            <Button className="ml-20 mt-4" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
       
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Privacy Policy
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Effective Date: 18/10/2024
          </p>
        </section>

        <section className="w-full max-w-3xl text-left space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p className="mt-2">
              At Mystery Feedback, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
            <p className="mt-2">We collect the following information when you use our platform:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Feedback Data: The feedback provided via the platform, which remains anonymous unless otherwise stated by the user.</li>
              <li>User Information: Limited to necessary details such as email addresses (if shared voluntarily) for account setup, and tracking feedback responses.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
            <p className="mt-2">We use the collected information to:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Facilitate anonymous feedback sharing.</li>
              <li>Improve the platform's functionality and user experience.</li>
              <li>Ensure the privacy and security of the feedback process.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">4. Data Security</h2>
            <p className="mt-2">
              We use industry-standard security measures to protect the feedback and user data stored on our platform. While we strive to keep your data secure, no method of transmission over the Internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">5. Anonymous Feedback</h2>
            <p className="mt-2">
              All feedback submitted through the platform is anonymous by default. Users who submit feedback are not required to reveal their identity unless they choose to do so.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">6. Data Sharing</h2>
            <p className="mt-2">
              We do not share your personal data with third parties, except when required by law or in the event of a legal obligation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">7. Changes to this Privacy Policy</h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">8. Contact Us</h2>
            <p className="mt-2">
              If you have any questions or concerns about our privacy practices, please contact us at <br /> Email: deepanhshutyagi97208@gamil.com
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
