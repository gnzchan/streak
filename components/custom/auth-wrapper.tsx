"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export const AuthWrapper = () => {
  const session = useSession();

  console.log(session?.data);

  return (
    <>
      {session?.data ? (
        <span onClick={() => signOut()}> Sign out </span>
      ) : (
        <span onClick={() => signIn("spotify")}> Sign in with Spotify </span>
      )}
    </>
  );
};
