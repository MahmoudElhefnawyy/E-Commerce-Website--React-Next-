import { SignUp as ClerkSignUp } from "@clerk/clerk-react";

export default function SignUp() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Create an Account</h1>
        <div className="border rounded-lg p-4 bg-card">
          <ClerkSignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            redirectUrl="/"
          />
        </div>
      </div>
    </div>
  );
}
