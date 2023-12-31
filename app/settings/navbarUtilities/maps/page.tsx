import { getNeutralNetwork } from "@/lib/actions/getNeutralNetwork";
import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";
import { getFirmware } from "@/lib/actions/getFirmware";

import getUsers from "@/lib/actions/getUsers";
import Maps from "@/components/settings/navbarUtilities/mapas";
import { getMaps } from "@/lib/actions/getMaps";

export default async function MapsPage() {
  const maps = await getMaps();

  return (
    <>
      <Maps maps={maps} />
    </>
  );
}
