interface featuresProps {
  title: string;
  subTitle: string;
}
export default function Feature({
  title,
  subTitle,
}: featuresProps): JSX.Element {
  return (
    <div className="flex gap-2">
      <span className="">{Check}</span>
      <span className="font-bold">{title}</span>
      <span className="">{subTitle}</span>
    </div>
  );
}

const Check = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);
