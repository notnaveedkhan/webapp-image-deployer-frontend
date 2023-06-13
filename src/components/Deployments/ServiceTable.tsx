import { DeleteIcon, EditIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons";
import {  Box, Button, Heading, IconButton, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead,Tr } from "@chakra-ui/react";




export default function ServiceTable() {
  return (
    <TableContainer mt={5}  >
                      <Heading textAlign={'center'} mb={3}>Service Data</Heading>  
                      <Box display={'flex'} gap={2}>
                                <Button size={{base: 'sm', md: 'md'}} mb={3}  bgColor="blueviolet" _hover={{}}
                                                        color="white">Create Service</Button>
                        <IconButton  aria-label="Refresh" icon={<RepeatIcon color={"blueviolet"} />} borderColor="blueviolet"   variant="outline" p={3} />
                      </Box>
                      <Table variant='simple' size={{ base: "sm", md: "md" }} >
                          <TableCaption>Service Data</TableCaption>
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
