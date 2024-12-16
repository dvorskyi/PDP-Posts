"use client";

import {SessionProvider as NextAuthSessionProvider} from "next-auth/react";
import NavBar from "../NavBar";
import { ModalProvider } from "@/contexts/modal.context";

interface Props {
    children: React.ReactNode;
}

const Providers = ({children}: Props) => {

    return (
        <NextAuthSessionProvider>
            <ModalProvider>
                <NavBar />
                {children}
            </ModalProvider>
        </NextAuthSessionProvider>
    );
}

export default Providers;
