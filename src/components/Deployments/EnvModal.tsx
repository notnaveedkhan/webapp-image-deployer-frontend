import { MinusIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  ModalHeader,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  ModalFooter,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  children: JSX.Element;
  container: any;
  index: number;
  addEnv(key: string, value: string, index: number): void;
}

interface Env {
  key: string;
  value: string;
}

interface FormValues {
  env: Env[];
}

export default function EnvModal(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues: FormValues = {
    env: [
      {
        key: "",
        value: "",
      },
    ],
  };

  const Formik = useFormik<FormValues>({
    initialValues,
    onSubmit: (values) => {
      values.env.forEach((env: any) => {
        props.addEnv(env.key, env.value, props.index);
      });
      onClose();
    },
    validationSchema: Yup.object({
      env: Yup.array()
        .of(
          Yup.object().shape({
            key: Yup.string().required(),
            value: Yup.string().required(),
          })
        )
        .test("unique", "Environment Variable must be unique", (values) => {
          return values?.every((value: any) => {
            return value.key !== "" && value.value !== "";
          });
        }),
    }),
  });

  const handelEnvField = () => {
    Formik.setFieldValue("env", [
      ...Formik.values.env,
      {
        key: "",
        value: "",
      },
    ]);
  };

  const handelClose = () => {
    onClose();
    Formik.resetForm();
  };

  const handelRemoveField = (index: number) => {
    Formik.values.env.splice(index, 1);
    Formik.setFieldValue("env", [...Formik.values.env]);
  };

  const { errors } = Formik;

  return (
    <>
      <span
        style={{ alignSelf: "flex-end", cursor: "pointer" }}
        onClick={onOpen}>
        {props.children}
      </span>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <form onSubmit={Formik.handleSubmit}>
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <ModalHeader>Environment Variables</ModalHeader>
              <Button onClick={handelEnvField}>Add Environment Variable</Button>
              {Formik.values.env.map((env: any, index: number) => {
                return (
                  <Box
                    display="flex"
                    gap={2}
                    mt="2"
                    flexWrap="wrap"
                    key={index}>
                    <Box minW={"30px"} minH={"30px"} alignSelf={"flex-end"}>
                      {index !== 0 && (
                        <IconButton
                          aria-label="remove"
                          icon={<MinusIcon />}
                          colorScheme="red"
                          size="xs"
                          alignSelf={"flex-end"}
                          onClick={() => handelRemoveField(index)}
                        />
                      )}
                    </Box>
                    <FormControl flex={1}>
                      <FormLabel>Key</FormLabel>
                      <Input
                        type={"text"}
                        {...Formik.getFieldProps(`env.${index}.key`)}
                      />
                    </FormControl>
                    <FormControl flex={1}>
                      <FormLabel>Value</FormLabel>
                      <Input
                        type={"text"}
                        {...Formik.getFieldProps(`env.${index}.value`)}
                      />
                    </FormControl>
                  </Box>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handelClose}
                variant="outline">
                Close
              </Button>
              <Button type="submit" colorScheme="blue">
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
