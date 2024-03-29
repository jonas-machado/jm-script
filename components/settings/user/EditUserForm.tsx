"use client";

import React, { Fragment, useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z, ZodType } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInputArray from "@/components/inputs/controlledInputArray";
import { sectorArray } from "@/constants/sectorArray";
import useEditUserModal from "@/lib/zustand/useEditUser";

const role = ["ADMIN", "USER"];

export default function EditUserForm({ selectedUser }: any) {
  const { data: session, update, status } = useSession();

  const editIsOpen = useEditUserModal((state) => state.isOpen);
  const editOnOpen: () => void = useEditUserModal((state) => state.onOpen);
  const editOnClose: () => void = useEditUserModal((state) => state.onClose);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //função para notificações
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

  //schema do zod
  const schema = z
    .object({
      sector: z.string({}).nonempty({ message: "Preencha todos os campos" }),
      role: z.string({}).nonempty({ message: "Preencha todos os campos" }),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });

  //use effect para verificar erros nos campos
  useEffect(() => {
    for (let error in errors) {
      notify(errors[error]?.message);
    }
  }, [errors]);

  //função on submit que envia os dados para o nextauth e posteriomente para o mongoDB
  const handleClickUpdate = async ({ sector, role, email }: FieldValues) => {
    setIsLoading(true);
    const newSession = {
      user: {
        sector: sector,
        role: role,
      },
    };
    await update(newSession);

    await axios
      .post("/api/user/update", {
        sector,
        role,
        email: selectedUser.email,
      })
      .then(async (res: any) => {
        if (res.data.error) {
          setIsLoading(false);
          return notify(res.data.error);
        }
        notifySuc("Atualizado com sucesso");
        router.refresh();
        editOnClose();
      });
  };

  return (
    <>
      <motion.div
        key="reg"
        id="container"
        className={` py-1 px-6 w-full h-full`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0 }}
      >
        <form
          onSubmit={handleSubmit(handleClickUpdate)}
          className="grid gap-4 "
        >
          <ControlledInputArray
            name="sector"
            control={control}
            array={sectorArray}
            className="flex-col sm:flex-row"
            defaultValue={selectedUser.sector}
          />
          <p className="text-gray-300 text-xs sm:text-sm font-bold border-2 border-gray-800 rounded-md p-2 bg-gray-900">
            {selectedUser.name}
          </p>
          <p className="text-gray-300 text-xs sm:text-sm font-bold border-2 border-gray-800 rounded-md p-2 bg-gray-900">
            {selectedUser.email}
          </p>
          <ControlledInputArray
            name="role"
            control={control}
            array={role}
            className="flex-row"
            defaultValue={selectedUser.role}
          />
          <button
            className="bg-gray-800 rounded-md px-4 py-2 text-gray-300"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </motion.div>
    </>
  );
}
