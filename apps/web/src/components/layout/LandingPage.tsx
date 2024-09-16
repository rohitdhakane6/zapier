import PrimaryButton from "../common/PrimaryButton";
import Feature from "../common/featurs";
export default function LandingPage() {
  return (
    <div className="md:px-5 md:py-24 px-3 py-8">
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="md:font-bold font-medium md:text-6xl text-4xl text-center md:px-10 px-1 pb-4">
            Automate as fast as you can type
          </h1>
          <h2 className="md:font-medium md:text-2xl text-lg text-center px-1 md:px-10">
            AI gives you automation superpowers, and Zapier puts them to work.
            Pairing AI and Zapier helps you turn ideas into workflows and bots
            that work for you.
          </h2>
        </div>
        <div className="flex gap-3 justify-center items-center pt-5 flex-wrap">
          <Feature title="Free forever" subTitle="for core features" />
          <Feature title="More apps" subTitle=" than any other platform" />
          <Feature title="Cutting-edge" subTitle="AI features" />
        </div>
        <div className="py-10 justify-center md:gap-5 gap-2 items-center flex flex-col md:flex-row px-6 md:px-20">
          <PrimaryButton variant="big" href="/signup">
            Start free with email
          </PrimaryButton>
          <PrimaryButton
            variant="big"
            icon="https://www.vectorlogo.zone/logos/google/google-icon.svg"
          >
            Start free with Google
          </PrimaryButton>
        </div>
        <div>
          <VideoPlayer />
        </div>
      </div>
    </div>
  );
}

function VideoPlayer() {
  return (
    <video
      autoPlay
      loop
      muted
      preload="metadata"
      className="w-full h-auto"
      src="https://res.cloudinary.com/zapier-media/video/upload/f_auto,q_auto/v1706042175/Homepage%20ZAP%20Jan%2024/012324_Homepage_Hero1_1920x1080_pwkvu4.mp4"
    />
  );
}
