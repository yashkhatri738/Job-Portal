"use client"

import Image from "next/image"
import { LogoutAction } from "@/lib/actions/auth.action"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

type NavbarProps = {
  companyLogo?: string
  userAvatar?: string
  userName?: string
}

const Navbar = ({
  companyLogo,
  userAvatar,
  userName = "User",
}: NavbarProps) => {
  const router = useRouter()

  return (
    <nav className="flex items-center justify-between px-6 py-6 border-b bg-white">
      {/* Left Side - Logo */}
      <div className="flex items-center gap-2 ">
        <Image
          src={companyLogo || "/career-grow-logo.png"}
          alt="Company Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-lg font-semibold text-gray-800">
          Career Grow
        </span>
      </div>

      {/* Right Side - Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => router.push("/employer/dashboard")}>
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/profile")}>
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600"
            onClick={LogoutAction}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

export default Navbar
