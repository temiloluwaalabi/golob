/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Minus, Plus } from "lucide-react";
import React, { useCallback } from "react";

import { Button } from "../ui/button";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
  field: any;
  name: string;
  setValue: any;
  totalPassengers: number;
  disabled: boolean;
  reduceLimit: number;
  addLimit: number;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
  field,
  name,
  setValue,
  totalPassengers,
  disabled,
  reduceLimit,
  addLimit,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
    // setValue(`${name}`, value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 0) {
      // setValue(`${name}`, 0);
      return;
    }
    onChange(value - 1);
    // setValue(`${name}`, value - 1);
  }, [onChange, value]);
  return (
    <div className="flex flex-row items-center  justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="text-xs font-light text-light-500 dark:text-light-300/40">
          {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Button
          type="button"
          disabled={disabled || value === reduceLimit}
          // disabled={totalPassengers < 2 || disabled}
          variant={"ghost"}
          size={"icon"}
          className="flex size-6 cursor-pointer items-center justify-center rounded-full border border-neutral-400 text-neutral-600 transition hover:opacity-80 disabled:cursor-not-allowed dark:border-light-500 dark:text-light-700 dark:hover:bg-light-500"
          onClick={onReduce}
        >
          <Minus size={15} />
        </Button>
        <div className="text-lg font-light text-neutral-600 dark:text-light-700">
          {value}
        </div>
        <Button
          type="button"
          disabled={value === addLimit || disabled}
          variant={"ghost"}
          size={"icon"}
          onClick={onAdd}
          className="flex size-6 cursor-pointer items-center justify-center rounded-full border border-neutral-400 text-neutral-600 transition hover:opacity-80 dark:border-light-500 dark:text-light-700 dark:hover:bg-light-500"
        >
          <Plus size={15} />
        </Button>
      </div>
    </div>
  );
};

export default Counter;
