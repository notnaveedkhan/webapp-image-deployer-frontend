import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForgotPasswordMutation } from "../services/auth.service";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const [forgotPassword] = useForgotPasswordMutation();
  const toast = useToast();
  const Formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      setDisabled(true);
      setLoading(true);
      forgotPassword(values.email).then((res: any) => {
        if (res.data) {
          setLoading(false);
          setDisabled(false);
          toast({
            title: `${res.data.message}`,
            isClosable: true,
            duration: 2000,
            position: "top",
            status: "success",
          });
          navigate("/login");
        }
        if (res.error) {
          setLoading(false);
          setDisabled(false);
          toast({
            title: res.error.data.message,
            isClosable: true,
            duration: 3000,
            position: "top",
            status: "error",
          });
        }
      });
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    }),
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Forgot Your Password?</h2>
        <p className="text-gray-600 mb-4">
          Enter your email address below, and we'll send you instructions on how
          to reset your password.
        </p>
        <form onSubmit={Formik.handleSubmit} className="mb-4">
          <FormControl
            isInvalid={!!(Formik.touched.email && Formik.errors.email)}>
            <FormLabel className="block mb-2 text-sm text-gray-600">
              Email Address
            </FormLabel>
            <Input
              {...Formik.getFieldProps("email")}
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-blue-500"
              placeholder="Enter your email address"
              required
            />
            <FormErrorMessage>{Formik.errors.email}</FormErrorMessage>
          </FormControl>
          <button
            disabled={disabled}
            type="submit"
            className="flex gap-2 justify-center mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50">
            {loading ? (
              <>
                <Spinner />
                <p>Forgot Password</p>
              </>
            ) : (
              "Forgot Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
