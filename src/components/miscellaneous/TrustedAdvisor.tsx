import { Box, Divider, Text, Link } from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RxDragHandleDots1 } from "react-icons/rx";

export default function TrustedAdvisor() {
  return (
    <Box
      w={{ base: "100%", md: "40%" }}
      minH="200px"
      boxShadow={"md"}
      bgColor="white">
      <Box
        bgColor={"gray.300"}
        p={3}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems="center">
        <Box display={"flex"} alignItems="center" gap={2}>
          <RxDragHandleDots1 fontSize={"20px"} />
          <Text>Trusted Advisor</Text>
          <Text fontSize={"x-small"} color="blue.500">
            info
          </Text>
        </Box>
        <HiOutlineDotsVertical />
      </Box>
      <Divider />
      <Link
        paddingY={3}
        display="flex"
        justifyContent={"center"}
        alignSelf={"flex-end"}
        color={"blue.500"}>
        GO AWS Cost Mangment
      </Link>
    </Box>
  );
}
