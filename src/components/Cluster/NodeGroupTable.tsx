import {DeleteIcon, EditIcon, RepeatIcon, ViewIcon} from "@chakra-ui/icons"
import {
    Badge,
    Box,
    Center,
    Heading,
    IconButton,
    Spinner,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react"
import CreateNodeGroupForm from "./CreateNodeGroupForm"

interface NodeGroupProps {
    nodeGroup: any[];
    controlPlane: any[];
    isLoading: boolean;
    onRefresh: () => void;
}

export default function NodeGroupTable(props: NodeGroupProps) {

    console.log(props.controlPlane)
    return (
        <TableContainer mt={"5em"}>
            <Heading textAlign={"center"}>Node Group Data</Heading>

            <Box display={'flex'} gap={2}>
                <CreateNodeGroupForm ButtonText={"Create Node Group"} controlPlane={props?.controlPlane}/>
                <IconButton onClick={props.onRefresh} aria-label="Refresh" icon={<RepeatIcon color={"blueviolet"}/>}
                            borderColor="blueviolet" variant="outline" p={3}/>

            </Box>
            <Table variant='simple' size={{base: "sm", md: "md"}}>
                <TableCaption>All Node Group Table Details are here</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Instance Type</Th>
                        <Th>Max Size</Th>
                        <Th>Status</Th>
                        <Th>Created At</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        props.isLoading ? <Center><Spinner/></Center> : props.nodeGroup.map((item: any) => {
                            return <Tr key={item.id}>
                                <Td fontWeight={"medium"}>{item.id}</Td>
                                <Td fontWeight={"bold"}>{item.name}</Td>
                                <Td>{item.nodeInstanceType}</Td>
                                <Td>{item.nodeGroupMaxSize}</Td>
                                <Td><Badge
                                    colorScheme={item.status === 'ACTIVE' || item.status === 'CREATED' ? 'green' : 'red'}>{item.status}</Badge></Td>
                                <Td fontWeight={"light"}>{item.createdAt}</Td>
                                <Td>
                                    <IconButton icon={<ViewIcon fontSize={"2xl"}/>} colorScheme={'green'}
                                                aria-label='View' border={"none"} variant="link"/>
                                    <IconButton icon={<DeleteIcon fontSize={"2xl"}/>} colorScheme={'red'}
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
