import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {  Heading, IconButton, Tab, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead,Tr } from "@chakra-ui/react";

export default function NamespaceTable() {
  return (
    <TableContainer maxW={'95%'} overflowX={'auto'} display={'flex'} flexDirection={'column'} 
                  justifyContent={'center'} alignItems={'center'}  >
                      <Heading textAlign={'center'} mb={3}>Namespace Data</Heading>  
                      
                      <Table variant='simple' size={{ base: "sm", md: "md" }} >
                          <TableCaption>Namespace Data</TableCaption>
                          <Thead>
                              <Tr>
                                  <Th>ID</Th>
                                  <Th>Name</Th>
                                  {/* <Th >Region</Th> */}
                                  <Th >Created At</Th>
                                  {/* <Th ></Th> */}
                                  <Th >Actions</Th>
                              </Tr>
                          </Thead>
                          <Tbody>
                             
                            <Tr>
                                <Td>1</Td>
                                <Td>Control Plane 1</Td>
                                {/* <Td >Region 1</Td> */}
                                <Td >12 Dec 2022</Td>
                                {/* <Td ></Td> */}

                                <Td>
                                    <IconButton aria-label="edit" size={{base:"sm",md:"md"}} colorScheme={"blue"} variant={"ghost"}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" size={{base:"sm",md:"md"}} colorScheme={"red"} variant={"ghost"}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="view" size={{base:"sm",md:"md"}} colorScheme={"green"} variant={"ghost"}>
                                        <ViewIcon />
                                    </IconButton>
                                </Td>
                             </Tr>
                          </Tbody>
                      </Table>
        </TableContainer>
  )
}
