import {DeleteIcon, EditIcon, RepeatIcon, ViewIcon} from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    IconButton,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import KubeServiceForm from "./KbueServiceForm";

import {useState, useEffect} from "react";
import {useAllKbueServiceQuery} from "../../services/kubeService.service";


export default function ServiceTable() {

    const [services, setServices] = useState([])
    const {data, isSuccess, isLoading, isError, error} = useAllKbueServiceQuery();
    useEffect(() => {
        if (isSuccess) {
            setServices(data)
            console.log(data)

        }
    }, [data])

    return (
        <TableContainer mt={5}>
            <Heading textAlign={'center'} mb={3}>Service Data</Heading>
            <Box display={'flex'} gap={2}>
                <KubeServiceForm>
                    <Button size={{base: 'sm', md: 'md'}} mb={3} bgColor="blueviolet" _hover={{}}
                            color="white">Create Service</Button></KubeServiceForm>
                <IconButton aria-label="Refresh" icon={<RepeatIcon color={"blueviolet"}/>} borderColor="blueviolet"
                            variant="outline" p={3}/>
            </Box>
            <Table variant='simple' size={{base: "sm", md: "md"}}>
                <TableCaption>Service Data</TableCaption>
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
                                <Td>{service.url === null ? "Not Available" : service.url}</Td>
                                <Td>{service.createdAt}</Td>

                                <Td>
                                    <IconButton icon={<ViewIcon fontSize={"2xl"} />} colorScheme={'green'} aria-label='View' border={"none"} variant="link"/>
                                    <IconButton icon={<DeleteIcon fontSize={"2xl"} />} colorScheme={'red'} aria-label='View' border={"none"} variant="link"/>
                                </Td>
                            </Tr>
                        })
                    }

                </Tbody>
            </Table>
        </TableContainer>
    )
}
