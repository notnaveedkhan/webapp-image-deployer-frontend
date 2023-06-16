import { DeleteIcon, EditIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, IconButton,  Table, TableCaption, TableContainer, Tbody, Td, Th, Thead,Tr, useToast } from "@chakra-ui/react";
import { useEffect,useState } from "react";
import { useDeleteDeploymentMutation, useGetAllDeploymentsQuery } from "../../services/deploment.service";
import DeploymentForm from "./DeploymentForm";

export default function DeploymentTable() {
    const toast=useToast()
    const [deployment, setDeployment] = useState < any[] > ([])
    const { data, isError, error, isSuccess,refetch } = useGetAllDeploymentsQuery();
    const [deleteDeployment]=useDeleteDeploymentMutation()
    useEffect(() => {
        if (isSuccess) {
            setDeployment(data)
        }
        if (isError) {
            console.log(error)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])


    const handleDelete = (id:string) => {
        deleteDeployment(id)
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
                    })
                }
                if (res.error) {
                    console.log(res.error)
                }
            }
            ).catch((err) => {
                console.log(err)
             })
    }

    const handleRefetch =() => {
        refetch().catch((err) => {
            console.log(err)
         })
    }

  return (
    <TableContainer mt={5}  >
                      <Heading textAlign={'center'} mb={3}>Deployment Data</Heading>
                       <Box display={'flex'} gap={2}>
              <DeploymentForm>
                  <Button size={{base: 'sm', md: 'md'}} mb={3}  bgColor="blueviolet" _hover={{}}
                    color="white">Create Deployment</Button>
                            </DeploymentForm>
                        <IconButton onClick={handleRefetch}  aria-label="Refresh" icon={<RepeatIcon color={"blueviolet"} />} borderColor="blueviolet"   variant="outline" p={3} />
                      </Box>
                      <Table variant='simple' size={{ base: "sm", md: "md" }} >
                          <TableCaption>Deployment Data</TableCaption>
                          <Thead>
                              <Tr>
                                  <Th>ID</Th>
                                  <Th>Name</Th>
                                  <Th >Image</Th>
                                  <Th >Port</Th>
                                  <Th >Replicas</Th>
                                  <Th >Created At</Th>
                                  <Th >Actions</Th>
                              </Tr>
                          </Thead>
                          <Tbody>
                      {deployment.map((item: any) => {
                          return <Tr key={item.id}>
                              <Td>{ item.id}</Td>
                              <Td>{ item.name}</Td>
                              <Td >{item.image }</Td>
                              <Td >{ item.port}</Td>
                              <Td >{item.replicas}</Td>
                              <Td >{item.createdAt}</Td>
                                <Td>
                                    <IconButton icon={<ViewIcon fontSize={"2xl"} />} colorScheme={'green'} aria-label='View' border={"none"} variant="link"/>
                                    <IconButton icon={<DeleteIcon onClick={()=>handleDelete(item.id)} fontSize={"2xl"} />} colorScheme={'red'} aria-label='View' border={"none"} variant="link"/>
                                </Td>
                          </Tr>
                      })
                  }

                          </Tbody>
                      </Table>
        </TableContainer>
  )
}
