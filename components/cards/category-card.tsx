// @flow
import * as React from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
type Props = {
  title: string;
  desc: string;
  img: string;
  btnText: string;
};
export const CategoryCard = (props: Props) => {
  return (
    <div
      className="relative h-[400px] md:h-[500px] lg:h-[599px] pb-[24px] rounded-[20px]  flex justify-center items-end gap-[10px]"
      style={{
        backgroundImage: `url(${props.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center", // This line sets the background position
      }}
    >
      <div className="p-[10px] flex flex-col items-center justify-center gap-[10px]">
        <h4 className="font-gothic text-[40px] leading-[51px] text-center text-white font-bold">
          {props.title}
        </h4>
        <p className="font-mont max-w-[389px] text-base text-center text-white">
          {props.desc}
        </p>
        <Button className="cursor-pointer flex items-center space-x-1 justify-center py-[10px] px-[8px] h-[40px] w-[149px] border border-primary rounded-md hover:bg-white outline-none font-mont text-sm font-medium text-primary-blackishGreen">
          <Send className="size-4 mr-2" /> {props.btnText}
        </Button>
      </div>
    </div>
  );
};
