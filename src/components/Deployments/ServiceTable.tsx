import { DeleteIcon, EditIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons";
import {  Box, Button, Heading, IconButton, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead,Tr } from "@chakra-ui/react";
import KbueServiceForm from "./KbueServiceForm";

import { useState,useEffect } from "react";
import { useAllKbueServiceQuery } from "../../services/kubeService.service";



export default function ServiceTable() {

    const [services, setServices] = useState([])
    const {data,isSuccess,isLoading,isError,error } = useAllKbueServiceQuery();
    useEffect(() => {
        if(isSuccess){
            setServices(data)
            console.log(data)
        
        }
    }, [data])

  return (
    <TableContainer mt={5}  >
                      <Heading textAlign={'center'} mb={3}>Service Data</Heading>  
          <Box display={'flex'} gap={2}>
              <KbueServiceForm>
                                <Button size={{base: 'sm', md: 'md'}} mb={3}  bgColor="blueviolet" _hover={{}}
                                                        color="white">Create Service</Button></KbueServiceForm>
                        <IconButton  aria-label="Refresh" icon={<RepeatIcon color={"blueviolet"} />} borderColor="blueviolet"   variant="outline" p={3} />
                      </Box>
                      <Table variant='simple' size={{ base: "sm", md: "md" }} >
                          <TableCaption>Service Data</TableCaption>
                          <Thead>
                              <Tr>
                                  <Th>ID</Th>
                                  <Th>Name</Th>
                                  <Th >Port</Th>
                                  <Th >target Port</Th>
                                  <Th >url</Th>
                                  <Th >Created At</Th>
                                  <Th >Actions</Th>
                              </Tr>
                          </Thead>
              <Tbody>
                  {
                      services.map((service:any) => {
                          return <Tr key={service.id}>
                                <Td>{service.id }</Td>
                                <Td>{ service.name}</Td>
                              <Td >{ service.port}</Td>
                              <Td >{ service.targetPort}</Td>
                              <Td >{ service.url===null?"Not Available":service.url}</Td>
                              <Td >{ service.createdAt}</Td>

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
                      })
                  }
                            
                          </Tbody>
                      </Table>
        </TableContainer>
  )
}
