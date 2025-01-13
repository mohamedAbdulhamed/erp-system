import { toast } from "react-toastify";
import { colorsType } from "../config/constants.ts";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const inputStyles = (colors: colorsType, compinedStyles: SxProps<Theme> = {}) => ({
  "& .MuiInputLabel-root": { color: "black" },
  "& .MuiInputBase-root": { color: "black" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: colors.secondry, // Default border color
    },
    "&:hover fieldset": {
      borderColor: colors.secondry, // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.black, // Border color when focused
    },
  },
  "& .MuiFormLabel-root": {
    color: colors.black, // Label color
  },
  "& .MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-popupIndicator.css-10sixfi-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator":
  {
    color: colors.black, // Label color
  },
  "& .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-clearIndicator.css-1cleyyo-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator":
  {
    color: colors.black, // Label color
  },
  ...compinedStyles,
});

export const gridColumnStyles = (colors: colorsType, columns: number = 2, compinedStyles: SxProps<Theme> = {}) => ({
  ...inputStyles(colors, compinedStyles),
  gridColumn: `span ${columns}`,
});

type SeverityLevel = "error" | "warning" | "info" | "success";

export const handleError = (
  err: any,
  defaultMessage: string = "Operation failed.",
  notFoundMessage: string = "Entities Not Found.",
  severity: SeverityLevel = "error"
) => {
  if (err?.name === "AbortError") return;

  const message =
    err.response?.data?.ErrorMessage ||
    (err.response?.status === 404 ? notFoundMessage : defaultMessage);

  switch (severity) {
    case "warning":
      toast.warning(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "success":
      toast.success(message);
      break;
    default:
      toast.error(message);
      break;
  }

  // a more simpler way
  // const toastFn = {
  //   error: toast.error,
  //   warning: toast.warning,
  //   info: toast.info,
  //   success: toast.success,
  // }[severity];

  // toastFn(message);
};

export const truncateString = (str?: string, maxLength: number = 30): string => {
  if (!str) return "";
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}

export const formatDateToDateOnly = (date: Date) => {
  return date.toISOString().split('T')[0];
};