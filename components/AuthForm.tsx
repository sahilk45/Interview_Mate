"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import {toast} from "sonner"
import FormFeild from "@/components/FormFeild"
import { useRouter } from "next/navigation"


const authFormSchema = (type: FormType)=>{
    return z.object({
        name : type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password : z.string().min(3),
    })
}

const AuthForm = ({type}:{type: FormType}) => {
    const router = useRouter()
    const formSchema = authFormSchema(type)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            password: "",
            email: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        try{
            if(type === "sign-up"){
                toast.success("Account created successfully! Please sign in.")
                router.push('/sign-in')
            }
            else{
                // Simulate a sign-in action
                toast.success("Signed in successfully!")
                router.push('/')
            }
        } catch(error){
            console.log(error)
            toast.error(`There was an error: ${error}`)
        }
    }

    const isSignin = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">InterviewMate</h2>
                </div>
                <h3>Practice job interviews with AI</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-6 form">
                        {!isSignin && (<FormFeild 
                        control= {form.control}
                        name="name"
                        label="Name"
                        placeholder="Your Name" />
                        )}
                        <FormFeild 
                        control= {form.control}
                        name="email"
                        label="Email"
                        placeholder="Your email address"
                        type="email" />
                        <FormFeild 
                        control= {form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password" />
                        <Button className="btn" type="submit">{isSignin ? 'Sign in' : 'Create an account'}</Button>
                    </form>
                </Form>
                <p className="text-center ">
                    {isSignin ? "Don't have an account?" : "Already have an account?"}
                    <Link href={!isSignin ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">{!isSignin ? "Sign in" : "Sign up"}</Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm
