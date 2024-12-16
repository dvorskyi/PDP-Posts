"use client";

import React from "react";
import { Header, StyledLink } from "@/app/ui/styled-components";
import SignInButton from "./SignInButton";



const NavBar = () => {
    return (
        <Header>
            <StyledLink href="/posts">Posts Page</StyledLink>
            <SignInButton />
        </Header>
    );
};

export default NavBar;
