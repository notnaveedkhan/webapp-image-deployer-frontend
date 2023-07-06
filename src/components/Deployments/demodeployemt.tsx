import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import * as Yup from "yup";

interface Container {
  name: string;
  image: string;
  port: number;
  env: {
    [key: string]: string;
  };
}

interface FormValues {
  deploymentName: string;
  containers: Container[];
  replicas: number;
  controlPlane: number;
}

const initialValues: FormValues = {
  deploymentName: "",
  containers: [
    {
      name: "",
      image: "",
      port: 0,
      env: {},
    },
  ],
  replicas: 0,
  controlPlane: 0,
};

const validationSchema = Yup.object({
  deploymentName: Yup.string().required("Required"),
  containers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      image: Yup.string().required("Required"),
      port: Yup.number().required("Required"),
      env: Yup.object().nullable(),
    })
  ),
  replicas: Yup.number().required("Required"),
  controlPlane: Yup.number().required("Required"),
});

const DeploymentDemoForm = () => {
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContainerIndex, setCurrentContainerIndex] = useState(0);

  const handleOpenModal = (index: number) => {
    setCurrentContainerIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddContainerEnvProperty = (key: string, value: string) => {
    formik.setFieldValue(
      `containers.${currentContainerIndex}.env.${key}`,
      value
    );
    handleCloseModal();
  };

  const { values, handleChange, handleSubmit, errors, touched } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        isInvalid={!!errors.deploymentName && !!touched.deploymentName}>
        <label htmlFor="deploymentName">Deployment Name:</label>
        <Input
          id="deploymentName"
          name="deploymentName"
          value={values.deploymentName}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.deploymentName}</FormErrorMessage>
      </FormControl>

      {values.containers.map((container, index) => (
        <div key={index}>
          <FormControl
          // isInvalid={
          //   !!errors.containers?.[index]?.name &&
          //   !!touched.containers?.[index]?.name
          // }
          >
            <label htmlFor={`containers.${index}.name`}>Container Name:</label>
            <Input
              id={`containers.${index}.name`}
              name={`containers.${index}.name`}
              value={container.name}
              onChange={handleChange}
            />
            <FormErrorMessage>
              {/* {errors.containers?.[index]?.name} */}
            </FormErrorMessage>
          </FormControl>

          <FormControl
          // isInvalid={
          //   !!errors.containers?.[index]?.image &&
          //   !!touched.containers?.[index]?.image
          // }
          >
            <label htmlFor={`containers.${index}.image`}>ContainerImage:</label>
            <Input
              id={`containers.${index}.image`}
              name={`containers.${index}.image`}
              value={container.image}
              onChange={handleChange}
            />
            <FormErrorMessage>
              {/* {errors.containers?.[index]?.image} */}
            </FormErrorMessage>
          </FormControl>

          <FormControl
          // isInvalid={
          //   !!errors.containers?.[index]?.port &&
          //   !!touched.containers?.[index]?.port
          // }
          >
            <label htmlFor={`containers.${index}.port`}>Container Port:</label>
            <Input
              id={`containers.${index}.port`}
              name={`containers.${index}.port`}
              value={container.port}
              onChange={handleChange}
            />
            <FormErrorMessage>
              {/* {errors.containers?.[index]?.port} */}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt={2}
            variant="outline"
            onClick={() => handleOpenModal(index)}
            leftIcon={<AddIcon />}>
            Add Environment Property
          </Button>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Environment Property</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={2}>
              {Object.keys(values.containers[currentContainerIndex].env).map(
                (key) => (
                  <FormControl
                    key={key}
                    // isInvalid={
                    //   !!errors.containers?.[currentContainerIndex]?.env?.[
                    //     key
                    //   ] &&
                    //   !!touched.containers?.[currentContainerIndex]?.env?.[key]
                    // }
                  >
                    <label
                      htmlFor={`containers.${currentContainerIndex}.env.${key}`}>
                      {key}:
                    </label>
                    <Input
                      id={`containers.${currentContainerIndex}.env.${key}`}
                      name={`containers.${currentContainerIndex}.env.${key}`}
                      value={values.containers[currentContainerIndex].env[key]}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>
                      {/* {errors.containers?.[currentContainerIndex]?.env?.[key]} */}
                    </FormErrorMessage>
                  </FormControl>
                )
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Button mt={4} colorScheme="teal" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default DeploymentDemoForm;
