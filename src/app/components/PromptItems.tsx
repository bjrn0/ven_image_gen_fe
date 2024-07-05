"use client";

import { prompts } from "../data/prompts";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setPromptText } from "../lib/slices/userSlice";

export const PromptItems = () => {
  const imageId = useAppSelector((state) => state.user.generatedImageId);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="w-60 overflow-scroll select-none mb-12">
        {prompts.map((item) => {
          return (
            <div
              key={item.shortName}
              className="relative w-full mb-4 cursor-pointer"
              onClick={() => dispatch(setPromptText(item.prompt))}
            >
              <p className="absolute bottom-0 text-center bg-gray-100 opacity-80 font-semibold w-full">
                {item.shortName}
              </p>
              <Image
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
