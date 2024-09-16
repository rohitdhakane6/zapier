import React from "react";
import Input from "../../../components/common/Input"
import SquareButton from "../../../components/common/SquareButton";

export default function Page() {
  return (
    <div className="mx-4 2xl:mx-96 my-10 flex flex-col md:flex-row gap-8 px-4 md:px-14">
      {/* Content for Desktop */}
      <div className="hidden md:flex flex-col h-full justify-center flex-1">
        <h1 className="font-semibold text-2xl">
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
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Log in to your account
        </h3>
        <div className="md:border p-4 hover:border-gray-400 rounded-md flex flex-col gap-3">
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
            id="email"
            type="email"
            placeholder="Email"
            label="Email"
            required
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            label="Password"
            required
          />
        </div>
      </div>
    </div>
  );
}
