import Navbar from "@/components/navbar/Navbar";
//import getCurrentUser from "@/actions/getCurrentUser";
import PageWrapper from "@/lib/framerMotion/pageWrapper";
import NextTopLoader from "nextjs-toploader";
import { getNeutralNetwork } from "@/lib/actions/getNeutralNetwork";
import { getCurrentUser } from "../api/auth/[...nextauth]/route";
import { getFirmware } from "@/lib/actions/getFirmware";
import MotionPage from "@/lib/framerMotion/motionPage";
import Image from "next/image";
import Nav from "@/components/navLink/Nav";
import { getMaps } from "@/lib/actions/getMaps";
import { SocketProvider } from "@/lib/socket";
import ProtectedRoute from "@/components/ProtectedRoute";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const neutralNetwork = await getNeutralNetwork();
  const firmware = await getFirmware();
  const maps = await getMaps();
  return (
    <SocketProvider>
      <ProtectedRoute>
        <PageWrapper>
          <MotionPage className="">
            <div className=" absolute shadow-[inset_0_-20px_20px_0px] w-[110%] -left-6 h-screen -z-40 "></div>
            <Image
              src={
                currentUser?.user.backgroundImage
                  ? currentUser?.user.backgroundImage!
                  : `/images/backgroundConfig.gif`
              }
              alt="bg"
              fill
              className="-z-50 bg-no-repeat"
              blurDataURL={
                currentUser?.user.backgroundImage
                  ? currentUser?.user.backgroundImage!
                  : `/images/backgroundConfig.gif`
              }
            />
            <Navbar
              currentUser={currentUser}
              neutralNetwork={neutralNetwork}
              firmware={firmware}
              maps={maps}
            />
            <NextTopLoader
              color="#000000"
              shadow="0 40px 50px #ffffff,0 40px 50px #ffffff"
              showSpinner={false}
            />
            <div className="w-full">{children}</div>
            <Nav classname="" />
          </MotionPage>
        </PageWrapper>
      </ProtectedRoute>
    </SocketProvider>
  );
}
