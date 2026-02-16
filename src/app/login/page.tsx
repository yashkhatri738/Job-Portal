"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { loginAction } from "@/lib/actions/login.action";
import { toast as sonnerToast } from "sonner";
import { LoginUserData, loginUserSchema} from "@/lib/schemaValidation/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(loginUserSchema),
    })

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginUserData & { role?: string }) => {
    try{
      const result = await loginAction(data);
      if(result.status === "SUCCESS") {
        const role = (result as any).role ?? data.role;
        sonnerToast.success(result.message);
        if(role === "applicant"){
          router.push("/dashboard");
        } else {
          router.push("/employer/dashboard");
        }
      } else {
        sonnerToast.error(result.message);
      }
    } catch (err) {
      sonnerToast.error("Login failed: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-slate-50">
      {/* Background with Professional Palette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Background"
          fill
          className="object-cover blur-[4px] opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 via-blue-50/50 to-white/80"></div>
        {/* Professional Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Back to Home link */}
      <Link href="/" className="absolute top-8 left-8 z-20 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold transition-colors group">
        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
          <ArrowLeft className="h-5 w-5" />
        </div>
        <span>Back to Home</span>
      </Link>

      <Card className="relative z-10 w-full max-w-md shadow-2xl border-white/50 bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="pt-12 pb-8 text-center px-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-3xl shadow-xl shadow-blue-200/50 transform rotate-3">
               <User className="h-8 w-8 text-white -rotate-3" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </CardTitle>
          <p className="text-gray-500 mt-2 font-medium">Log in to continue your career journey</p>
        </CardHeader>

        <CardContent className="px-10 pb-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-12 h-14 bg-white/50 border-gray-100 rounded-2xl focus:border-blue-400 focus:ring-blue-100 transition-all text-base font-medium placeholder:text-gray-400"
                  required {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-bold ml-1">{errors.email.message as string}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-sm font-bold text-gray-700">Password</Label>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-12 pr-12 h-14 bg-white/50 border-gray-100 rounded-2xl focus:border-blue-400 focus:ring-blue-100 transition-all text-base font-medium placeholder:text-gray-400"
                  required {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-bold ml-1">{errors.password.message as string}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98]">
                Sign In
              </Button>
            </div>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-500 font-medium">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 font-bold hover:underline underline-offset-4"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
