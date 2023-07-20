import { FormControl, Input, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { useVerifyOtpMutation } from "../services/otp.service";
import { removeVerifyEmail } from '../states/verify-email.state';


export default function VerifyEmail() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toast = useToast()

  const [verifyOTP] = useVerifyOtpMutation();
  const Formik = useFormik({
    initialValues: {
      code: ''
    },
    onSubmit: (values) => {
      verifyOTP({
        code: values.code,
        email: localStorage.getItem('email'),
      }).then((res) => {
        if (res.data) {
          toast({
            title: `${res.data.message}`,
            isClosable: true,
            duration: 2000,
            position: "top",
            status: "success",
          });
          dispatch(removeVerifyEmail());
          navigate("/login");
        }
        if (res.error) {
          toast({
            title: res.error.data.message,
            isClosable: true,
            duration: 3000,
            position: "top",
            status: "error",

          });
        }
      })
    },
    validationSchema: yup.object({
      code: yup.string().required()
    })
  })
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Verify Your Email</h2>
        <p className="text-gray-600 mb-4">
          An email has been sent to your registered email address.
          Please click the link in the email to verify your account.
        </p>
        <form onSubmit={Formik.handleSubmit} className="mb-4">
          <FormControl>
            <Input
              {...Formik.getFieldProps('code')}
              type="text"
              className="w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out"
              placeholder="Enter verification code"
            />
          </FormControl>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3">Verify</button>
        </form>
      </div>
    </div>
  )
}
