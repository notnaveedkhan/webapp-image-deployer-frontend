import {DeleteIcon, RepeatIcon, ViewIcon} from "@chakra-ui/icons";
import {
    Badge,
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
    Tr,
    useToast,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {BsClipboard} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {
    DeploymentResponse,
    useDeleteDeploymentMutation,
    useGetAllDeploymentsQuery,
} from "../../services/deploment.service";
import DeploymentForm from "./DeploymentForm";

export default function DeploymentTable() {
    const navigate = useNavigate();
    const toast = useToast();
    const [deployment, setDeployment] = useState<DeploymentResponse[]>([]);
    const {data, isError, error, isSuccess, refetch} =
        useGetAllDeploymentsQuery();
    const [deleteDeployment] = useDeleteDeploymentMutation();
    useEffect(() => {
        if (isSuccess) {
            setDeployment(data);
        }
        if (isError) {
            console.log(error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleDelete = (id: number) => {
        deleteDeployment(String(id))
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

    const handleRefetch = () => {
        refetch().catch((err) => {
            console.log(err);
        });
    };

    const handleCopyUrl = (index: number) => {
        navigator.clipboard.writeText(deployment[index].url);
        toast({
            title: "Copied",
            description: "Endpoint is copied to clipboard",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
            variant: "left-accent",
        });

    };

    return (
        <TableContainer mt={5}>
            <Heading textAlign={"center"}>Kubernetes Deployment Data</Heading>
            <Box display={"flex"} gap={2}>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
                    onClick={() => navigate("/create-deployment")}>
                    Create Deployment
                </button>
                <IconButton
                    onClick={handleRefetch}
                    aria-label="Refresh"
                    icon={<RepeatIcon/>}
                    className="text-blue-900 dark:text-white"
                    _hover={{}}
                    variant="ghost"
                    p={3}
                />
            </Box>
            <Table variant="simple" size={{base: "sm", md: "md"}}>
                <TableCaption>All Kubernetes Deployment Details are here</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Status</Th>
                        <Th>Endpoint</Th>
                        <Th>Replicas</Th>
                        <Th>Created At</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {deployment.map((item: DeploymentResponse, index) => {
                        return (
                            <Tr key={item.id}>
                                <Td>{item.id}</Td>
                                <Td>{item.name}</Td>
                                <Td>
                                    <Badge
                                        colorScheme={
                                            item.status === "CREATED" ? "green" : "orange"
                                        }>
                                        {item.status}
                                    </Badge>
                                </Td>
                                <Td>
                                    {
                                        item.url ?
                                            <BsClipboard
                                                className={"cursor-pointer"}
                                                onClick={() => handleCopyUrl(index)}
                                            /> : 'NA'}
                                </Td>
                                <Td>{item.replicas}</Td>
                                <Td>{item.createdAt}</Td>
                                <Td>
                                    <IconButton
                                        icon={<ViewIcon fontSize={"2xl"}/>}
                                        colorScheme={"green"}
                                        aria-label="View"
                                        border={"none"}
                                        variant="link"
                                    />
                                    <IconButton
                                        icon={
                                            <DeleteIcon
                                                onClick={() => handleDelete(item.id)}
                                                fontSize={"2xl"}
                                            />
                                        }
                                        colorScheme={"red"}
                                        aria-label="View"
                                        border={"none"}
                                        variant="link"
                                    />
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
