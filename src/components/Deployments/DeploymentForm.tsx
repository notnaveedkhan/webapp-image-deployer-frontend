import { useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useDisclosure,
  Select,
  useToast,
  Heading,
  IconButton,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetAllControlPlaneQuery } from "../../services/controlPlane.service";
import { useCreateDeploymentMutation } from "../../services/deploment.service";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import EnvModal from "./EnvModal";

export default function DeploymentForm() {
  const toast = useToast();
  const [controlPlane, setControlPlane] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isSuccess } = useGetAllControlPlaneQuery();
  const [createDeployment] = useCreateDeploymentMutation();

  useEffect(() => {
    if (isSuccess) {
      setControlPlane(data);
    }
  }, [data]);
  const Formik = useFormik({
    initialValues: {
      deploymentName: "",
      container: [
        {
          name: "",
          image: "",
          containerPort: 0,
          env: {},
        },
      ],
      replicas: 0,
      controlPlane: 0,
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      createDeployment({
        name: values.deploymentName,
        replicas: values.replicas,
        controlPlane: values.controlPlane,
        containers: values.container,
      })
        .then((res: any) => {
          if (res.data) {
            toast({
              title: "Success",
              description: res.data.message,
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
              variant: "left-accent",
            });
          }
          if (res.error) {
            toast({
              title: "Error",
              description: res.error.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
              variant: "left-accent",
            });
          }
        })
        .catch((err: any) => console.log(err));
    },
    validationSchema: Yup.object({
      deploymentName: Yup.string().required("Required"),
      replicas: Yup.number().required("Required"),
      controlPlane: Yup.number().required("Required"),
      container: Yup.array().of(
        Yup.object({
          name: Yup.string().required("Required"),
          image: Yup.string().required("Required"),
          containerPort: Yup.number().required("Required"),
          env: Yup.object().nullable(),
        })
      ),
    }),
  });

  const handelAddContainer = () => {
    Formik.setFieldValue("container", [
      ...Formik.values.container,
      {
        name: "",
        image: "",
        containerPort: 0,
        env: {},
      },
    ]);
  };

  const handleRemoveContainer = (index: number) => {
    const newContainer = [...Formik.values.container];
    newContainer.splice(index, 1);
    Formik.setFieldValue("container", newContainer);
  };

  const handleAddEnvVariable = (
    key: string,
    value: string,
    currentContainerIndex: number
  ) => {
    Formik.setFieldValue(
      `container.${currentContainerIndex}.env.${key}`,
      value
    );
  };

  return (
    <Box p={4}>
      <form onSubmit={Formik.handleSubmit}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={4}
          flexWrap="wrap">
          <FormControl
            w={{ base: "100%", md: "30%" }}
            minH={"100px"}
            my={2}
            isInvalid={
              !!(Formik.touched.deploymentName && Formik.errors.deploymentName)
            }>
            <FormLabel>Name</FormLabel>
            <Input
              borderColor={"gray.500"}
              focusBorderColor="blue.500"
              type={"text"}
              {...Formik.getFieldProps("deploymentName")}
            />
            <FormErrorMessage>{Formik.errors.deploymentName}</FormErrorMessage>
          </FormControl>
          <FormControl
            my={2}
            w={{ base: "100%", md: "30%" }}
            minH={"100px"}
            isInvalid={!!(Formik.touched.replicas && Formik.errors.replicas)}>
            <FormLabel>Replicas</FormLabel>
            <Input
              borderColor={"gray.500"}
              focusBorderColor="blue.500"
              type={"number"}
              {...Formik.getFieldProps("replicas")}
            />
            <FormErrorMessage>{Formik.errors.replicas}</FormErrorMessage>
          </FormControl>
          <FormControl
            my={2}
            w={{ base: "100%", md: "30%" }}
            minH={"100px"}
            isInvalid={
              !!(Formik.touched.controlPlane && Formik.errors.controlPlane)
            }>
            <FormLabel>Cluster</FormLabel>
            <Select
              {...Formik.getFieldProps("controlPlane")}
              placeholder="Select Cluster"
              borderColor={"gray.500"}
              focusBorderColor="blue.500">
              {controlPlane.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <Box
            w={"85%"}
            mx={"auto"}
            display={"flex"}
            alignItems={"center"}
            gap={4}>
            <Heading className="text-2xl text-blue-900" as="h2" size="lg">
              Containers
            </Heading>
            <IconButton
              onClick={handelAddContainer}
              size={"sm"}
              aria-label="Add"
              icon={<AddIcon />}
            />
          </Box>
        </Box>

        <Divider borderColor={"gray.500"} my={4} w={"85%"} mx={"auto"} />

        <VStack w={"90%"}>
          {Formik.values.container?.map((item, index) => {
            return (
              <Box
                key={index}
                w={"90%"}
                mx={"auto"}
                display={"flex"}
                flexWrap="wrap"
                gap={4}
                alignItems={"center"}>
                <Box
                  minW={"30px"}
                  display={"flex"}
                  alignItems={"flex-end"}
                  minH={"30px"}>
                  {index !== 0 && (
                    <IconButton
                      aria-label="remove"
                      icon={<MinusIcon />}
                      colorScheme="red"
                      size="xs"
                      alignSelf={"flex-end"}
                      onClick={() => handleRemoveContainer(index)}
                    />
                  )}
                </Box>
                <FormControl flex={1}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    borderColor={"gray.500"}
                    focusBorderColor="blue.500"
                    type={"text"}
                    {...Formik.getFieldProps(`container[${index}].name`)}
                  />
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel>Image</FormLabel>
                  <Input
                    borderColor={"gray.500"}
                    focusBorderColor="blue.500"
                    type={"text"}
                    {...Formik.getFieldProps(`container[${index}].image`)}
                  />
                  {/* <FormErrorMessage>{Formik.errors.container}</FormErrorMessage> */}
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel>Container Port</FormLabel>
                  <Input
                    type={"number"}
                    borderColor={"gray.500"}
                    focusBorderColor="blue.500"
                    {...Formik.getFieldProps(
                      `container[${index}].containerPort`
                    )}
                  />
                  {/* <FormErrorMessage>{Formik.errors.container}</FormErrorMessage> */}
                </FormControl>
                <EnvModal
                  container={item}
                  index={index}
                  addEnv={handleAddEnvVariable}>
                  <button className="bg-blue-500 self-end hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Env
                  </button>
                </EnvModal>
              </Box>
            );
          })}
        </VStack>

        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          gap={3}
          mt={8}>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </Box>
      </form>
    </Box>
  );
}
