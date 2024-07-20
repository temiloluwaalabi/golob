// @flow
"use client";
import { FormFieldTypes } from "@/components/form/login-form";
import {
  FormControl,
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

interface CustomFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldTypes;
  inputClassName?: string;
  labelClassName?: string;
  name: string;
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
        <FormControl>
          <Input
            disabled={formFields.disabled}
            placeholder={formFields.placeholder}
            type={formFields.inputType}
            className={cn(
              "!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:!ring-offset-0 ",
              formFields.inputClassName
            )}
            {...field}
          />
        </FormControl>
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

    case FormFieldTypes.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={formFields.placeholder}
            {...field}
            disabled={formFields.disabled}
            className={cn(
              "!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:!ring-offset-0 ",
              formFields.inputClassName
            )}
          />
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
                "flex gap-1 items-center p-0 relative !bg-transparent pr-[10px] h-[56px] border rounded-md "
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
