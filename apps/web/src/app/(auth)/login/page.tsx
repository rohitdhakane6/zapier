"use client";
import axios from "axios";
import Input from "@components/common/Input";
import SquareButton from "@components/common/SquareButton";
import PrimaryButton from "@components/common/PrimaryButton";
import { useState } from "react";
import { API_URL } from "@config/appConfig";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setValidationErrors({}); // Reset validation errors

    try {
      const res = await axios.post(`${API_URL}/user/signin`, {
        email,
        password,
      });

      localStorage.setItem("authToken", res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.data?.status === "error" && err.response?.data?.message === "Validation failed") {
        // Handle validation errors
        const errors = err.response?.data?.errors || [];
        const errorMap: { [key: string]: string } = {};
        errors.forEach((error: { path: string[]; message: string }) => {
          if (error.path.length > 0) {
            errorMap[error.path[0]] = error.message;
          }
        });
        setValidationErrors(errorMap);
      } else {
        // Handle other errors
        const errorMessage = err.response?.data?.message || "An unexpected error occurred. Please try again.";
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-1 2xl:mx-96 py-10 flex flex-col md:flex-row gap-4 px-1 md:px-5 lg:px-20 justify-center items-center">
      {/* Content for Desktop */}
      <div className="hidden md:flex flex-col h-full justify-center flex-1">
        <h1 className="font-extrabold text-3xl text-gray-600">
          Automate across your teams
        </h1>
        <h2 className="mt-4 text-lg">
          Zapier Enterprise empowers everyone in your business to securely
          automate their work in minutes, not months—no coding required.
        </h2>
        <div className="mt-4">
          <SquareButton
            variant="big"
            className="bg-night text-almostWhite w-64"
          >
            Explore Zapier Enterprise
          </SquareButton>
        </div>
      </div>
      {/* Content for Mobile and other Devices */}
      <div className="flex-1 w-full">
        <h3 className="text-xl font-semibold my-4 text-center">
          Log in to your account
        </h3>
        <div className="md:border md:p-8 hover:border-gray-400 rounded-md flex flex-col gap-3">
          <SquareButton
            variant="big"
            className="bg-[#4285F4] text-almostWhite w-full"
          >
            Continue with Google
          </SquareButton>
          <SquareButton
            variant="big"
            className="bg-blue-900 text-almostWhite w-full"
          >
            Continue with Facebook
          </SquareButton>
          <SquareButton
            variant="big"
            className="bg-black text-almostWhite w-full"
          >
            Continue with Microsoft
          </SquareButton>
          <SquareButton
            variant="big"
            className="bg-white text-blue-700 w-full border-blue-700"
          >
            Continue with SSO
          </SquareButton>
          <div className="flex items-center justify-center mt-4">OR</div>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="Email"
            label="Email"
            required
            error={validationErrors.email} // Display validation error if any
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Password"
            label="Password"
            required
            error={validationErrors.password} // Display validation error if any
          />

          {error && <div className="text-red-500">{error}</div>}

          <div className="flex justify-center items-center flex-col gap-2">
            <PrimaryButton
              disabled={loading || password.length === 0 || email.length === 0}
              onClick={handleLogin}
              className={`${
                password.length === 0 || email.length === 0
                  ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                  : "bg-zapierOrange text-almostWhite border-none"
              } 
                w-full font-bold`}
              variant="big"
            >
              {loading ? "Logging in..." : "Continue"}
            </PrimaryButton>

            <h2 className="text-sm">
              Don't have a Zapier account yet?
              <a className="text-blue-800 underline" href="/signup">
                Sign Up
              </a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
