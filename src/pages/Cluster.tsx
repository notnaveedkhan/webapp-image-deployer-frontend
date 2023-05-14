import {Box, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import CreateClusterForm from "../components/Cluster/CreateClusterForm";
import {DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";
import {useGetAllControlPlaneQuery} from "../services/controlPlane.service";
import {useEffect, useState} from "react";

export default function Cluster() {
    const [constrolPlane,setControlPlane]=useState<any[]>([]);
    const {data,isSuccess}=useGetAllControlPlaneQuery({});
    useEffect(()=>{
        if (isSuccess){
            setControlPlane(data)
        }
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ,[isSuccess])
  return (
      <Box>
        <Heading textAlign={"center"}>Cluster Management</Heading>
      <Box mt={5} p={6}>

            <TableContainer>
                <Heading textAlign={'center'}>Control Plane Data</Heading>
                <CreateClusterForm ButtonText="Create Control Plane"/>
                <Table variant='simple' size={{base:"sm",md:"md"}} >
                    <TableCaption>All Control Plane Details are  here</TableCaption>
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
                            {
                                constrolPlane.map((item:any)=>{
                                    return <Tr key={item.id}>

                                        <Td>{item.id}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.region}</Td>
                                        <Td>{item.status}</Td>
                                        <Td>{item.createdAt}</Td>
                                        <Td>
                                            <ViewIcon cursor={'pointer'} mx={1} color={"green"} fontSize={"2xl"}  _hover={{textDecoration:"underline"}}/>
                                            <EditIcon cursor={'pointer'} mx={1} color={"orange"}  fontSize={"2xl"} _hover={{textDecoration:"underline"}}/>
                                            <DeleteIcon cursor={'pointer'} mx={1} color={"red"} fontSize={"2xl"}  _hover={{}}/>
                                        </Td>
                                    </Tr>
                                })
                            }

                        </Tbody>
                </Table>
            </TableContainer>
          <TableContainer mt={"5em"}>
              <Heading textAlign={"center"}>Node Group Data</Heading>
              <Table variant='simple' size={{base:"sm",md:"md"}} >
                  <TableCaption>All Node Group Table Details are  here</TableCaption>
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
                      {
                          constrolPlane.map((item:any)=>{
                              return <Tr key={item.id}>

                                  <Td>{item.id}</Td>
                                  <Td>{item.name}</Td>
                                  <Td>{item.region}</Td>
                                  <Td>{item.status}</Td>
                                  <Td>{item.createdAt}</Td>
                                  <Td>
                                      <ViewIcon cursor={'pointer'} mx={1} color={"green"} fontSize={"2xl"}  _hover={{textDecoration:"underline"}}/>
                                      <EditIcon cursor={'pointer'} mx={1} color={"orange"}  fontSize={"2xl"} _hover={{textDecoration:"underline"}}/>
                                      <DeleteIcon cursor={'pointer'} mx={1} color={"red"} fontSize={"2xl"}  _hover={{}}/>
                                  </Td>
                              </Tr>
                          })
                      }

                  </Tbody>
              </Table>
          </TableContainer>
          </Box>
      </Box>
  )
}
