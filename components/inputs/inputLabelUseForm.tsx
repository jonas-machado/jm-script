"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface input {
  label: string;
  placeholder?: string;
  id: string;
  name?: any;
  onChange?: any;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  register: UseFormRegister<FieldValues>;
  error?: any;
  index?: any;
}
const Input = ({
  label,
  id,
  name,
  onChange,
  register,
  required,
  placeholder,
  value,
  defaultValue,
  error,
  index,
}: input) => {
  return (
    <div
      className={`flex transition-all rounded-md ${
        error[id] || error.inputs?.[index]?.[name]
          ? "shadow-[0px_0px_4px_0_rgb(147_51_234/1)]"
          : ""
      }
    `}
    >
      <span className="inline-flex py-2 items-center rounded-l-md border border-r-0 border-gray-900 bg-gray-700 bg-opacity-70 px-3 text-sm text-gray-200">
        {label}
      </span>
      <input
        type="text"
        id={id}
        className={` block caret-gray-200 outline-none w-full h-auto flex-1 rounded-none rounded-r-md bg-gray-900 bg-opacity-70 pl-3 text-gray-200 border-gray-900 sm:text-sm autofill:shadow-[inset_0_0_0px_1000px_rgb(17,24,39,0.7)] border-b-[1px] border-t-[1px]`}
        placeholder={placeholder}
        spellCheck="false"
        defaultValue={defaultValue}
        value={value}
        {...register(id, { required })}
      />
    </div>
  );
};

export default Input;
