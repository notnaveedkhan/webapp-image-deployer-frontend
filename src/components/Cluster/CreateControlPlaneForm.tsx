import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useDisclosure, useToast,
} from "@chakra-ui/react";
import {useGetAllRegionsQuery} from "../../services/region.service";
import {useLayoutEffect, useState} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import {useCreateControlPlaneMutation} from "../../services/controlPlane.service";

interface Props {
    ButtonText: string;
}

export default function CreateControlPlaneForm(props: Props) {
    const [createControlPlane] = useCreateControlPlaneMutation();
    const [countryName, setCountryName] = useState("");
    const [regionFieldError, setRegionFieldError] = useState(false);
    const [regionFieldTouched, setRegionFieldTouched] = useState(false);
    const [regionList, setRegionList] = useState([]);
    const {data, isSuccess} = useGetAllRegionsQuery({});
    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();
    useLayoutEffect(() => {
        if (isSuccess) {
            setRegionList(data);
        }
    }, [data, isSuccess]);

    const Formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: (values, actions) => {
            if (countryName.length > 0) {
                const region: any = regionList.filter(
                    (region: any) => region.name === countryName
                )[0];
                createControlPlane({
                    name: values.name,
                    region: region.id,
                })
                    .then((res: any) => {
                        actions.resetForm();
                        setRegionFieldError(false);
                        setRegionFieldTouched(false);
                        setCountryName("");
                        onClose();
                        console.log(res);
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
                    .catch((err: any) => {
                        console.log(err);
                        setRegionFieldError(true);
                        setRegionFieldTouched(true);
                    });
            }
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .required("Name is required")
                .max(20, "Only 20 Character Require for name"),
        }),
    });

    return (
        <>
            <button
                onClick={onOpen}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {props.ButtonText}
            </button>
            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <form onSubmit={Formik.handleSubmit}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader textAlign={"center"}>
                            Create Kubernetes Cluster
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl
                                isInvalid={!!(Formik.touched.name && Formik.errors.name)}>
                                <FormLabel>Cluster Name</FormLabel>
                                <Input type="text" {...Formik.getFieldProps("name")} />
                                <FormErrorMessage>{Formik.errors.name}</FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={
                                    regionFieldError ||
                                    (regionFieldTouched && countryName.length < 1)
                                }>
                                <FormLabel>Regions</FormLabel>
                                <Select
                                    onChange={(e) => setCountryName(e.target.value)}
                                    onBlur={() => setRegionFieldTouched(true)}
                                    placeholder="Select option"
                                    isInvalid={
                                        regionFieldError ||
                                        (regionFieldTouched && countryName.length < 1)
                                    }>
                                    {regionList.map((country: any, index) => {
                                        return (
                                            <option value={country.name} key={index}>
                                                {country.name}
                                            </option>
                                        );
                                    })}
                                </Select>
                                <FormErrorMessage>Region is required</FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type={"submit"} colorScheme="blue" mr={3}>
                                Create
                            </Button>
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}
