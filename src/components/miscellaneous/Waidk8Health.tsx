import { Box, Text } from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RxDragHandleDots1 } from "react-icons/rx";

export default function Waidk8Health() {
  return (
    <Box w={{base:"100%", md:"40%"}}minH="200px" boxShadow={"md"} bgColor="white">
                    <Box bgColor={"gray.300"} p={3} display={"flex"} justifyContent={"space-between"} alignItems="center">
                        <Box display={"flex"} alignItems="center" gap={2}>
                            <RxDragHandleDots1 fontSize={"20px"}/>
                            <Text>Waidk8 Health</Text>
                            <Text fontSize={"x-small"} color="blue.500">info</Text>
                        </Box>
                        <HiOutlineDotsVertical/>
                    </Box>
                </Box>
  )
}
