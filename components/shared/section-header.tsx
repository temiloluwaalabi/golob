// @flow
import * as React from "react";
import { Button } from "../ui/button";
type Props = {
  title: string;
  desc: string;
  btn: string;
};
export const SectionHeader = (props: Props) => {
  return (
    <div className="flex items-start gap-2 md:items-center flex-col  md:flex-row justify-between py-2">
      <div className="flex flex-col gap-4">
        <h4 className="text-[32px] font-mont leading-10 text-black font-semibold">
          {props.title}
        </h4>
        <p className="text-base font-mont max-w-[700px] opacity-75 text-primary-blackishGreen">
          {props.desc}
        </p>
      </div>
      <Button className="cursor-pointer flex ic justify-center py-[10px] px-[8px] h-[40px] w-[149px] border border-primary rounded-md outline-none font-mont text-sm font-medium text-primary-blackishGreen">
        {props.btn}
      </Button>
    </div>
  );
};
