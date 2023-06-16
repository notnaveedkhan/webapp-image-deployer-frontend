import {
    Button,
    FormControl, FormErrorMessage, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select, useDisclosure, useToast
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {useAddNodeGroupMutation,NodeGroup} from "../../services/nodeGroup.service"
import {useGetAllRegionsQuery} from '../../services/region.service'
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";

interface Props {
    ButtonText: string
    controlPlane: any[]
}

export default function CreateNodeGroupForm(props: Props) {
    const toast = useToast();
    const [controlPlane, setControlPlane] = useState<any[]>([]);
    const [addNodeGroup]=useAddNodeGroupMutation();
    const { data } = useGetAllRegionsQuery({});
    const [region, setRegion]=useState<string>("");
    const {isOpen, onOpen, onClose} = useDisclosure();
    const Formik = useFormik({
        initialValues: {
            nodeGroupName: "",
            controlPlane: "",
            instanceTypes: "",
            maxSize: "",
            minSize: "",
            desiredSize: "",
            volumeSize: "",
            imageId: "",
        },
        onSubmit:(values,actions) => {
            const SelectedRegion:any = data.find((r: any) => r.region === region)
            const regionId = SelectedRegion.id;
            const newNodeGroup: NodeGroup = {
                nodeGroupName: values.nodeGroupName,
                controlPlane: parseInt(values.controlPlane),
                nodeInstanceType: values.instanceTypes,
                nodeGroupMaxSize: parseInt(values.maxSize),
                nodeGroupMinSize: parseInt(values.minSize),
                nodeImageId: values.imageId,
                nodeVolumeSize: parseInt(values.volumeSize),
                nodeGroupDesiredSize: parseInt(values.desiredSize),
                region: regionId,
            }
            console.log(newNodeGroup);
            addNodeGroup(newNodeGroup).then((response:any) => {
                if (response.data) {
                    actions.resetForm();
                    onClose();
                    toast({
                        title: "Node Successfully Created",
                        description: "Node Group Created Successfully",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                        position: "top",
                        icon:<CheckIcon/>
                    })
                }
                if (response.error) {
                    onClose();
                    toast({
                        title: "Node Creation Failed",
                        description: response.error.data.message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                        position: "top",
                        icon:<WarningIcon/>
                    })
                }
            }).catch((error: any) => {
                console.log(error);
            })
        },
        validationSchema:Yup.object({
            nodeGroupName:Yup.string().required("Node Group Name is required"),
            controlPlane:Yup.string().required("Control Plane is required"),
            instanceTypes:Yup.string().required("Instance Type is required"),
            maxSize:Yup.number().required("Max Size is required"),
            minSize:Yup.number().required("Min Size is required"),
            desiredSize:Yup.number().required("Desired Size is required"),
            volumeSize:Yup.number().required("Volume Size is required"),
            imageId:Yup.string().required("Image Id is required"),
        })
    });

    const handleChangeControlPlane=(event:any)=>{
        Formik.handleChange(event);
        const id=parseInt(event.target.value);
        const SelectedControlPlane:any = props.controlPlane.find((cp: any) => cp.id === id)
        setRegion(SelectedControlPlane.region);
    }

    const handleCancelForm = () => {
        onClose();
        Formik.resetForm();
        setRegion("");
    }

    useEffect(() => {
        // console.log(props.controlPlane)
        let newControlPlane: any[] = [];
        props.controlPlane?.forEach((cp:any )=> {
            if (cp.nodeGroups.length === 0 && cp.status==="CREATED") {
                newControlPlane.push(cp);
            }
        })
        setControlPlane(newControlPlane);
    },[props.controlPlane])
    return (
        <>
            <Button size={{base: 'sm', md: 'md'}} mb={3} onClick={onOpen} bgColor="blueviolet" _hover={{}}
                    color="white">{props.ButtonText}</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={{base: 'sm', md: '3xl'}}>
                <form onSubmit={Formik.handleSubmit}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader textAlign={"center"}>Create Node Group</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody display={"flex"} flexFlow={"wrap"} gap={3}>
                            <FormControl w={"45%"} my={1} isInvalid={!!(Formik.touched.nodeGroupName && (Formik.errors.nodeGroupName))} >
                                <FormLabel>Node Group Name</FormLabel>
                                <Input  {...Formik.getFieldProps('nodeGroupName')}  placeholder={'Node Group Name'}/>
                                <FormErrorMessage>{Formik.errors.nodeGroupName}</FormErrorMessage>
                            </FormControl>
                            <FormControl w={"45%"} my={1} isInvalid={!!(Formik.touched.controlPlane && (Formik.errors.controlPlane))} >
                                <FormLabel>Control Plane</FormLabel>
                                <Select name={"controlPlane"} onChange={handleChangeControlPlane} onBlur={Formik.handleBlur} placeholder='Control Plane'>
                                    {
                                        controlPlane.map((controlPlane: any) => {
                                            return <option key={controlPlane.id} value={controlPlane.id}>{controlPlane.name}</option>
                                        })
                                    }

                                </Select>
                            </FormControl>
                            <FormControl w={"45%"} my={1} isReadOnly={true} >
                                <FormLabel>Region</FormLabel>
                                <Input placeholder={'Region'} value={region}/>
                            </FormControl>
                            <FormControl w={"45%"} my={1}>
                                <FormLabel>Instance Type (hardCodded)</FormLabel>
                                <Select {...Formik.getFieldProps('instanceTypes')} placeholder='Instance Type'>
                                    <option value='t3.small'>t3.small</option>
                                </Select>
                            </FormControl>
                            <FormControl w={"45%"} my={1} isInvalid={!!(Formik.touched.maxSize && (Formik.errors.maxSize))}>
                                <FormLabel>Max Size</FormLabel>
                                <Input {...Formik.getFieldProps('maxSize')} type={'number'} placeholder={'Max Size'}/>
                                <FormErrorMessage>{Formik.errors.maxSize}</FormErrorMessage>
                            </FormControl>
                            <FormControl w={"45%"} my={1} isInvalid={!!(Formik.touched.minSize && (Formik.errors.minSize))}>
                                <FormLabel>Min Size</FormLabel>
                                <Input {...Formik.getFieldProps('minSize')} type={'number'} placeholder={'Min Size'}/>
                                <FormErrorMessage>{Formik.errors.minSize}</FormErrorMessage>
                            </FormControl>
                            <FormControl w={"45%"} my={1} isInvalid={!!(Formik.touched.desiredSize && (Formik.errors.desiredSize))}>
                                <FormLabel>Desired Size</FormLabel>
                                <Input {...Formik.getFieldProps('desiredSize')} type={'number'} placeholder={'Desired Size'}/>
                                <FormErrorMessage>{Formik.errors.desiredSize}</FormErrorMessage>
                            </FormControl>
                            <FormControl w={"45%"} my={1} isInvalid={!!(Formik.touched.volumeSize && (Formik.errors.volumeSize))}>
                                <FormLabel>Volume Size</FormLabel>
                                <Input {...Formik.getFieldProps('volumeSize')} type={'number'} placeholder={'Volume Size'}/>
                                <FormErrorMessage>{Formik.errors.volumeSize}</FormErrorMessage>
                            </FormControl>
                            <FormControl w={"45%"} my={1} isInvalid={!!(Formik.touched.imageId && (Formik.errors.imageId))}>
                                <FormLabel>Image ID(hardCodded)</FormLabel>
                                <Select {...Formik.getFieldProps('imageId')} placeholder='Image ID'>
                                    <option value='resolve:ssm:/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2'>resolve:ssm:/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2</option>
                                </Select>
                                <FormErrorMessage>{Formik.errors.imageId}</FormErrorMessage>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button type={"submit"} colorScheme='blue' mr={3}>
                                Create
                            </Button>
                            <Button variant='ghost' onClick={handleCancelForm}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};
