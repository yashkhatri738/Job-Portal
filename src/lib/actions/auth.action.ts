"use server";

import { cookies } from "next/headers";
import crypto from "crypto";
import { invalidSession } from "../user-cases/sessions";
import { redirect } from "next/navigation";

export const LogoutAction = async () => {
    const cookie = await cookies();
    const session = cookie.get("session")?.value;
    
    if (!session) return null;
    
    const hasToken = crypto.createHash("sha256").update(session).digest("hex");
    
    await invalidSession(hasToken);

    return redirect("/login");
}