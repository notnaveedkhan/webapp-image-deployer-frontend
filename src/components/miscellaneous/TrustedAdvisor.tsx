import { Box, Divider, Text, Link } from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RxDragHandleDots1 } from "react-icons/rx";

export default function TrustedAdvisor() {
  return (
    <div className="md:col-span-6 col-span-12 border rounded-md border-gray-300">
      <Box
        className="bg-blue-900 text-white rounded-md"
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
        GO AWS Cost Management
      </Link>
    </div>
  );
}
