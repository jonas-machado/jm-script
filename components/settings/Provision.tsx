"use client";

import React, { useState, useEffect, useRef } from "react";
//import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "../inputs/search";
import Modal from "../modals/Modal";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
//Constants

import axios from "axios";
import MotionComponent from "@/lib/framerMotion/motionComponent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import Spinner from "../Spinner";
import useProvisionModal from "@/lib/zustand/useProvisionModal";
import MotionDelay from "@/lib/framerMotion/motionDelay";

export default function Provision({ provisioned }: any) {
  const session = useSession();
  const router = useRouter();
  const notify = (text: any) => {
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };
  const notifySuc = (text: string) => {
    toast.success(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      hideProgressBar: false,
    });
  };

  useEffect(() => {
    if (session?.status == "unauthenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const isOpen = useProvisionModal((state) => state.isOpen);
  const onOpen: () => void = useProvisionModal((state) => state.onOpen);
  const onClose: () => void = useProvisionModal((state) => state.onClose);

  const [query, setQuery] = useState("");
  const [script, setScript] = useState("");

  const filtered =
    query === ""
      ? provisioned
      : provisioned.filter(
          (item: any) =>
            item.cliente
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")) ||
            item.serial
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")) ||
            item.olt?.olt
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")) ||
            item.pon
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")) ||
            item.user?.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const fntest = async ({ pageParam }: any) => {
    return filtered.slice((pageParam - 1) * 6, pageParam * 6);
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["query", filtered],
    queryFn: fntest,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });

  const deleteUser = async (user: any, index: number) => {
    await axios
      .post("/api/user/delete", {
        email: user.email,
      })
      .then(async (res: any) => {
        if (res.data.error) {
        }
        router.refresh();
      });
  };

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);
  return (
    <>
      <MotionComponent id="users" className="w-full ">
        <div className="flex flex-col m-2 w-full pt-4 bg-black backdrop-blur-sm shadow-xl shadow-black rounded-md bg-opacity-80 overflow-y-scroll overflow-x-hidden">
          <div className="flex m-6 justify-between gap-2">
            <div>
              <button
                className="bg-gray-900 rounded-md p-2 text-gray-300 hover:bg-gray-800 transition"
                onClick={() => router.refresh()}
              >
                <ArrowPathIcon className="w-6 h-6" />
              </button>
            </div>
            <div className=" max-w-xs">
              <Search
                value={query}
                onChange={(e: any) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <ul role="list" className="flex flex-col px-6 gap-2">
            {data?.pages.map((group: any, i: number) => (
              <React.Fragment key={i}>
                {group.map((item: any, i: number) => (
                  <MotionDelay key={item} index={i}>
                    <li
                      key={i}
                      className="flex justify-between gap-x-6 p-5 bg-gray-900 bg-opacity-80 rounded-md hover:bg-gray-800 cursor-pointer"
                      onClick={() => {
                        onOpen();
                        setScript(item.script);
                      }}
                    >
                      <div className="flex min-w-0 gap-x-4 justify-between w-full flex-col sm:flex-row">
                        <div className="min-w-0">
                          <p className=" font-semibold truncate text-xs sm:text-sm leading-6 text-gray-300 whitespace-nowrap">
                            Serial: {item.serial}
                          </p>
                          <p className="mt-1 truncate text-gray-300 text-xs sm:text-sm">
                            OLT:{" "}
                            {item?.olt?.olt
                              ? item?.olt?.olt + " (" + item?.olt?.ip + ")"
                              : "Erro"}
                          </p>
                          <p className="truncate leading-6 text-gray-300 text-xs sm:text-sm">
                            PON: {item.pon}
                          </p>
                          <p className="truncate leading-6 text-gray-300 text-xs sm:text-sm">
                            ID: {item.idLivre}
                          </p>
                          <p className="truncate leading-6 text-gray-300 text-xs sm:text-sm">
                            Cliente: {item.cliente}
                          </p>
                        </div>
                        <div className="min-w-0 w-60">
                          <p className=" text-xs sm:text-sm font-semibold leading-6 text-gray-300 whitespace-nowrap">
                            Data:{" "}
                            {item.updatedAt.toLocaleDateString() +
                              " " +
                              item.updatedAt.toLocaleTimeString()}
                          </p>
                          <p className=" text-xs sm:text-sm mt-1 truncate text-gray-300">
                            Por: {item?.user?.name ?? "Desconhecido"}
                          </p>
                        </div>
                      </div>
                    </li>
                  </MotionDelay>
                ))}
              </React.Fragment>
            ))}
          </ul>
          <div className="flex justify-center m-8 " ref={ref}>
            {isFetchingNextPage ? (
              <Spinner />
            ) : hasNextPage ? (
              <Spinner />
            ) : (
              <div className=" border-t-2 border-gray-300 w-full rounded-sm" />
            )}
          </div>
          <Modal
            isOpen={isOpen}
            cancel={() => {
              onClose();
            }}
          >
            <div className="m-4 mt-8">
              <p className="text-gray-300 whitespace-pre-line">
                {script ?? "Sem script salvo"}
              </p>
            </div>
          </Modal>
        </div>
      </MotionComponent>
      <ToastContainer />
    </>
  );
}
