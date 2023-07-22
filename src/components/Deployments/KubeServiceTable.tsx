import {CheckIcon, DeleteIcon, ExternalLinkIcon, RepeatIcon, ViewIcon, WarningIcon} from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    IconButton, Link,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr, useDisclosure,
    useToast
} from "@chakra-ui/react";
import KubeServiceForm from "./KubeServiceForm";

import {useState, useEffect} from "react";
import {
    useAllKubeServiceQuery,
    useDeleteKubeServiceMutation
} from "../../services/kubeService.service";


export default function KubeServiceTable() {

    const toast = useToast()
    const [services, setServices] = useState([])
    const [deleteKubeService] = useDeleteKubeServiceMutation()
    const {onClose} = useDisclosure();
    const {data, isSuccess, isLoading, isError, error} = useAllKubeServiceQuery();
    useEffect(() => {
        if (isSuccess) {
            setServices(data)
            console.log(data)
        }
    }, [data])

    const handleDelete = (id: string) => {
        deleteKubeService(id)
            .then((res: any) => {
                    if (res.data) {
                        onClose();
                        toast({
                            title: "Success",
                            description: data.message,
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                            position: "top",
                            variant: "left-accent",
                            icon: <CheckIcon/>
                        })
                    }
                    if (res.error) {
                        onClose();
                        toast({
                            title: "Error",
                            description: res.error.data.message,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                            position: "top",
                            variant: "left-accent",
                            icon: <WarningIcon/>
                        })
                    }
                }
            ).catch((err) => {
            console.log(err)
        })
    }

    return (
        <TableContainer>
            <Heading textAlign={'center'}>Kubernetes Service Data</Heading>
            <Box display={'flex'} gap={2}>
                <KubeServiceForm>
                    <Button size={{base: 'sm', md: 'md'}} mb={3} bgColor="blueviolet" _hover={{}}
                            color="white">Create Service</Button></KubeServiceForm>
                <IconButton aria-label="Refresh" icon={<RepeatIcon color={"blueviolet"}/>} borderColor="blueviolet"
                            variant="outline" p={3}/>
            </Box>
            <Table variant='simple' size={{base: "sm", md: "md"}}>
                <TableCaption>All Kubernetes Service Details are here</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Port</Th>
                        <Th>target Port</Th>
                        <Th>url</Th>
                        <Th>Created At</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        services.map((service: any) => {
                            return <Tr key={service.id}>
                                <Td>{service.id}</Td>
                                <Td>{service.name}</Td>
                                <Td>{service.port}</Td>
                                <Td>{service.targetPort}</Td>
                                <Td>
                                    <Link href={service.url} isExternal>
                                        Link <ExternalLinkIcon mx='2px'/>
                                    </Link>
                                </Td>
                                <Td>{service.createdAt}</Td>

                                <Td>
                                    <IconButton icon={<ViewIcon fontSize={"2xl"}/>} colorScheme={'green'}
                                                aria-label='View' border={"none"} variant="link"/>
                                    <IconButton onClick={() => handleDelete(service.id)}
                                                icon={<DeleteIcon fontSize={"2xl"}/>} colorScheme={'red'}
                                                aria-label='View' border={"none"} variant="link"/>
                                </Td>
                            </Tr>
                        })
                    }

                </Tbody>
            </Table>
        </TableContainer>
    )
}
