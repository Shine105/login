import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mt-50 flex flex-col justify-center items-center ">
        <h1 className="text-3xl mb-4">Welcome to Home</h1>
        <Link className={buttonVariants()} href='/admin'>
          Open My Admin
        </Link>
      </div>
    </div>
  );
}





