// @flow
import { Send } from "lucide-react";
import * as React from "react";

import { Button } from "../ui/button";
type Props = {
  title: string;
  desc: string;
  img: string;
  btnText: string;
};
export const CategoryCard = (props: Props) => {
  return (
    <div
      className="relative flex h-[400px] items-end justify-center gap-[10px]  rounded-[20px] pb-[24px] md:h-[500px] lg:h-[599px]"
      style={{
        backgroundImage: `url(${props.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center", // This line sets the background position
      }}
    >
      <div className="flex flex-col items-center justify-center gap-[10px] p-[10px]">
        <h4 className="text-center font-gothic text-[40px] font-bold leading-[51px] text-white">
          {props.title}
        </h4>
        <p className="max-w-[389px] text-center font-mont text-base text-white">
          {props.desc}
        </p>
        <Button className="flex h-[40px] w-[149px] cursor-pointer items-center justify-center space-x-1 rounded-md border border-primary px-[8px] py-[10px] font-mont text-sm font-medium text-primary-blackishGreen outline-none hover:bg-white">
          <Send className="mr-2 size-4" /> {props.btnText}
        </Button>
      </div>
    </div>
  );
};
