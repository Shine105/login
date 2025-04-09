import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl">Welcome to My App</h1>
      <div className="mt-4 flex flex-col justify-center items-center ">
        <Link href="/sign-in" className="flex gap-60 text-blue-500 hover:underline">Sign In</Link>
        <Link className="text-blue-500 hover:underline" href="/sign-up">Sign Up</Link>
      </div>
    </div>

  );
}
