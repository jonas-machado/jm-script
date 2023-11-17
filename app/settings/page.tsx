//import io from "socket.io-client";
import { getOlt } from "@/lib/actions/getOlt";
import ConfigForm from "@/components/form/ConfigForm";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import MotionComponent from "@/lib/motionComponent";
import Settings from "@/components/settings/Settings";

export default async function ConfigPage() {
  const currentUser = await getCurrentUser();
  const { olt } = await getOlt();
  return (
    <MotionComponent>
      <Settings />
    </MotionComponent>
  );
}
