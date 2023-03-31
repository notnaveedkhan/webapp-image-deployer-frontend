import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RxDragHandleDots1 } from "react-icons/rx";

export default function ExploreWaidk8() {
  return (
           <Box w={"30%"}  minH="200px" boxShadow={"md"} bgColor="white">
                    <Box bgColor={"gray.50"} p={3} display={"flex"} justifyContent={"space-between"} alignItems="center">
                        <Box display={"flex"} alignItems="center" gap={2}>
                            <RxDragHandleDots1 fontSize={"20px"}/>
                            <Text>Explore waidk8</Text>
                            <Text fontSize={"x-small"} color="blue.500">info</Text>
                        </Box>
                        <HiOutlineDotsVertical/>
          </Box>
          <Box>
              <Box p={2}>
                  <Heading fontSize={"md"} color="blue.500"><Link>Amozon Building</Link> </Heading>
                  <Text fontSize={"sm"} color="gray.500">Fast, simple,cost efficent data warehouse that can extend quires to your data lake</Text>
              </Box>
              <Divider />
              <Box p={2}>
                  <Heading fontSize={"md"} color="blue.500"><Link>Amozon Building</Link> </Heading>
                  <Text fontSize={"sm"} color="gray.500">Fast, simple,cost efficent data warehouse that can extend quires to your data lake</Text>
              </Box>
              <Divider />
              <Box p={2}>
                  <Heading fontSize={"md"} color="blue.500"><Link>Amozon Building</Link> </Heading>
                  <Text fontSize={"sm"} color="gray.500">Fast, simple,cost efficent data warehouse that can extend quires to your data lake</Text>
              </Box>
          </Box>
                </Box>
  )
}
