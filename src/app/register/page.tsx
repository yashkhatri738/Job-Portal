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
} from "lucide-react";
import Link from "next/link";
import { registrationAction } from "@/lib/actions/register.action";
import { toast } from "@/components/ui/sonner";
import { RegisterUserWithConfirmData, registerUserWithConfirmSchema } from "@/lib/schemaValidation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserWithConfirmSchema),
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();


  const onSubmit = async (data: RegisterUserWithConfirmData) => {
    const result = await registrationAction(data);

    if(result.status === "SUCCESS") {
      if(data.role === "employer") {
        router.push('/employer/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
    if(result.status === "SUCCESS") toast.success(result.message);
    else toast.error(result.message);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader>
          <div className="flex justify-center items-center gap-2">
            <UserPlus className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-semibold">
              Create Your Account
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-9"
                  required {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Username */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="userName">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="userName"
                  type="text"
                  placeholder="Enter username"
                  className="pl-9"
                  required {...register("userName")}
                />
              </div>
              {errors.userName && (
                <p className="text-sm text-red-600 mt-1">{errors.userName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-9"
                  required {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                  className="pl-9"
                  required {...register("phoneNumber")}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-red-600 mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="pl-9 pr-10"
                  required {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="pl-9 pr-10"
                  required {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Role */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="role">Select Role</Label>
              <div className="relative ">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-500 z-10" />
                <Controller name="role" control={control} render={({ field })=> (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="role" className="pl-9 w-full">
                      <SelectValue placeholder="Choose role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applicant">Job Applicant</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                )}>
                </Controller>
              </div>
              {errors.role && (
                <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <CardFooter className="flex flex-col items-center gap-3 px-0">
              <Button type="submit" className="w-full mt-2">
                Register
              </Button>

              {/* 👇 Add this line below */}
              <p className="text-sm text-gray-600">
                Already have an account?
                <Link
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
