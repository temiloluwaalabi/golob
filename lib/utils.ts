import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number to a string representation with support for million (M) and billion (B) abbreviations.
 * @param {number} value - The number to be formatted.
 * @returns {string} - The formatted string.
 */
export function formatNumber(value: number): string {
  // Check if the value is less than 0
  if (value < 0) {
    // Handle negative values separately and format the absolute value
    const absoluteValue = Math.abs(value);
    return `-${formatNumber(absoluteValue)}`;
  } else if (value >= 1e9) {
    // Format the value in billions
    const formattedValue = value / 1e9;
    return `${formattedValue.toFixed(1)}B`;
  } else if (value >= 1e6) {
    // Check if the value is between 1 million and 1 billion
    // Format the value in millions
    const formattedValue = value / 1e6;
    return `${formattedValue.toFixed(1)}M`;
  } else if (value >= 1000) {
    // Check if the value is between 1 thousand and 1 million
    // Format the value in thousands
    const formattedValue = value / 1000;
    return `${formattedValue.toFixed(1)}K`;
  } else {
    // If the value is less than 1 thousand, return the original value as a string
    return value.toString();
  }
}
export const formatAndDivideNumber = (num: number): string => {
  if (typeof num === "number") {
    if (num >= 1000000) {
      const formattedNum = (num / 1000000).toFixed(1);
      return `${formattedNum}M`;
    } else if (num >= 1000) {
      const formattedNum = (num / 1000).toFixed(1);
      return `${formattedNum}K`;
    } else {
      return num.toString();
    }
  } else {
    return "N/A";
  }
};

export function generateSlug(title: string) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return slug.replace(/[^a-z0-9-]/g, "");
}
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}
export function addSpacesToCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export const formatPrice = (price: number) => {
  const formattedPrice = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  }).format(price);

  // Remove decimal part if it's .00
  return formattedPrice.replace(/\.00$/, "");
};
export function toCurrency(
  number: number | string,
  disableDecimal = false,
  decimalPlaces = 2
) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: disableDecimal ? 0 : decimalPlaces,
    maximumFractionDigits: disableDecimal ? 0 : decimalPlaces,
  });
  return formatter.format(+number);
}

export const addHypens = (text: string) => {
  // Convert text to lowercase and split by spaces, commas, etc.
  const parts = text.toLowerCase().split(/[ ,]+/);

  // Join the parts with hyphens ONLY if there are multiple parts
  return parts.length > 1 ? parts.join("-") : parts[0];
};
export const addSpaces = (text: string) => {
  // Convert text to lowercase and split by hyphens and underscores
  const parts = text.toLowerCase().split(/[-_]+/);

  // Join the parts with spaces in between
  return parts.join(" ");
};
interface ParsedDate {
  day: string;
  month: string;
  year: number;
  dayOfWeek: string;
}

export const DateParser = (dateString: string): ParsedDate => {
  const [day, month, year] = dateString.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day); // month is zero-indexed in Date object
  const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });

  // Function to get the ordinal suffix for the day
  const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Function to shorten month names
  const getShortMonthName = (month: number): string => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[month - 1];
  };

  // Get the ordinal day suffix
  const daySuffix = getDaySuffix(day);

  // Get the shortened month name
  const shortMonthName = getShortMonthName(month);

  return {
    day: `${day}${daySuffix}`,
    month: shortMonthName,
    year,
    dayOfWeek,
  };
};
export const convertAmountFromMilinunits = (amount: number) => {
  return amount / 1000;
};
export const convertAmountToMilinunits = (amount: number) => {
  return Math.round(amount * 1000);
};
export function formatDate(
  date?: Date,
  format: string = "DD MMM, YYYY"
): string {
  if (!date) return "";
  return dayjs(date).format(format);
}

export const maskEmail = (email: string) => {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    return email;
  }

  const [username, domain] = email.split("@");
  const domainParts = domain.split(".");
  const lastWordsBeforeDot = domainParts[domainParts.length - 2];
  const maskedUsername = maskString(username.substring(0, 2));
  const maskedDomain = maskString(lastWordsBeforeDot.substring(0, 2));

  return `${maskedUsername}@${maskedDomain}.${
    domainParts[domainParts.length - 1]
  }`;
};
export const maskString = (str: string) => {
  return str.substring(0, 2) + "●●●●";
};
