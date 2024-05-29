import { z } from "zod";
const passwordErrorMessage = "Password must contain at least 4 character(s)";
const phoneErrorMessage = "Phone number must contain at least 11 character(s)";
const countryErrorMessage = "Country must contain at least 11 character(s)";
export const validateLoginData = z.object({
  email: z.string({ message: "email is required" }).email(),
  password: z
    .string({ message: "password is required" })
    .min(2, passwordErrorMessage),
});

export const validateRegData = z
  .object({
    email: z.string({ message: "email is required" }).email(),
    fullname: z.string({ message: "fullname is required" }).min(2),
    password: z
      .string({ message: "password is required" })
      .min(4, passwordErrorMessage),
    confirmPassword: z
      .string({ message: "password is required" })
      .min(4, passwordErrorMessage),
    telephone: z
      .string({ message: "telephone is required" })
      .min(11, phoneErrorMessage),
    country: z.string().min(2, countryErrorMessage).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  });
export const validateSellerRegData = z
  .object({
    email: z.string({ message: "email is required" }).email(),
    fullname: z.string({ message: "fullname is required" }).min(2),
    companyName: z.string({ message: "Company name is required" }).min(2),
    password: z
      .string({ message: "password is required" })
      .min(4, passwordErrorMessage),
    confirmPassword: z
      .string({ message: "password is required" })
      .min(4, passwordErrorMessage),
    telephone: z
      .string({ message: "telephone is required" })
      .min(11, phoneErrorMessage),
    country: z.string().min(2, countryErrorMessage).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  });
