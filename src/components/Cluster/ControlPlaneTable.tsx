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
import CreateControlPlaneForm from "./CreateControlPlaneForm";
import {DeleteIcon, EditIcon, RepeatIcon, ViewIcon} from "@chakra-ui/icons";
import {useDeleteControlPlaneMutation} from "../../services/controlPlane.service";

interface ControlPlaneTableProps {
    controlPlanes: any[];
    isLoading: boolean;
    onRefresh: () => void;
    onView: (id: string) => void;
}

export default function ControlPlaneTable(props: ControlPlaneTableProps) {
    const [deleteControlPlane] = useDeleteControlPlaneMutation()
    const toast = useToast();

    const handleDelete = (id: number) => {
        deleteControlPlane(String(id))
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
        <TableContainer>
            <Heading
                textAlign={"center"}
                className="text-blue-900 dark:text:text-white">
                Control Plane Data
            </Heading>
            <Box display={"flex"} gap={2}>
                <CreateControlPlaneForm ButtonText="Create Control Plane"/>
                <IconButton
                    onClick={props.onRefresh}
                    aria-label="Refresh"
                    icon={<RepeatIcon className="text-blue-900"/>}
                    className="text-blue-900 dark:text-white "
                    variant={"ghost"}
                    _hover={{}}
                    p={3}
                />
            </Box>

            <Table variant="simple" size={{base: "sm", md: "md"}}>
                <TableCaption>All Control Plane Details are here</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Region</Th>
                        <Th>status</Th>
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
                        props.controlPlanes.map((item: any) => {
                            return (
                                <Tr key={item.id}>
                                    <Td fontWeight={"medium"}>{item.id}</Td>
                                    <Td fontWeight={"bold"}>{item.name}</Td>
                                    <Td>{item.region}</Td>
                                    <Td>
                                        {" "}
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
                                            onClick={()=>handleDelete(item.id)}
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
