"use client";

import { Button } from "@/components/ui/button";

export default function TermsAndConditions() {
  return (
    <>
    <div className="  bg-gray-800">
      <Button className="ml-20 mt-4" onClick={() => window.history.back()}>Go Back</Button>
    </div>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">Terms and Conditions</h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Effective Date: 18/10/2024
          </p>
        </section>

        <section className="w-full max-w-3xl text-left space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing and using Mystery Feedback, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you are prohibited from using the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">2. Changes to Terms</h2>
            <p className="mt-2">
              We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the platform after any changes signifies your acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
            <p className="mt-2">
              Users agree to use Mystery Feedback in a lawful and respectful manner. You are responsible for any content you submit and ensuring that your feedback is honest, non-offensive, and does not violate any applicable laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">4. Limitation of Liability</h2>
            <p className="mt-2">
              Mystery Feedback and its creators are not liable for any indirect, incidental, or consequential damages arising from your use of the platform, including but not limited to any data loss, unauthorized access, or disruptions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">5. Termination</h2>
            <p className="mt-2">
              We reserve the right to terminate or suspend access to the platform at our sole discretion, without notice or liability, for any reason, including violations of these Terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">6. Contact Information</h2>
            <p className="mt-2">
              If you have any questions about these Terms and Conditions, please contact us at [insert contact information].
            </p>
          </div>
        </section>
      </main>

     
    </>
  );
}
