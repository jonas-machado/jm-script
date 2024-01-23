"use client";

import { useState, useEffect, Fragment } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";

import Input from "@/components/inputs/inputLabelUseForm";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInput from "@/components/inputs/controlledInput";
import { CopyToClipboard } from "react-copy-to-clipboard";

const oltBrand = [
  { name: "ZTE" },
  { name: "DATACOM" },
  { name: "INTELBRAS G" },
  { name: "INTELBRAS I" },
];

interface Config {
  verifyState: () => void;
  handleSubmit: () => void;
  command?: string[];
  register: any;
  control: any;
  currentOlt: string;
  errors: any;
}

const Config = ({
  verifyState,
  handleSubmit,
  command,
  errors,
  register,
  control,
  currentOlt,
}: Config) => {
  //   const [command, setCommand] = useState<string[]>();

  //   const schema = z.object({
  //     olts: z.string().nonempty(),
  //     pon: z.string().trim().nonempty(),
  //   });

  //   const {
  //     register,
  //     handleSubmit,
  //     control,
  //     reset,
  //     watch,
  //     formState: { errors },
  //   } = useForm({ resolver: zodResolver(schema) });
  //   const { olts, pon } = watch();
  //   const notify = (text: any) => {
  //     toast.error(text, {
  //       theme: "dark",
  //       pauseOnFocusLoss: false,
  //       pauseOnHover: false,
  //     });
  //   };
  //   console.log(command);

  //   const onSubmit = ({ olts, pon }: FieldValues) => {
  //     console.log(olts, pon);

  //     switch (olts) {
  //       case "ZTE":
  //         const commandZte = [
  //           `show gpon onu state gpon-olt_${pon}`,
  //           `show mac gpon olt gpon-olt_${pon}`,
  //         ];
  //         setCommand(commandZte);
  //         break;
  //       case "DATACOM":
  //         const commandDatacom = [
  //           `do show interface gpon ${pon} onu`,
  //           `show service-port gpon ${pon}`,
  //           `do show mac-address-table vlan 10${pon.split("/").slice(-1)}`,
  //         ];

  //         setCommand(commandDatacom);
  //         break;
  //       case "INTELBRAS G":
  //         break;
  //       case "INTELBRAS I":
  //         break;
  //     }
  //   };

  return (
    <div className="grid lg:grid-cols-2 w-full gap-4 h-full">
      <form
        className="flex flex-col space-y-1 gap-1"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <ControlledInput
          array={oltBrand}
          name={"olts"}
          control={control}
          error={errors}
          defaultValue="ZTE"
        />
        <Input
          label="PON"
          placeholder="x/x/x"
          id="pon"
          register={register}
          error={errors}
          required
        />
        <div className="w-full ">
          <button
            type="submit"
            className="flex w-full justify-center py-2 px-3 rounded-md border border-gray-900 bg-gray-900  text-sm font-medium leading-4 text-gray-200 shadow-sm hover:bg-gray-600 focus:outline-none"
          >
            GERAR
          </button>
        </div>
      </form>
      <div className="">
        <h1 className="text-gray-300 text-2xl font-bold">Comandos:</h1>
        {command?.map((item) => (
          <div className="flex gap-2 my-2">
            <span className="text-gray-300">{item}</span>
            <CopyToClipboard text={item}>
              <button className="text-gray-300 bg-gray-900 rounded-md px-1 focus:bg-gray-800 transition">
                Copiar
              </button>
            </CopyToClipboard>
          </div>
        ))}
      </div>
      <div className="">
        <h1 className="text-gray-300 text-xl mb-2">
          Texto para comparar <strong>antes</strong>:
        </h1>
        <textarea
          {...register("firstPon")}
          id="firstPon"
          className="w-full bg-gray-900 rounded-md h-60 text-gray-300 p-2"
        ></textarea>
      </div>
      <div className="">
        <h1 className="text-gray-300 text-xl mb-2">
          Texto para comparar <strong>depois</strong>:
        </h1>
        <textarea
          {...register("secondPon")}
          id="secondPon"
          className="w-full bg-gray-900 rounded-md h-60 text-gray-300 p-2"
        ></textarea>
      </div>
      <div className=" col-span-2">
        <h1 className="text-gray-300 text-xl mb-2">Todos os MAC da PON:</h1>
        <textarea
          name=""
          id=""
          className="w-full bg-gray-900 rounded-md h-60 text-gray-300 p-2"
        ></textarea>
      </div>
      {currentOlt == "DATACOM" && (
        <div className=" col-span-2">
          <h1 className="text-gray-300 text-xl mb-2">
            Todos os service-port da PON:
          </h1>
          <textarea
            name=""
            id=""
            className="w-full bg-gray-900 rounded-md h-60 text-gray-300 p-2"
          ></textarea>
        </div>
      )}
      <button
        onClick={verifyState}
        className="bg-gray-900 rounded-md p-2 text-gray-300 w-full col-span-2 hover:bg-gray-800 transition"
      >
        Verificar
      </button>
    </div>
  );
};

export default Config;