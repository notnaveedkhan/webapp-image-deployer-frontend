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
  Tr,
} from "@chakra-ui/react";
import CreateControlPlaneForm from "./CreateControlPlaneForm";
import { DeleteIcon, EditIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons";

interface ControlPlaneTableProps {
  controlPlanes: any[];
  isLoading: boolean;
  onRefresh: () => void;
  onView: (id: string) => void;
}

export default function ControlPlaneTable(props: ControlPlaneTableProps) {
  return (
    <TableContainer>
      <Heading
        textAlign={"center"}
        className="text-blue-900 dark:text:text-white">
        Control Plane Data
      </Heading>
      <Box display={"flex"} gap={2}>
        <CreateControlPlaneForm ButtonText="Create Control Plane" />
        <IconButton
          onClick={props.onRefresh}
          aria-label="Refresh"
          icon={<RepeatIcon className="text-blue-900" />}
          className="text-blue-900 dark:text-white "
          variant={"ghost"}
          _hover={{}}
          p={3}
        />
      </Box>

      <Table variant="simple" size={{ base: "sm", md: "md" }}>
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
              <Spinner />
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
                      icon={<ViewIcon fontSize={"2xl"} />}
                      colorScheme={"green"}
                      aria-label="View"
                      border={"none"}
                      variant="link"
                      onClick={() => props.onView(item.id)}
                    />
                    <IconButton
                      icon={<DeleteIcon fontSize={"2xl"} />}
                      colorScheme={"red"}
                      aria-label="View"
                      border={"none"}
                      variant="link"
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
