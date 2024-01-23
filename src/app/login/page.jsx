
"use client"
import {useEffect, useState} from "react";
import { registerHandler } from "@/lib/AuthFunctions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {signIn, useSession} from "next-auth/react";

export default function Login() {

    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    const [userForm, setUserForm] = useState({
        email: "",
        password: ""
    });
    const [status, setStatus] = useState({
        loading: false,
        error: ""
    });

    const isValidSubmit = !userForm.email || !userForm.password || status.loading;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prevUserForm) => ({
            ...prevUserForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus({ loading: true, error: "" });
        const {email, password} = userForm;

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        }).then((res) => {

            if (res?.error) {
                setStatus({ loading: false, error: "Invalid email or password" });
            } else {
                setStatus({ loading: false, error: "" });
                router.push("/dashboard")
            }

        })
    };

    return (
        <div className="mt-10">
            <MaxWidthWrapper>
                <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userForm.email}
                            onChange={handleChange}
                            className="text-black w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userForm.password}
                            onChange={handleChange}
                            className="text-black w-full p-3 rounded-md border border-gray-300"
                            placeholder="Enter your password"
                        />
                    </div>

                    {status.error && <p className="text-red-500 text-center">{status.error}</p>}

                    <button
                        disabled={isValidSubmit}
                        type="submit"
                        className={`w-full text-white py-2 px-4 rounded-md ${isValidSubmit ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {status.loading ? "Signing in..." : "Login"}
                    </button>

                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link href={"/register"} className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
