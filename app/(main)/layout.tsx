import Navbar from "@/components/navbar/Navbar";
//import getCurrentUser from "@/actions/getCurrentUser";
import PageWrapper from "@/lib/pageWrapper";
import NextTopLoader from "nextjs-toploader";
import { getSchedule } from "@/lib/actions/getSchedule";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser } from "../api/auth/[...nextauth]/route";
import MotionPage from "@/lib/motionPage";
import Image from "next/image";
import Nav from "@/components/navLink/Nav";
import { useRef } from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const schedules = await getSchedule();

  return (
    <PageWrapper>
      <MotionPage>
        <Image
          src={
            currentUser?.user.backgroundImage
              ? currentUser?.user.backgroundImage!
              : `/images/backgroundConfig.gif`
          }
          alt="bg"
          fill
          className="relative shadow-black shadow-[inset_0_0px_10px_-3px] -z-50 bg-no-repeat bg-fit h-full"
          placeholder="blur"
          blurDataURL={
            currentUser?.user.backgroundImage
              ? currentUser?.user.backgroundImage!
              : `/images/backgroundConfig.gif`
          }
        />
        <div className="bg-black relative mt-[-200px] h-[200px] contents"></div>

        <Navbar currentUser={currentUser} schedules={schedules} />
        <NextTopLoader
          color="#000000"
          shadow="0 40px 50px #ffffff,0 40px 50px #ffffff"
          showSpinner={false}
        />
        {children}
        <div className="h-16">
          <Nav classname="" />
        </div>
      </MotionPage>
    </PageWrapper>
  );
}
