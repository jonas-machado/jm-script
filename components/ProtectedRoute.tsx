"use client";

import { SocketContext } from "@/lib/socket";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: LayoutProps) {
  const socket = useContext(SocketContext);
  const session = useSession();
  const router = useRouter();
  console.log(session.data);

  useEffect(() => {
    // Handle connection event

    // Handle disconnection event

    function onSignOutAll() {
      signOut({
        callbackUrl: "/",
      });
    }

    function onSignOutUser({ email }: any) {
      console.log("working");

      if (email == session.data?.user.email) {
        signOut({
          callbackUrl: "/",
        });
      }
      console.log(session.data?.user.email);
      console.log(email);
    }

    socket.on("signOutAll", onSignOutAll);
    socket.on("signOutUser", onSignOutUser);

    return () => {
      socket.off("signOutAll", onSignOutAll);
      socket.off("signOutUser", onSignOutUser);
    };
  }, [session]);

  useEffect(() => {
    if (session?.status == "unauthenticated") {
      signOut({
        callbackUrl: "/",
      });
    }
  }, [session]);

  return <>{session?.status == "authenticated" && children}</>;
}
