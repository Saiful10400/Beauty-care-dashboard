"use client";

import { useState } from "react";
import { useLoginHandleMutation } from "../redux/api";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [login] = useLoginHandleMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await login({ email, password })
        if (response?.data?.statusCode === 200) {
            if (response?.data?.data?.authorized) {
                localStorage.setItem("token", import.meta.env.VITE_Token)
                window.location.reload();
            } else {
                alert("Wrong email or password!")
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-900 to-black px-4 py-8">
            <div className="w-full max-w-md bg-zinc-900/90 backdrop-blur p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white text-center mb-4">
                    Log In
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-zinc-300 text-sm mb-1 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="text-zinc-300 text-sm mb-1 block">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 top-6 cursor-pointer px-3 flex items-center text-zinc-400 hover:text-zinc-200 focus:outline-none"
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M10 3c-4 0-7.464 2.925-9 7 1.536 4.075 5 7 9 7s7.464-2.925 9-7c-1.536-4.075-5-7-9-7zM10 15c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" />
                                    <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M4.293 4.293a1 1 0 011.414 0L15.707 14.293a1 1 0 01-1.414 1.414L13.021 14.436A7.975 7.975 0 0110 15c-4 0-7.464-2.925-9-7a8.038 8.038 0 012.707-3.293L4.293 4.293zM10 5c2.761 0 5 2.239 5 5 0 .741-.162 1.445-.455 2.076l-1.519-1.519A3 3 0 0010 7c-.741 0-1.445.162-2.076.455L6.405 6.936C7.257 6.358 8.284 6 9.5 6c.172 0 .343.01.512.03L10 5z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-zinc-700 cursor-pointer hover:bg-zinc-600 text-white font-medium py-2 rounded transition"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}
