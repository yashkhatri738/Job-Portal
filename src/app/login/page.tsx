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
  User,
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { loginAction } from "@/lib/actions/login.action";
import { toast } from "@/components/ui/sonner";
import { LoginUserData, loginUserSchema} from "@/lib/schemaValidation/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const {
      register,
      handleSubmit,
      watch,
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
        if(role === "applicant"){
          router.push("/dashboard");
        } else {
          router.push("/employer/dashboard");
        }
      }
      if(result.status === "SUCCESS") toast.success(result.message);
      else toast.error(result.message);
    } catch (err) {
      toast.error("Login failed: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader>
          <div className="flex justify-center items-center gap-2">
            <UserPlus className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-semibold">
              Login Your Account
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            {/* Submit Button */}
            <CardFooter className="flex flex-col items-center gap-3 px-0">
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>

              {/* 👇 Add this line below */}
              <p className="text-sm text-gray-600">
                If you have not an account?
                <Link
                  href="/register"
                  className="text-primary font-medium hover:underline"
                >
                  Register here
                </Link>
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
