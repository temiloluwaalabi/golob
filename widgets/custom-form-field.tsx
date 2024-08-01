// @flow
"use client";
import { FormFieldTypes } from "@/components/form/login-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { Control } from "react-hook-form";
import CustomPasswordInput from "./password-widget";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface CustomFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldTypes;
  inputClassName?: string;
  labelClassName?: string;
  changeSelectValue?: (field: string) => void;
  onInputKeyDown?: (e: any) => void;
  name: string;
  formDescription?: string;
  label?: string;
  floatLabel?: boolean;
  inputType?: string;
  passwordLabel?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

type Props = {
  field: any;
  formFields: CustomFormFieldProps;
};

const RenderInput = ({ field, formFields }: Props) => {
  switch (formFields.fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <>
          <FormControl>
            <Input
              disabled={formFields.disabled}
              placeholder={formFields.placeholder}
              onKeyDown={(e) => {
                if (formFields.onInputKeyDown) {
                  formFields.onInputKeyDown(e);
                }
              }}
              type={formFields.inputType}
              className={cn(
                "!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:!ring-offset-0 ",
                formFields.inputClassName
              )}
              {...field}
            />
          </FormControl>
          {formFields.children}
        </>
      );

    case FormFieldTypes.PASSWORD:
      return (
        <FormControl className="w-full">
          <CustomPasswordInput
            field={field}
            label={formFields.passwordLabel || "Password"}
            isPending={formFields.disabled}
            labelClassName={formFields.labelClassName}
          />
        </FormControl>
      );

    case FormFieldTypes.SELECT:
      return (
        <Select
          onValueChange={(value) => {
            field.onChange(value);
            if (formFields.changeSelectValue) {
              formFields.changeSelectValue(value);
            }
          }}
          defaultValue={field.value}
          // open={openTripWay}
          // onOpenChange={setOpenTripWay}
        >
          <FormControl>
            <SelectTrigger
              className={cn(
                "!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 w-full no-focus focus:ring-0 focus:ring-transparent focus:ring-offset-0 "
              )}
            >
              <SelectValue
                placeholder={formFields.placeholder}
                className="!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-base font-mont font-normal"
              />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="mt-2">{formFields.children}</SelectContent>
        </Select>
      );
    case FormFieldTypes.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={formFields.placeholder}
            {...field}
            disabled={formFields.disabled}
            className={cn(
              "!bg-transparent pt-4 !border-none focus-visible:ring-0 focus-visible:ring-transparent h-full focus-visible:!ring-offset-0 ",
              formFields.inputClassName
            )}
          />
        </FormControl>
      );

    case FormFieldTypes.INPUT_OTP:
      return (
        <FormControl>
          <InputOTP maxLength={6} {...field} disabled={formFields.disabled}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </FormControl>
      );

    case FormFieldTypes.CHECKBOX:
      return (
        <div className="flex items-center space-x-1 space-y-0">
          <FormControl>
            <Checkbox
              id="rememeberMe"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={formFields.disabled}
            />
          </FormControl>
          <FormLabel
            htmlFor="rememberMe"
            className="text-14_medium text-primary-blackishGreen"
          >
            Remember Me
          </FormLabel>
        </div>
      );
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <div
            className={cn(
              "",
              props.fieldType !== FormFieldTypes.PASSWORD &&
                "flex gap-1 items-center p-0 relative !bg-transparent pr-[10px] h-[56px] border rounded-md ",
              props.fieldType === FormFieldTypes.TEXTAREA && "h-auto"
            )}
          >
            {props.fieldType !== FormFieldTypes.CHECKBOX &&
              props.fieldType !== FormFieldTypes.PASSWORD &&
              props.label && (
                <FormLabel
                  className={cn(
                    "absolute top-0 left-0 translate-x-3 mt-[-12px] bg-white px-2 py-1",
                    props.labelClassName
                  )}
                >
                  {props.label}
                </FormLabel>
              )}
            <RenderInput field={field} formFields={props} />
          </div>
          {props.formDescription && (
            <FormDescription>{props.formDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
