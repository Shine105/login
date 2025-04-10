"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import GoogleSignInButton from "../GoogleSignInButton"
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
import { toast } from "sonner"


const formSchema = z.object({
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
})

const SignInForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => 
    {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        });
        
        if(signInData?.error) {
            toast("ERROR", 
            {
                description: "Oops! Something went wrong!",
                // action: {
                //   label: "Undo",
                //   onClick: () => console.log("Undo"),
                // },
            })
        } else {
            console.log("Login successful (client-side), redirecting to /admin");
            router.refresh();
            router.push('/admin');
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
                <h2 className="text-2xl font-semibold mb-8 text-center">Login</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example123" {...field} />
                                    </FormControl>
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
                                        <Input type="password" placeholder="••••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="accent-[#6C4EFF]" />
                                <span>Remember Me</span>
                            </label>
                            <Link href="#" className="text-[#6C4EFF] hover:underline">Forgot Password?</Link>
                        </div>
                        <Button type="submit" className="w-full bg-[#6C4EFF] hover:bg-[#5a3ee7]">Login</Button>
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

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don’t have account? <Link href="/sign-up" className="text-[#6C4EFF] hover:underline">Create Account</Link>
                </p>

                <footer className="mt-10 text-xs text-center text-gray-400">
                    Terms & Condition • Privacy Policy
                </footer>
            </div>
        </div>
    )
}

export default SignInForm
