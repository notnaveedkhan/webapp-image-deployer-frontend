import { Box, Divider, Flex, Heading, Text,Link, Image } from "@chakra-ui/react";
import { HiOutlineDotsVertical, HiOutlineExternalLink } from "react-icons/hi";
import { RxDragHandleDots1 } from "react-icons/rx";
import LOGO from '../../assets/logo.png'


export default function CostAndusage() {
  return (
    <Box w={"60%"} minH="200px" boxShadow={"md"} bgColor="white">
                    <Box bgColor={"gray.300"} p={3} display={"flex"} justifyContent={"space-between"} alignItems="center">
                        <Box display={"flex"} alignItems="center" gap={2}>
                            <RxDragHandleDots1 fontSize={"20px"}/>
                            <Text>Cost usage </Text>
                            <Text fontSize={"x-small"} color="blue.500">info</Text>
                        </Box>
                        <HiOutlineDotsVertical/>
                    </Box>
                    <Box p={2} display={"flex"} w="100%" gap={2}>
                        <Box w={"50%"}>
                            <Box display={"flex"} gap={2} flexDir="column">
                                  <Text fontSize={"md"} color="gray.500" w={"fit-content"} borderBottom="dashed">currunt mount cost</Text>
                            <Heading fontSize="2xl">350$</Heading>
                            </Box>  
                            <Divider/>
                            <Box display={"flex"} gap={2} flexDir="column">
                                  <Text fontSize={"md"} color="gray.500" w={"fit-content"} borderBottom="dashed">currunt mount cost</Text>
                                   <Flex justify={"space-between"}> <Heading fontSize="2xl">350$</Heading> <Text fontSize={"sm"} color="gray.500">Wowowknk</Text> </Flex>
                            </Box>  
                            <Divider/>
                            <Box display={"flex"} gap={2} flexDir="column">
                                  <Text fontSize={"md"} color="gray.500" w={"fit-content"} borderBottom="dashed">currunt mount cost</Text>
                            <Heading fontSize={"2xl"}>350$</Heading>
                            </Box>
                            <Divider />
                            
                            <Text p={3} display={"flex"} fontSize={"sm"}>Cost Shown are unblonded. <Link display={"flex"} color={"blue.500"}>Learn more <HiOutlineExternalLink/></Link></Text>
                        </Box>
                        <Box w="50%" p={4}>
                            <Text>Top Cost for current mounts</Text>
                            <Box paddingY={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Flex alignItems={"center"} gap={2}>
                                    <Image h={"30px"} src={LOGO} alt='' />
                                    <Text>E2-C</Text>
                                </Flex>
                                <Text>2$</Text>
                            </Box>
                            <Divider />
                             <Box paddingY={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Flex alignItems={"center"} gap={2}>
                                    <Image h={"30px"} src={LOGO} alt='' />
                                    <Text>E2-C</Text>
                                </Flex>
                                <Text>2$</Text>
                            </Box>
                        </Box>
                        
                    </Box>
                    <Divider />
                    <Link paddingY={3} display="flex" justifyContent={"center"} color={"blue.500"}>GO AWS Cost Mangment</Link>
                </Box>
  )
}
