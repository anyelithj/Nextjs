"use client";
import * as React from "react";
import { ThemeProvider } from "./theme-provider";
// import ToasterProvider from "./toast-provider";
// import dynamic from "next/dynamic";
import { ClerkProvider } from "@clerk/nextjs";

// const Clerk = dynamic(() => import("./clerk-provider"), { ssr: false });

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    // <Clerk>
     <ClerkProvider
      signInUrl={`${ process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`}
      signUpUrl={`${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}`}
      afterSignOutUrl="/"
      signInFallbackRedirectUrl="/stores"
      signUpFallbackRedirectUrl="/stores"
      appearance={{
        layout: {
          logoImageUrl:"/assets/images/bolcom.svg",
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton"
        }
      }}
     >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {/* <ToasterProvider /> */}
            {children}
        {/* </ThemeProvider> */}
      </ClerkProvider>
    // </Clerk>
  );
}