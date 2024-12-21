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
    <div className="flex flex-col items-start justify-between gap-2  py-2 md:flex-row md:items-center">
      <div className="flex flex-col gap-4">
        <h4 className="font-mont text-[32px] font-semibold leading-10 text-black">
          {props.title}
        </h4>
        <p className="max-w-[700px] font-mont text-base text-primary-blackishGreen opacity-75">
          {props.desc}
        </p>
      </div>
      <Button className="ic flex h-[40px] w-[149px] cursor-pointer justify-center rounded-md border border-primary px-[8px] py-[10px] font-mont text-sm font-medium text-primary-blackishGreen outline-none">
        {props.btn}
      </Button>
    </div>
  );
};
