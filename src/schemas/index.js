import * as yup from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

export const basicSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const purchaseSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  zip: yup
    .string()
    .matches(/^\d{5}$/, "Zip must be exactly 5 digits")
    .required("Zip code is required"),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),
  expiry: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiration date must be MM/YY")
    .required("Expiration date is required"),
  cvv: yup
    .string()
    .matches(/^\d{3}$/, "CVV must be exactly 3 digits")
    .required("CVV is required"),
});