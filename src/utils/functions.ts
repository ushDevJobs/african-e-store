import dotenv from "dotenv";

import { Request, Response } from "express";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { ErrorCode } from "../exceptions/root";
export const createPrismaError = (error: Error) => {
  if (error instanceof PrismaClientKnownRequestError) {
    let errorMessage: { message: string; code?: number } = { message: "" };
    switch (error.code) {
      case "P2002":
        errorMessage = {
          message: `Duplicate data\n ${
            process.env.NODE_ENV !== "production" && error.message
          } `,
        };
        break;
      case "P2025":
        if (error.name === "NotFoundError") {
          errorMessage = {
            message: `Not Found\n ${
              process.env.NODE_ENV !== "production" && error.message
            }`,
            code: ErrorCode.NOT_FOUND,
          };
        } else {
          errorMessage = {
            message: `Record Not found\n ${
              process.env.NODE_ENV !== "production" && error.message
            }`,
          };
        }
        break;
      default:
        errorMessage = { message: error.message };
    }
    return errorMessage;
  }
  if (error instanceof PrismaClientValidationError) {
    return {
      message: `Invalid Data Sent\n ${
        process.env.NODE_ENV !== "production" && error.message
      } `,
    };
  }
  return null;
};
export function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}
export const generateRandomId = function (): string {
  let randomValues: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return randomValues
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};
export const extractFullUrlProducts = (req: Request) => {
  return `${req.protocol}://${req["headers"].host}/images/product/`;
};
export const extractFullUrlStore = (req: Request) => {
  return `${req.protocol}://${req["headers"].host}/images/store/`;
};
export const extractFullUrlUser = (req: Request) => {
  return `${req.protocol}://${req["headers"].host}/images/user/`;
};
const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS,
  },
});

export const sendEmail = async (
  from: string = "Ush Engineering Team",
  subject: string,
  to: string | string[],
  html: any
) => {
  const mailOptions: MailOptions = {
    from: from + " <ushengineering@gmail.com>",
    to,
    subject,
    html,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    return {
      status: true,
      message: result,
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};

export const returnJSONSuccess = (
  responseObject: Response,
  rest?: object | undefined,
  status = 200
) => {
  responseObject.status(status);
  return responseObject.json({
    status: true,
    message: "Successful",
    ...rest,
  });
};
export const returnJSONError = (
  responseObject: Response,
  rest?: object | undefined,
  status = 400
) => {
  responseObject.status(status);
  responseObject.json({
    status: false,
    message: "Error: An error occurred",
    ...rest,
  });
};
export const format_text = (text: string) => text?.trim()?.toLowerCase();
export const isValidated = (result: any[]) => result.length > 0;
export const generateRandomNumbers = (repeatNumber: number = 4) => {
  let otp = "";

  for (let i = 0; i < repeatNumber; i++) {
    // Generate a random digit between 0 and 9
    const randomDigit = Math.floor(Math.random() * 10);
    otp += randomDigit.toString();
  }

  return parseInt(otp);
};

export const checkIfEmpty = (values: object[]): string[] => {
  let errors: string[] = [];
  values.forEach((value) => {
    let objValues = Object.values(value)[0] || null;
    if (
      objValues === "" ||
      objValues === null ||
      objValues === undefined ||
      objValues.length <= 0
    ) {
      let objKey = Object.keys(value);
      errors.push(`${objKey[0]} is required`);
    }
  });
  return errors;
};

export const convertToString = (date: Date) =>
  new Date(date).toJSON().slice(0, 10);

export const formatTimeAgo = (date: Date) => {
  let formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  });
  const DIVISION = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  let duration = (date.valueOf() - new Date().valueOf()) / 1000;
  for (let i = 0; i < DIVISION.length; i++) {
    const division = DIVISION[i];
    if (Math.abs(duration) < division.amount) {
      // @ts-ignore
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
};
