import {
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";

interface Props {
  children: React.ReactNode;
}

export default function CreateReportModal(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // onClose()
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      content: yup.string().required("Content is required"),
    }),
  });
  return (
    <>
      <span onClick={onOpen}>{props.children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={Formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Create Report</ModalHeader>
            <div className="p-5 mt-5">
              <FormControl
                isRequired
                isInvalid={
                  Formik.touched.title && Formik.errors.title ? true : false
                }>
                <Input
                  type={"text"}
                  {...Formik.getFieldProps("title")}
                  placeholder="Title"
                />
                <FormErrorMessage className="italic">
                  {Formik.errors.title}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                mt={3}
                isRequired
                isInvalid={
                  Formik.touched.content && Formik.errors.content ? true : false
                }>
                <Textarea
                  rows={5}
                  {...Formik.getFieldProps("content")}
                  placeholder="Content"
                />
                <FormErrorMessage className="italic">
                  {Formik.errors.content}
                </FormErrorMessage>
              </FormControl>
            </div>
            <ModalFooter className="gap-3">
              <button
                type="submit"
                className="bg-[#3b82f6] hover:bg-[#3b82f6] text-white font-bold py-2 px-4 rounded">
                Create
              </button>
              <button className="bg-[#f63b3b] hover:bg-[#f63b3b] text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
