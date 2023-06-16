import {useEffect, useState} from 'react';

import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Select,
    useToast
} from "@chakra-ui/react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useGetAllControlPlaneQuery} from "../../services/controlPlane.service";
import {useCreateDeploymentMutation} from '../../services/deploment.service';

interface DeploymentFormProps {
    children: JSX.Element;
}


export default function DeploymentForm(props: DeploymentFormProps) {
    const toast = useToast()
    const [controlPlane, setControlPlane] = useState<any[]>([])
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {data, isSuccess} = useGetAllControlPlaneQuery();
    const [createDeployment] = useCreateDeploymentMutation()
    useEffect(() => {
        if (isSuccess) {
            setControlPlane(data)
        }
    }, [data])
    const Formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            replicas: 0,
            port: 0,
            controlPlane: 0
        },
        onSubmit: (values) => {
            console.log(values)
            createDeployment(values).then((res: any) => {
                    if (res.data) {
                        toast({
                            title: "Success",
                            description: res.data.message,
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                            position: "top",
                            variant: "left-accent"
                        })
                    }
                    if (res.error) {
                        toast({
                            title: "Error",
                            description: res.error.data.message,
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                            position: "top",
                            variant: "left-accent"
                        })
                    }
                }
            ).catch((err: any) => console.log(err))
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            image: Yup.string().required("Required"),
            replicas: Yup.number().required("Required"),
            port: Yup.number().required("Required"),
            controlPlane: Yup.number().required("Required")
        })
    })
    return (
        <>
            <span onClick={onOpen}>{props.children}</span>
            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>

                <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton/>
                    <ModalBody>
                        <ModalHeader textAlign={"center"}>Create Kubernetes Deployment</ModalHeader>
                        <form onSubmit={Formik.handleSubmit}>
                            <Box>
                                <FormControl my={2} isInvalid={!!(Formik.touched.name && Formik.errors.name)}>
                                    <FormLabel>Name</FormLabel>
                                    <Input type={"text"} {...Formik.getFieldProps("name")} />
                                    <FormErrorMessage>{Formik.errors.name}</FormErrorMessage>
                                </FormControl>
                                <FormControl my={2} isInvalid={!!(Formik.touched.image && Formik.errors.image)}>
                                    <FormLabel>Docker Image</FormLabel>
                                    <Input type={"text"} {...Formik.getFieldProps("image")} />
                                    <FormErrorMessage>{Formik.errors.image}</FormErrorMessage>
                                </FormControl>
                                <FormControl my={2} isInvalid={!!(Formik.touched.port && Formik.errors.port)}>
                                    <FormLabel>Port</FormLabel>
                                    <Input type={"number"} {...Formik.getFieldProps("port")} />
                                    <FormErrorMessage>{Formik.errors.port}</FormErrorMessage>
                                </FormControl>
                                <FormControl my={2}
                                             isInvalid={!!(Formik.touched.replicas && Formik.errors.replicas)}>
                                    <FormLabel>Replicas</FormLabel>
                                    <Input type={"number"} {...Formik.getFieldProps("replicas")} />
                                    <FormErrorMessage>{Formik.errors.replicas}</FormErrorMessage>
                                </FormControl>
                                <FormControl my={2}
                                             isInvalid={!!(Formik.touched.controlPlane && Formik.errors.controlPlane)}>
                                    <FormLabel>Cluster</FormLabel>
                                    <Select {...Formik.getFieldProps("controlPlane")} placeholder="Select Cluster">
                                        {
                                            controlPlane.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }

                                    </Select>
                                </FormControl>
                            </Box>

                            <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} gap={3} mt={4}>
                                <Button type="submit" size={{base: 'sm', md: 'md'}} mb={3} bgColor="blueviolet"
                                        _hover={{}}
                                        color="white">Create</Button>
                                <Button size={{base: 'sm', md: 'md'}} mb={3} variant="outline"
                                        border={"blueviolet"}>Cancel</Button>
                            </Box>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
