import {Box, Button, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import CreateClusterForm from "../components/Cluster/CreateClusterForm";
import {DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";

export default function Cluster() {
  return (
      <Box>
        <Heading textAlign={"center"}>Cluster Management</Heading>
      
      <Box mt={5} p={6}>
            <CreateClusterForm ButtonText="Create Cluster"/>
            <TableContainer>
                <Table variant='simple' size={{base:"sm",md:"md"}} >
                    <TableCaption>All Cluster Details are  here</TableCaption>
                        <Thead>
                          <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th >Region</Th>
                              <Th >status</Th>
                              <Th >Created At</Th>
                              <Th >Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                              <Td>1</Td>
                              <Td>Cluster 1</Td>
                              <Td>us-east-1</Td>
                              <Td>Active</Td>
                              <Td>2022-01-01</Td>
                              <Td gap={3}>
                                  <ViewIcon cursor={'pointer'} mx={1} color={"green"} fontSize={"2xl"}  _hover={{textDecoration:"underline"}}/>
                                  <EditIcon cursor={'pointer'} mx={1} color={"orange"}  fontSize={"2xl"} _hover={{textDecoration:"underline"}}/>
                                  <DeleteIcon cursor={'pointer'} mx={1} color={"red"} fontSize={"2xl"}  _hover={{textDecoration:"underline"}}/>
                              </Td>
                          </Tr>
                        </Tbody>
                </Table>
            </TableContainer>
          </Box>
      </Box>
  )
}
