import PrimaryButton from "../common/PrimaryButton";
import SeconderyButton from "../common/SeconderyButton";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between border h-14 md:px-20 px-2 items-center">
        <div className="text-4xl font-semibold">_zapier</div>
        <div className="flex items-center md:gap-5 gap-3">
          <SeconderyButton href="/login">Log in</SeconderyButton>
          <PrimaryButton href="/signup">Sign up</PrimaryButton>
        </div>
      </div>
    </header>
  );
}
