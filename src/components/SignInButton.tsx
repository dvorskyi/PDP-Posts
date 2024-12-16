"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: auto;
`;

const Username = styled.p`
  color: #0ea5e9;
`;

const Button = styled.button<{ withmarginleft?: boolean }>`
  color: #000;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: ${props => props.withmarginleft ? 'auto' : '0'};
`;

const SignInButton = () => {
    const { data: session } = useSession();
    const router = useRouter();

    if (session && session.user) {
        return (
            <Container>
                <Username>{session.user.name}</Username>
                <Button color="#dc2626" onClick={() => signOut()} aria-label="Sign Out">
                    Sign Out
                </Button>
            </Container>
        );
    }

    return (
        <Container>
            {!session?.user && <Button onClick={() => router.push("/auth/sign-up")} withmarginleft>Sign Up</Button>}
            <Button color="#16a34a" onClick={() => signIn()} withmarginleft aria-label="Sign In">
                Sign In
            </Button>
        </Container>

    );
};

export default SignInButton;
