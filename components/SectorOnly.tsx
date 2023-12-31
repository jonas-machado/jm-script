"use client";

import { useSession } from "next-auth/react";

interface Sector {
  sector: string;
  children: React.ReactNode;
}

export default function SectorOnly({ sector, children }: Sector) {
  const { data, status } = useSession();
  console.log(data?.user.sector);
  return <>{data?.user.sector === sector && children}</>;
}
