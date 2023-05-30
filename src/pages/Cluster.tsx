import {Box, Center, Heading, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import CreateControlPlaneForm from "../components/Cluster/CreateControlPlaneForm";
import {DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";
import {useGetAllControlPlaneQuery} from "../services/controlPlane.service";
import {useEffect, useState} from "react";
import CreateNodeGroupForm from "../components/Cluster/CreateNodeGroupForm";
import { useGetNodeGroupsQuery } from "../services/nodeGroup.service";

export default function Cluster() {
    const [controlPlane, setControlPlane] = useState<any[]>([]);
    const [nodeGroup, setNodeGroup] = useState<any[]>([]);
    const { data: controlPlaneData, isSuccess: controlPlaneDataSuccess, isLoading: controlPlaneDataLoading } = useGetAllControlPlaneQuery({});
    const {data:nodeGroupData,isSuccess:nodeGroupDataSuccess,isLoading:nodeGroupDataLoading } = useGetNodeGroupsQuery();
    useEffect(() => {
        if (controlPlaneDataSuccess && nodeGroupDataSuccess) {
            setControlPlane(controlPlaneData);
            setNodeGroup(nodeGroupData);
        }
    }      // eslint-disable-next-line react-hooks/exhaustive-deps
    ,[controlPlaneData, nodeGroupData])
  return (
      <Box>
        <Heading textAlign={"center"}>Cluster Management</Heading>
          <Box mt={5} p={6}>
              {controlPlaneDataLoading ?<Center><Spinner/></Center> :
                  <TableContainer>
                      <Heading textAlign={'center'}>Control Plane Data</Heading>
                      <CreateControlPlaneForm ButtonText="Create Control Plane" />
                      <Table variant='simple' size={{ base: "sm", md: "md" }} >
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
                                  controlPlane.map((item: any) => {
                                      return <Tr key={item.id}>

                                          <Td>{item.id}</Td>
                                          <Td>{item.name}</Td>
                                          <Td>{item.region}</Td>
                                          <Td>{item.status}</Td>
                                          <Td>{item.createdAt}</Td>
                                          <Td>
                                              <ViewIcon cursor={'pointer'} mx={1} color={"green"} fontSize={"2xl"} _hover={{ textDecoration: "underline" }} />
                                              <EditIcon cursor={'pointer'} mx={1} color={"orange"} fontSize={"2xl"} _hover={{ textDecoration: "underline" }} />
                                              <DeleteIcon cursor={'pointer'} mx={1} color={"red"} fontSize={"2xl"} _hover={{}} />
                                          </Td>
                                      </Tr>
                                  })
                              }

                          </Tbody>
                      </Table>
                  </TableContainer>}
              
              {nodeGroupDataLoading ? <Center><Spinner /></Center> :
                  <TableContainer mt={"5em"}>
                      <Heading textAlign={"center"}>Node Group Data</Heading>
                      <CreateNodeGroupForm ButtonText={"Create Node Group"} controlPlane={controlPlane} />
                      <Table variant='simple' size={{ base: "sm", md: "md" }} >
                          <TableCaption>All Node Group Table Details are  here</TableCaption>
                          <Thead>
                              <Tr>
                                  <Th>ID</Th>
                                  <Th>Name</Th>
                                  <Th >Instance Type</Th>
                                  <Th >Max Size</Th>
                                  <Th >status</Th>
                                  <Th >Created At</Th>
                                  <Th >Actions</Th>
                              </Tr>
                          </Thead>
                          <Tbody>
                              {
                                  nodeGroup.map((item: any) => {
                                      return <Tr key={item.id}>
                                          <Td>{item.id}</Td>
                                          <Td>{item.name}</Td>
                                          <Td>{item.nodeInstanceType }</Td>
                                          <Td>{item.nodeGroupMaxSize}</Td>
                                          <Td>{item.status}</Td>
                                          <Td>{item.createdAt}</Td>
                                          <Td>
                                              <ViewIcon cursor={'pointer'} mx={1} color={"green"} fontSize={"2xl"} _hover={{ textDecoration: "underline" }} />
                                              <EditIcon cursor={'pointer'} mx={1} color={"orange"} fontSize={"2xl"} _hover={{ textDecoration: "underline" }} />
                                              <DeleteIcon cursor={'pointer'} mx={1} color={"red"} fontSize={"2xl"} _hover={{}} />
                                          </Td>
                                      </Tr>
                                  })
                              }
                          </Tbody>
                      </Table>
                  </TableContainer>}
          </Box>
      </Box>
  )
}


// "id": 0,
//     "name": "string",
//     "nodeGroupName": "string",
//     "region": "string",
//     "nodeInstanceType": "string",
//     "nodeGroupMaxSize": 0,
//     "nodeGroupMinSize": 0,
//     "nodeGroupDesiredSize": 0,
//     "nodeVolumeSize": 0,
//     "status": "string",
//     "createdAt": "string"