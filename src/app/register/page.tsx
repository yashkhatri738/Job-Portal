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
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  UserPlus,
  Mail,
  Lock,
  Briefcase,
  Eye,
  EyeOff,
  Phone,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { registrationAction } from "@/lib/actions/register.action";
import { toast as sonnerToast } from "sonner";
import { RegisterUserWithConfirmData, registerUserWithConfirmSchema } from "@/lib/schemaValidation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserWithConfirmSchema),
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();


  const onSubmit = async (data: RegisterUserWithConfirmData) => {
    try {
      const result = await registrationAction(data);

      if(result.status === "SUCCESS") {
        sonnerToast.success(result.message);
        if(data.role === "employer") {
          router.push('/employer/dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        sonnerToast.error(result.message);
      }
    } catch (err) {
      sonnerToast.error("Registration failed: " + (err instanceof Error ? err.message : String(err)));
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 py-20 overflow-hidden bg-slate-50">
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

      <Card className="relative z-10 w-full max-w-2xl shadow-2xl border-white/50 bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="pt-12 pb-8 text-center px-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-3xl shadow-xl shadow-blue-200/50 transform -rotate-3">
               <UserPlus className="h-8 w-8 text-white rotate-3" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Join JobPortal
          </CardTitle>
          <p className="text-gray-500 mt-2 font-medium">Create your professional account today</p>
        </CardHeader>

        <CardContent className="px-10 pb-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Full Name */}
              <div className="space-y-2.5">
                <Label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-12 h-14 bg-white/50 border-gray-100 rounded-2xl focus:border-blue-400 focus:ring-blue-100 transition-all text-base font-medium placeholder:text-gray-400"
                    required {...register("name")}
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 font-bold ml-1">{errors.name.message as string}</p>}
              </div>

              {/* Username */}
              <div className="space-y-2.5">
                <Label htmlFor="userName" className="text-sm font-bold text-gray-700 ml-1">Username</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="userName"
                    type="text"
                    placeholder="johndoe123"
                    className="pl-12 h-14 bg-white/50 border-gray-100 rounded-2xl focus:border-blue-400 focus:ring-blue-100 transition-all text-base font-medium placeholder:text-gray-400"
                    required {...register("userName")}
                  />
                </div>
                {errors.userName && <p className="text-xs text-red-500 font-bold ml-1">{errors.userName.message as string}</p>}
              </div>

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
                {errors.email && <p className="text-xs text-red-500 font-bold ml-1">{errors.email.message as string}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-2.5">
                <Label htmlFor="phoneNumber" className="text-sm font-bold text-gray-700 ml-1">Phone Number</Label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="phoneNumber"
                    type="text"
                    placeholder="+1 (234) 567-890"
                    className="pl-12 h-14 bg-white/50 border-gray-100 rounded-2xl focus:border-blue-400 focus:ring-blue-100 transition-all text-base font-medium placeholder:text-gray-400"
                    required {...register("phoneNumber")}
                  />
                </div>
                {errors.phoneNumber && <p className="text-xs text-red-500 font-bold ml-1">{errors.phoneNumber.message as string}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2.5">
                <Label htmlFor="password" className="text-sm font-bold text-gray-700 ml-1">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-12 pr-12 h-14 bg-white/50 border-gray-100 rounded-2xl focus:border-blue-400 focus:ring-blue-100 transition-all text-base font-medium placeholder:text-gray-400"
                    required {...register("password")}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 p-1">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 font-bold ml-1">{errors.password.message as string}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2.5">
                <Label htmlFor="confirmPassword" className="text-sm font-bold text-gray-700 ml-1">Confirm Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-12 pr-12 h-14 bg-white/50 border-gray-100 rounded-2xl focus:border-blue-400 focus:ring-blue-100 transition-all text-base font-medium placeholder:text-gray-400"
                    required {...register("confirmPassword")}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 p-1">
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500 font-bold ml-1">{errors.confirmPassword.message as string}</p>}
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2.5">
              <Label htmlFor="role" className="text-sm font-bold text-gray-700 ml-1">Who are you?</Label>
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10" />
                <Controller name="role" control={control} render={({ field })=> (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="role" className="pl-12 h-14 bg-white/50 border-gray-100 rounded-2xl focus:border-blue-400 focus:ring-blue-100 transition-all text-base font-medium w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applicant">Job Applicant</SelectItem>
                      <SelectItem value="employer">Employer / Recruiter</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
              </div>
              {errors.role && <p className="text-xs text-red-500 font-bold ml-1">{errors.role.message as string}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98]">
                Create Account
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 font-medium">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 font-bold hover:underline underline-offset-4">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
