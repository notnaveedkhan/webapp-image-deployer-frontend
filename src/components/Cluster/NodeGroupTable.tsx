import {DeleteIcon, RepeatIcon} from "@chakra-ui/icons";
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
    Tr, useToast,
} from "@chakra-ui/react";
import CreateNodeGroupForm from "./CreateNodeGroupForm";
import {useDeleteNodeGroupMutation} from "../../services/nodeGroup.service";

interface NodeGroupProps {
    nodeGroup: any[];
    controlPlane: any[];
    isLoading: boolean;
    onRefresh: () => void;
}

export default function NodeGroupTable(props: NodeGroupProps) {
    const [deleteNodeGroup] = useDeleteNodeGroupMutation()
    const toast = useToast();
    console.log(props.controlPlane);

    const handleDelete = (id: number) => {
        deleteNodeGroup(String(id))
            .then((res: any) => {
                if (res.data) {
                    toast({
                        title: "Success",
                        description: res.data.message,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                        variant: "left-accent",
                    });
                }
                if (res.error) {
                    console.log(res.error);
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
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <TableContainer mt={"5em"}>
            <Heading textAlign={"center"} className="text-blue-900 dark:text-white">
                Node Group Data
            </Heading>

            <Box display={"flex"} gap={2}>
                <CreateNodeGroupForm
                    ButtonText={"Create Node Group"}
                    controlPlane={props?.controlPlane}
                />
                <IconButton
                    onClick={props.onRefresh}
                    aria-label="Refresh"
                    icon={<RepeatIcon/>}
                    variant="ghost"
                    _hover={{}}
                />
            </Box>
            <Table variant="simple" size={{base: "sm", md: "md"}}>
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
                    {props.isLoading ? (
                        <Center>
                            <Spinner/>
                        </Center>
                    ) : (
                        props.nodeGroup.map((item: any) => {
                            return (
                                <Tr key={item.id}>
                                    <Td fontWeight={"medium"}>{item.id}</Td>
                                    <Td fontWeight={"bold"}>{item.name}</Td>
                                    <Td>{item.nodeInstanceType}</Td>
                                    <Td>{item.nodeGroupMaxSize}</Td>
                                    <Td>
                                        <Badge
                                            colorScheme={
                                                item.status === "ACTIVE" || item.status === "CREATED"
                                                    ? "green"
                                                    : "red"
                                            }>
                                            {item.status}
                                        </Badge>
                                    </Td>
                                    <Td fontWeight={"light"}>{item.createdAt}</Td>
                                    <Td>
                                        <IconButton
                                            icon={<DeleteIcon fontSize={"2xl"}/>}
                                            colorScheme={"red"}
                                            aria-label="View"
                                            border={"none"}
                                            variant="link"
                                            onClick={() => handleDelete(item.id)}
                                        />
                                    </Td>
                                </Tr>
                            );
                        })
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
