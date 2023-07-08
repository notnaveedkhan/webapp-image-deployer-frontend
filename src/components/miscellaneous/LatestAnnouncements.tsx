import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react";
import { HiOutlineDotsVertical, HiOutlineExternalLink } from "react-icons/hi";
import { RxDragHandleDots1 } from "react-icons/rx";

export default function LatestAnnouncements() {
  return (
    <div className="col-span-4 border  rounded-md border-gray-300">
      <Box
        className="bg-blue-900 text-white rounded-md"
        p={3}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems="center">
        <Box display={"flex"} alignItems="center" gap={2}>
          <RxDragHandleDots1 fontSize={"20px"} />
          <Text>Latest Announcements</Text>
          <Text fontSize={"x-small"} color="blue.500">
            info
          </Text>
        </Box>
        <HiOutlineDotsVertical />
      </Box>
      <Box>
        <Box p={4} mt={2} display="flex" gap={4} alignItems="center">
          <Box>
            <Text color={"gray.500"}>MAR</Text>
            <Heading fontSize={"lg"}>25</Heading>
          </Box>
          <Heading fontSize={"md"} color="blue.500">
            <Link>
              Fast, simple,cost efficent data warehouse that can extend quires
              to your data lake
            </Link>{" "}
          </Heading>
        </Box>
        <Divider />
        <Box p={4} mt={2} display="flex" gap={4} alignItems="center">
          <Box>
            <Text color={"gray.500"}>MAR</Text>
            <Heading fontSize={"lg"}>25</Heading>
          </Box>
          <Heading fontSize={"md"} color="blue.500">
            <Link>
              Fast, simple,cost efficent data warehouse that can extend quires
              to your data lake
            </Link>{" "}
          </Heading>
        </Box>
        <Divider />
        <Box p={4} mt={2} display="flex" gap={4} alignItems="center">
          <Box>
            <Text color={"gray.500"}>MAR</Text>
            <Heading fontSize={"lg"}>25</Heading>
          </Box>
          <Heading fontSize={"md"} color="blue.500">
            <Link>
              Fast, simple,cost efficent data warehouse that can extend quires
              to your data lake
            </Link>{" "}
          </Heading>
        </Box>
      </Box>
      <Divider mt={4} />
      <Link
        paddingY={3}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        color={"blue.500"}>
        View all Announcements <HiOutlineExternalLink />
      </Link>
    </div>
  );
}
