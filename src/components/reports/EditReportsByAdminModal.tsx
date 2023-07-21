import {
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import {
  UpdateReportBody,
  useUpdateReportMutation,
} from "../../services/report.service";
import * as yup from "yup";

interface Props {
  children: React.ReactNode;
  id: number;
  status: "PENDING" | "CLOSED";
}

const EditReportsByAdminModal: React.FC<Props> = ({ children, id, status }) => {
  const toast = useToast();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [updateReport] = useUpdateReportMutation();
  const Formik = useFormik<UpdateReportBody>({
    initialValues: {
      report: id,
      status,
      response: "",
    },
    onSubmit: (values, action) => {
      updateReport(values).then((res: any) => {
        onClose();
        if (res.data) {
          Formik.resetForm();
          toast({
            title: "Report Updated",
            description: res.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
        if (res.error) {
          toast({
            title: "Error",
            description: res.error.data?.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    },
    validationSchema: yup.object({
      response: yup.string().required("Required"),
    }),
  });

  const handleCancel = () => {
    onClose();
    Formik.resetForm();
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={handleCancel}>
        <ModalOverlay />
        <form onSubmit={Formik.handleSubmit}>
          <ModalContent>
            <ModalBody>
              <ModalHeader>Edit Report</ModalHeader>
              <div className="flex flex-col gap-3">
                <FormControl
                  isInvalid={!!(Formik.touched.status && Formik.errors.status)}>
                  <Select {...Formik.getFieldProps("status")}>
                    <option value="PENDING">Pending</option>
                    <option value="CLOSED">Closed</option>
                  </Select>
                  <FormErrorMessage>{Formik.errors.status}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    !!(Formik.touched.response && Formik.errors.response)
                  }>
                  <Textarea
                    {...Formik.getFieldProps("response")}
                    placeholder="Response"
                  />
                  <FormErrorMessage>{Formik.errors.response}</FormErrorMessage>
                </FormControl>
              </div>

              <ModalFooter className="gap-3">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  type="submit">
                  Edit
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  type="button">
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

export default EditReportsByAdminModal;
