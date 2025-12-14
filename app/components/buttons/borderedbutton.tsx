import Link from "next/link";

export default function BorderedButton({
  text,
  style,
  to,
}: {
  text: string;
  style?: string;
  to?: string;
}) {
  if (to) {
    return (
      <Link href={text.startsWith("Contact") ? "/contact" : to}>
        <button
          className={`w-fit min-w-44 h-12 border border-accent flex justify-center items-center rounded-lg text-xl text-accent font-bold ${style}`}
        >
          {text}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={`w-fit min-w-44 h-12 border border-accent flex justify-center items-center rounded-lg text-xl text-accent font-bold ${style}`}
    >
      {text}
    </button>
  );
}
