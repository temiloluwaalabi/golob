// @flow
import * as React from "react";

import { cn } from "@/lib/utils";
type Props = {
  boxClassName?: string;
  overlayClassName?: string;
  children: React.ReactNode;
  image: string;
};
export const BackgroundImageContainer = (props: Props) => {
  return (
    <div
      className={cn(
        "relative flex justify-center items-center",
        props.boxClassName
      )}
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center", // This line sets the background position
      }}
    >
      <div
        className={cn(
          "absolute z-10 top-0 left-0 w-full h-full bg-black/30",
          props.overlayClassName
        )}
      />{" "}
      {props.children}
    </div>
  );
};
