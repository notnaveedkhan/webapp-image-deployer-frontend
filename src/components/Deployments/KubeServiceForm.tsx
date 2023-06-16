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
import {useCreateKubeServiceMutation} from '../../services/kubeService.service';

interface DeploymentFormProps {
    children: JSX.Element;
}


export default function KubeServiceForm(props: DeploymentFormProps) {
    const toast = useToast()
    const [createService] = useCreateKubeServiceMutation();
    const [controlPlane, setControlPlane] = useState<any[]>([])
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {data, isSuccess} = useGetAllControlPlaneQuery();
    useEffect(() => {
        if (isSuccess) {
            setControlPlane(data)
        }
    }, [data])
    const Formik = useFormik({
        initialValues: {
            name: "",
            targetPort: 0,
            controlPlane: 0
        },
        onSubmit: (values) => {
            createService({
                name: values.name,
                targetPort: values.targetPort,
                controlPlane: values.controlPlane
            }).then((res: any) => {
                if (res.data) {
                    toast({
                        title: "Success",
                        description: "Service created successfully",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });
                    onClose()
                }
                if (res.error) {
                    toast({
                        title: "Error",
                        description: res.error.data.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            targetPort: Yup.number().required("Required"),
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
                        <ModalHeader textAlign={"center"}>Create Kubernetes Service</ModalHeader>
                        <form onSubmit={Formik.handleSubmit}>
                            <Box>
                                <FormControl my={2} isInvalid={!!(Formik.touched.name && Formik.errors.name)}>
                                    <FormLabel>Name</FormLabel>
                                    <Input type={"text"} {...Formik.getFieldProps("name")} />
                                    <FormErrorMessage>{Formik.errors.name}</FormErrorMessage>
                                </FormControl>
                                <FormControl my={2}
                                             isInvalid={!!(Formik.touched.targetPort && Formik.errors.targetPort)}>
                                    <FormLabel>Target Port</FormLabel>
                                    <Input type={"number"} {...Formik.getFieldProps("targetPort")} />
                                    <FormErrorMessage>{Formik.errors.targetPort}</FormErrorMessage>
                                </FormControl>
                                <FormControl my={2}
                                             isInvalid={!!(Formik.touched.controlPlane && Formik.errors.controlPlane)}>
                                    <FormLabel>Cluster</FormLabel>
                                    <Select {...Formik.getFieldProps("controlPlane")} placeholder="Select Cluster">
                                        {controlPlane.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
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
