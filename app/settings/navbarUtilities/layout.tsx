import Navbar from "@/components/navbar/Navbar";
//import getCurrentUser from "@/actions/getCurrentUser";
import PageWrapper from "@/lib/framerMotion/pageWrapper";
import NextTopLoader from "nextjs-toploader";
import { getNeutralNetwork } from "@/lib/actions/getNeutralNetwork";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";
import { getFirmware } from "@/lib/actions/getFirmware";
import MotionPage from "@/lib/framerMotion/motionPage";
import Image from "next/image";
import Nav from "@/components/navLink/Nav";
import { useRef } from "react";
import Sidebar from "@/components/settings/Sidebar";
import Users from "@/components/settings/user/Users";
import getUsers from "@/lib/actions/getUsers";
import NavbarUtilities from "@/components/settings/navbarUtilities/NavbarUtilities";
import MotionPath from "@/lib/framerMotion/motionPath";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const neutralNetwork = await getNeutralNetwork();
  const firmware = await getFirmware();
  const users = await getUsers();

  return (
    <PageWrapper classname="w-full">
      <NavbarUtilities />
      {children}
    </PageWrapper>
  );
}
