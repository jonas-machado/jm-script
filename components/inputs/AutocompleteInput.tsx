import React, { Fragment, useState } from "react";
import { Controller } from "react-hook-form";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface olt {
  name: string;
  label: string;
  options: any[];
  control: any;
  placeHolder: string;
  id: string;
  className?: any;
}

const AutocompleteInput = ({
  name,
  label,
  options,
  placeHolder,
  control,
  className,
  id,
}: olt) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered =
    query === ""
      ? options
      : options.filter((value: any) => {
          return value.olt.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Combobox value={field.value} by="id" onChange={field.onChange}>
            <div className="relative w-full z-10">
              <div
                className={`flex relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none sm:text-sm ${className}`}
              >
                <label
                  htmlFor={id}
                  className="inline-flex items-center rounded-l-md border border-r-0 border-gray-900 bg-gray-700 bg-opacity-70 px-3 text-sm text-gray-200"
                >
                  {label}
                </label>
                <Combobox.Input
                  placeholder={placeHolder}
                  className="w-full border border-r-none border-gray-900 outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-300 bg-gray-900 bg-opacity-70"
                  displayValue={(value: any) => value.olt}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="rounded-lg absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
                  {filtered.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-300">
                      Nothing found.
                    </div>
                  ) : (
                    filtered.map((olt: any) => (
                      <Combobox.Option
                        key={olt.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-purple-600 text-white"
                              : "text-gray-300 bg-gray-900"
                          }`
                        }
                        value={olt}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {olt.olt}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        )}
      />
    </>
  );
};

export default AutocompleteInput;
