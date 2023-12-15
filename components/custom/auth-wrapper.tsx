"use client";

import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export const AuthWrapper = () => {
  const session = useSession();

  useEffect(() => {
    if (session?.data) {
      const { user } = session.data;
      fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          name: user?.name,
          email: user?.email,
        }),
      });
    }
  }, [session]);

  return (
    <>
      {session?.data ? (
        <span onClick={() => signOut({ callbackUrl: "/" })}> Sign out </span>
      ) : (
        <span onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}>
          {" "}
          Sign in with Spotify{" "}
        </span>
      )}
    </>
  );
};
