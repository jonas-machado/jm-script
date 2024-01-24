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
import MotionContent from "@/lib/framerMotion/motionContent";

const oltBrand = [
  { name: "ZTE" },
  { name: "DATACOM" },
  { name: "INTELBRAS G" },
  { name: "INTELBRAS I" },
];

interface Verify {
  verifyState: () => void;
}

const Verify = ({ verifyState }: Verify) => {
  return (
    <MotionContent id="verify">
      <div className="flex flex-col w-full gap-4 h-full">
        <div>
          <textarea
            name=""
            id=""
            className="w-full bg-gray-900 rounded-md h-60 text-gray-300 p-2"
          ></textarea>
        </div>
        <div className="flex gap-4">
          <button
            onClick={verifyState}
            className="bg-gray-900 rounded-md p-2 text-gray-300 w-full col-span-2 hover:bg-gray-800 transition"
          >
            Editar
          </button>
          <button className="bg-gray-900 rounded-md p-2 text-gray-300 w-full col-span-2 hover:bg-gray-800 transition">
            Gerar
          </button>
        </div>
      </div>
    </MotionContent>
  );
};

export default Verify;
