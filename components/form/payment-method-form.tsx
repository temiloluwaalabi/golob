"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { DebitCardSchema } from "@/lib/validations";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const acceptedCards = [
  { type: "American-Express", lengths: [15], prefixes: ["34", "37"] },
  { type: "Visa", lengths: [13, 16, 19], prefixes: ["4"] },
  {
    type: "Mastercard",
    lengths: [16, 20],
    prefixes: ["51", "52", "53", "54", "55"],
  },
  { type: "Discover", lengths: [16, 19], prefixes: ["6011", "644", "65"] },
  { type: "Verve", lengths: [19], prefixes: ["5061", "6500", "6360"] },
];

interface CreditCardFormProps {
  btnLabel: string;
}
const CreditCardForm = ({ btnLabel }: CreditCardFormProps) => {
  const [cardType, setCardType] = useState<string | null>(null);
  const [maxLength, setMaxLength] = useState<number>(24); // Default to the max length for all cards
  const form = useForm<z.infer<typeof DebitCardSchema>>({
    resolver: zodResolver(DebitCardSchema),
  });

  // const cardNum = form.watch("cardNumber");
  // console.log(cardType);
  const guessCardType = (cardNumber: string) => {
    for (const card of acceptedCards) {
      for (const prefix of card.prefixes) {
        if (cardNumber.startsWith(prefix)) {
          setMaxLength(Math.max(...card.lengths));
          return card.type;
        }
      }
    }
    return "Unknown";
  };
  const formatCardNumber = (cardNumber: string) => {
    return cardNumber
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };
  // Function to handle card number input (add spaces)

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputElement = event.target;
    let value = inputElement.value.replace(/\D/g, ""); // Remove non-digit characters

    // Limit the length to the maximum length based on card type
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }
    const formattedValue = formatCardNumber(value);

    form.setValue("cardNumber", formattedValue);
    console.log(form.getValues("cardNumber"));
    setCardType(guessCardType(value));
  };

  const handleCardNumberKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const inputElement = event.target as HTMLInputElement;
    if (event.key === "Backspace") {
      const value = inputElement.value;
      if (value.endsWith(" ")) {
        inputElement.value = value.slice(0, -1); // Remove trailing space
      } else if (value.length && value[value.length - 2] === " ") {
        inputElement.value = value.slice(0, -2); // Remove digit and preceding space
        event.preventDefault();
      }
    }
  };

  //   const handleCardNumberKeyDown = (
  //     event: React.KeyboardEvent<HTMLInputElement>
  //   ) => {
  //     const inputElement = event.target as HTMLInputElement;
  //     let value = inputElement.value;

  //     // Only add spaces when the user types a digit (not backspace, etc.)
  //     if (event.key.match(/[0-9]/)) {
  //       value = value.replace(/ /g, ""); // Remove existing spaces
  //       value = value.match(/.{1,4}/g)?.join(" ") || ""; // Add spaces
  //       inputElement.value = value; // Update the input value
  //     } else if (event.key === "Backspace") {
  //       // Handle backspace
  //       // Remove the last space and the preceding digit when backspacing
  //       if (value.length > 4 && value.endsWith(" ")) {
  //         value = value.slice(0, value.length - 2);
  //         inputElement.value = value;
  //       }
  //     }
  //   };
  // Function to handle expiry date input
  const handleExpiryDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    if (value.length > 5) {
      value = value.slice(0, 5);
    }

    inputElement.value = value;
    form.setValue("expiryDate", value);
  };
  // Function to handle expiry date input (remove "/" when clearing)
  const handleExpiryDateClear = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    // Remove "/" when backspacing and the length is 3
    if (
      event.key === "Backspace" &&
      value.length === 3 &&
      value.includes("/")
    ) {
      value = value.slice(0, 2);
      inputElement.value = value;
      form.setValue("expiryDate", value);
    }
  };
  const handleSubmit = async (values: z.infer<typeof DebitCardSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            name="cardNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <div className="relative flex h-[56px] items-center gap-1 rounded-md border bg-white p-0 pr-[10px] ">
                  <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                    Card Number
                  </FormLabel>
                  <FormControl>
                    <div className="flex w-full items-center justify-between">
                      <Input
                        // disabled={isPending}
                        placeholder="Card Number"
                        type="email"
                        className="!border-none !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        {...field}
                        onChange={(value) => {
                          handleCardNumberChange(value);
                          //   field.onChange(value.target.value.replace(/ /g, ""));
                          //   setCardType(guessCardType(cardNum));
                        }}
                        onKeyDown={handleCardNumberKeyDown}
                      />
                      {cardType && (
                        <div className="mt-2">
                          {/* Display card image based on cardType */}
                          <Image
                            src={`/assets/${cardType.toLowerCase()}.png`}
                            width={32}
                            height={32}
                            alt={cardType}
                            className="absolute right-0 top-0 -translate-x-3 translate-y-1/2 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 mmd:col-span-6">
              <FormField
                name="expiryDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="relative flex h-[56px] items-center gap-1 rounded-md border bg-white p-0 pr-[10px] ">
                      <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                        Exp. Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          // disabled={isPending}
                          placeholder="Expiry Date"
                          type="email"
                          className="!border-none !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                          {...field}
                          onChange={handleExpiryDateChange}
                          onKeyDown={handleExpiryDateClear}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 mmd:col-span-6">
              <FormField
                name="cvv"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="relative flex h-[56px] items-center gap-1 rounded-md border bg-white p-0 pr-[10px] ">
                      <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                        CVC
                      </FormLabel>
                      <FormControl>
                        <Input
                          // disabled={isPending}
                          placeholder="123"
                          type="email"
                          className="!border-none !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <div className="relative flex h-[56px] items-center gap-1 rounded-md border bg-white p-0 pr-[10px] ">
                  <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isPending}
                      placeholder="Enter your name"
                      type="text"
                      className="!border-none !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="country"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <div className="relative flex h-[56px] items-center gap-1 rounded-md border bg-white p-0 pr-[10px] ">
                  <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                    Country or Region
                  </FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isPending}
                      placeholder="Select your country"
                      type="text"
                      className="!border-none !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <FormField
              name="saveInfo"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-1 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="rememeberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="rememberMe"
                    className="text-14_medium text-primary-blackishGreen"
                  >
                    Securely save my information for 1-click checkout
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="my-[14px] mt-[30px] flex flex-col items-center space-y-6">
          <Button className="h-[48px] w-full rounded-md text-sm font-semibold text-primary-blackishGreen hover:bg-primary-blackishGreen hover:text-white">
            {btnLabel}
          </Button>
          <p className="flex items-center gap-1 text-center text-xs font-normal text-primary-blackishGreen opacity-75">
            <span>
              By confirming your subscription, you allow The Outdoor Inn Crowd
              Limited to charge your card for this payment and future payments
              in accordance with their terms. You can always cancel your
              subscription.
            </span>{" "}
          </p>
        </div>
      </form>
    </Form>
  );
};

export default CreditCardForm;
