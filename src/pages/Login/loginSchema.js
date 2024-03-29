import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required!")
    .min(8, "Password is too short")
    .test(
      "isValidPass",
      "Password must be 8 char (One UpperCase & One Symbol)",
      (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasSymbol = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value);
        let validConditions = 0;
        const numberOfMustBeValidConditions = 2;
        const conditions = [hasUpperCase, hasSymbol];
        conditions.forEach((condition) =>
          condition ? validConditions++ : null
        );
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      }
    ),
});