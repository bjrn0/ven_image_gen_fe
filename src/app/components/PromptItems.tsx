"use client";

import { prompts } from "../data/prompts";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setPromptText } from "../lib/slices/userSlice";
import { useState } from "react";

export const PromptItems = () => {
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState<string>("");
  return (
    <>
      <div className="w-60 overflow-scroll select-none mb-12">
        {prompts.map((item) => {
          return (
            <div
              key={item.shortName}
              className="relative w-full mb-4 cursor-pointer rounded-md group overflow-hidden"
              onClick={() => {
                setSelectedItem(item.shortName);
                dispatch(setPromptText(item.prompt));
              }}
            >
              <p
                className={`absolute bottom-0 text-center ${
                  selectedItem === item.shortName &&
                  "bg-orange-400 text-white opacity-100"
                } bg-gray-100 opacity-80 font-semibold w-full z-50 `}
              >
                {item.shortName}
              </p>
              <Image
                className="group-hover:scale-105 transition-all duration-300"
                alt={item.shortName}
                height="256"
                width="256"
                src={item.image}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
