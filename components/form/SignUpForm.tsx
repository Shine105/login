"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(50),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format"), // Added email validation
    password: z.string().min(1, "Password is required").min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/sign-in");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Side Panel */}
      <div className="w-1/2 bg-[#EDE7FF] p-10 flex flex-col justify-between">
        <div className="text-4xl font-bold text-[#6C4EFF]">InWord</div>
        <div className="mt-40 px-10">
          <h2 className="text-2xl font-semibold">Welcome!</h2>
          <p className="text-xl font-bold mt-2">
            Build, Create, <span className="font-normal text-gray-400">and Innovate with Inword</span>
          </p>
        </div>
        <Link href="/" className="text-[#6C4EFF] mt-auto text-sm hover:underline">&lt; Back</Link>
      </div>

      {/* Right Side Panel */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">Register</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Victor Frankenstein" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="tester@example.com" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-Enter your password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full mt-3 bg-[#6C4EFF] hover:bg-[#5a3ee7]">Sign Up</Button>
          </form>
        </Form>
        <div className="my-4 flex items-center justify-center text-gray-500 text-sm">
          <div className="flex-grow border-t border-gray-300 mr-2" />
          Or
          <div className="flex-grow border-t border-gray-300 ml-2" />
        </div>
        <GoogleSignInButton className="bg-[#EDE7FF] text-black">
          <span className="flex items-center justify-center gap-2">
            <img src="/search.svg" alt="Google" className="w-5 h-5" />
            Login with Google
          </span>
        </GoogleSignInButton>
        <footer className="mt-10 text-xs text-center text-gray-400">
          Terms & Condition • Privacy Policy
        </footer>
      </div>
    </div>
  )
}

export default SignUpForm;