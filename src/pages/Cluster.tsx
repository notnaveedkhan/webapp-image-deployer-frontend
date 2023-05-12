import { Box, Heading, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import CreateClusterForm from "../components/Cluster/CreateClusterForm";

export default function Cluster() {
  return (
      <Box>
      <Heading textAlign={"center"}>Cluster Managment</Heading>
      
      <Box mt={5} p={6}>
        <CreateClusterForm ButtonText="Create Cluster"/>
        <TableContainer>
  <Table variant='simple'>
    <TableCaption>All Cluster Details are  here</TableCaption>
    <Thead>
      <Tr>
        <Th>Cluster ID</Th>
        <Th>Name</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
     
    </Tbody>
  </Table>
</TableContainer>
      </Box>
      </Box>
  )
}
