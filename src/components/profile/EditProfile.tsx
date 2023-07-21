import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  ModalHeader,
  FormControl,
  Input,
  FormErrorMessage,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import {
  UserBody,
  UserResponse,
  useUpdateUserMutation,
} from "../../services/user.service";
import * as yup from "yup";

interface Props {
  children: React.ReactNode;
  userData: UserResponse | undefined;
}

const EditProfile: React.FC<Props> = ({ children, userData }) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const toast = useToast();

  const initialValues: UserBody = {
    email: userData?.email as string,
    name: userData?.name as string,
    phone: userData?.phone as string,
    address: userData?.address as string,
    password: null,
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    address: yup.string().required("Address is required"),
  });

  const [userUpdate] = useUpdateUserMutation();

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      userUpdate(values).then((res: any) => {
        onClose();
        if (res.data) {
          toast({
            title: "Profile updated successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }

        if (res.error) {
          toast({
            title: "Error updating profile",
            description: res.error.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      });
    },
    validationSchema,
  });

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <form onSubmit={Formik.handleSubmit}>
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <ModalHeader>Edit Profile</ModalHeader>
              <div className="mt-4 flex flex-col gap-4">
                <FormControl>
                  <Input
                    {...Formik.getFieldProps("email")}
                    placeholder="Email"
                    readOnly={true}
                  />
                </FormControl>
                <FormControl
                  isInvalid={!!(Formik.touched.name && Formik.errors.name)}>
                  <Input {...Formik.getFieldProps("name")} placeholder="Name" />
                  <FormErrorMessage>{Formik.errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!(Formik.touched.phone && Formik.errors.phone)}>
                  <Input
                    {...Formik.getFieldProps("phone")}
                    placeholder="Phone"
                  />
                  <FormErrorMessage>{Formik.errors.phone}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!(Formik.touched.address && Formik.errors.address)
                  }>
                  <Input
                    {...Formik.getFieldProps("address")}
                    placeholder="Address"
                  />
                  <FormErrorMessage>{Formik.errors.address}</FormErrorMessage>
                </FormControl>
              </div>
              <ModalFooter className="gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 ">
                  Edit
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 bg-red-700 text-white rounded-md hover:bg-red-800 ">
                  Cancel
                </button>
              </ModalFooter>
            </ModalBody>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditProfile;
