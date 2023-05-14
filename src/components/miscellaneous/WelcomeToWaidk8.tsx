import { Box, Divider, Flex, Heading, Text,Link } from "@chakra-ui/react"
import { FcIdea } from "react-icons/fc"
import { HiOutlineDotsVertical, HiOutlineExternalLink } from "react-icons/hi"
import { RxDragHandleDots1, RxRocket } from "react-icons/rx"
import { TbCertificate } from "react-icons/tb"


export default function WelcomeToWaidk8() {
  return (
       <Box w={{base:"100%",md:"40%"}} minH="200px" boxShadow={"md"} bgColor="white">
                    <Box bgColor={"gray.300"} p={3} display={"flex"} justifyContent={"space-between"} alignItems="center">
                        <Box display={"flex"} alignItems="center" gap={2}>
                            <RxDragHandleDots1 fontSize={"20px"}/>
                            <Text>Welcome To Waidk8</Text>
                        </Box>
                        <HiOutlineDotsVertical/>
                    </Box>
                    <Box display={"flex"} p={3} gap={2} alignItems="center">
                        <RxRocket fontSize={"100px"} />
                        <Divider orientation='vertical' />
                        <Box>
                             <Flex cursor={"pointer"}><Heading fontSize={'lg'} color={"blue.500"}><Link>Getting Started With Waidk8</Link></Heading> <HiOutlineExternalLink color='blue'/></Flex> 
                            <Text as={"p"}>Hi, how do i change the placeholder color for a variant style? I tried this in the extendTheme configs:</Text>
                        </Box>
                    </Box>
                    <Divider />
                    <Box display={"flex"} p={3} gap={2} alignItems="center">
                        <TbCertificate fontSize={"100px"} />
                        <Divider orientation='vertical' />
                        <Box>
                             <Flex cursor={"pointer"}><Heading fontSize={'lg'} color={"blue.500"}><Link>Traning and certification</Link></Heading> <HiOutlineExternalLink color='blue'/></Flex> 
                            <Text as={"p"}>Hi, how do i change the placeholder color for a variant style? I tried this in the extendTheme configs:</Text>
                        </Box>
                    </Box>
                    <Divider />
                    <Box display={"flex"} p={3} gap={2} alignItems="center">
                        <FcIdea fontSize={"100px"} />
                        <Divider orientation='vertical' />
                        <Box>
                             <Flex cursor={"pointer"}><Heading fontSize={'lg'} color={"blue.500"}><Link>Whats new in Waidk8?</Link></Heading> <HiOutlineExternalLink color='blue'/></Flex> 
                            <Text as={"p"}>Hi, how do i change the placeholder color for a variant style? I tried this in the extendTheme configs:</Text>
                        </Box>
                    </Box>
                </Box>
  )
}
