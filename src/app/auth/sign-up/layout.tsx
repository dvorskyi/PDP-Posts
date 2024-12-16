"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    if (session) {
        return redirect("/posts");
    }

    return <div>{children}</div>;
}

