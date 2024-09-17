"use client";
import Input from "@components/common/Input";
import SquareButton from "@components/common/SquareButton";
import PrimaryButton from "@components/common/PrimaryButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@config/appConfig";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setValidationErrors({}); // Reset validation errors

    try {
      const res = await axios.post(`${API_URL}/user/signup`, {
        email,
        password,
        name,
      });

      router.push("/login");
    } catch (err: any) {
      if (
        err.response?.data?.status === "error" &&
        err.response?.data?.message === "Validation failed"
      ) {
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
        const errorMessage =
          err.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-1 2xl:mx-96 py-10 flex flex-col md:flex-row gap-4 px-1 md:px-5 lg:px-20  justify-center items-center">
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
        <div className="md:border md:p-10 p-2 hover:border-gray-400 rounded-md flex flex-col gap-2 md:gap-3">
          <SquareButton
            variant="big"
            className="bg-[#4285F4] text-almostWhite w-full"
          >
            Sign up with Google{" "}
          </SquareButton>

          <div className="flex items-center justify-center">OR</div>
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
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Name"
            label="Name"
            required
            error={validationErrors.name} // Display validation error if any
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

          <div className="flex justify-center items-center flex-col gap-2 ">
            <PrimaryButton
              disabled={
                loading ||
                password.length === 0 ||
                email.length === 0 ||
                name.length === 0
              }
              onClick={handleRegister} // Use the handleRegister function
              className={`${
                password.length === 0 || email.length === 0 || name.length === 0
                  ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                  : "bg-zapierOrange text-almostWhite border-none"
              } 
                w-full font-bold`}
              variant="big"
            >
              Get started free{" "}
            </PrimaryButton>
            <h2 className="text-sm">
              By signing up, you agree to Zapier's
              <a className="text-blue-800 underline " href="/signup">
                terms of service
              </a>
              and
              <a className="text-blue-800 underline " href="/signup">
                privacy policy.{" "}
              </a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
