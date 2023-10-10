"use client";

import { useState, useEffect } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import TextAreaUseForm from "../../inputs/textAreaLabelUseForm";
import ControlledInput from "../../inputs/controlledInput";
import Input from "@/components/inputs/inputLabelUseForm";

import { User } from "@prisma/client";
//constants
import { tabScript } from "@/constants/tabScript";
import { bases } from "@/constants/bases";
import { sla } from "@/constants/sla";
import { AnimatePresence, motion } from "framer-motion";

//ZOD
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScriptForm = ({
  currentUser,
  control,
  errors,
  register,
}: {
  currentUser?: User | null;
  control: any;
  errors: any;
  register: any;
}) => {
  return (
    <>
      <motion.div
        key={`email`}
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div>
          <ControlledInput
            name="base"
            array={bases}
            control={control}
            error={errors}
          />
        </div>
        <Input
          label="CLIENTE"
          placeholder="Nome e código"
          id="client"
          register={register}
          error={errors}
          required
        />

        <Input
          label="PROTOCOLO"
          placeholder="20230000000000"
          id="protocol"
          error={errors}
          register={register}
        />
        <TextAreaUseForm
          label="ENDEREÇO"
          placeholder="Endereço"
          id="addres"
          error={errors}
          register={register}
          required
        />
        <div>
          <ControlledInput
            name="sla"
            array={sla}
            error={errors}
            control={control}
          />
        </div>
        <Input
          label="RESPONSÁVEL"
          placeholder="Nome"
          id="name"
          error={errors}
          register={register}
          required
        />
        <Input
          label="TELEFONE"
          placeholder="(xx) xxxxx-xxxx"
          id="tel"
          error={errors}
          register={register}
          required
        />
      </motion.div>
    </>
  );
};

export default ScriptForm;
