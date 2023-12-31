import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RxDragHandleDots1 } from "react-icons/rx";
import LOGO from "../../assets/logo.png";

export default function BuildSolution() {
  interface BuildSolutionOption {
    icon: JSX.Element;
    heading: string;
    content: string;
  }

  let buildSolutionOption: BuildSolutionOption[] = [
    {
      icon: <HiOutlineDotsVertical />,
      heading: "Launch a virtual Machine",
      content: "With EC2(2 min)",
    },
    {
      icon: <HiOutlineDotsVertical />,
      heading: "Launch a virtual Machine",
      content: "With EC2(2 min)",
    },
    {
      icon: <HiOutlineDotsVertical />,
      heading: "Launch a virtual Machine",
      content: "With EC2(2 min)",
    },
    {
      icon: <HiOutlineDotsVertical />,
      heading: "Launch a virtual Machine",
      content: "With EC2(2 min)",
    },
    {
      icon: <HiOutlineDotsVertical />,
      heading: "Launch a virtual Machine",
      content: "With EC2(2 min)",
    },
    {
      icon: <HiOutlineDotsVertical />,
      heading: "Launch a virtual Machine",
      content: "With EC2(2 min)",
    },
  ];

  return (
    <Box
      w={{ base: "100%", md: "60%" }}
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
          <Text>Build a solution</Text>
          <Text fontSize={"x-small"} color="blue.500">
            info
          </Text>
        </Box>
        <HiOutlineDotsVertical />
      </Box>
      <Text p={2} color={"gray.500"}>
        Starts building with simple and wizard and automated workflows.
      </Text>
      <SimpleGrid columns={2} spacingX="20px" spacingY="10px">
        {buildSolutionOption.map(
          (build: BuildSolutionOption, index: number) => {
            return (
              <Box
                key={index}
                display={"flex"}
                alignItems="center"
                gap={3}
                p={3}>
                <Image src={LOGO} h="20px" />
                <Box>
                  <Heading fontSize={"md"}>{build.heading}</Heading>
                  <Text fontSize={"sm"}>{build.content}</Text>
                </Box>
              </Box>
            );
          }
        )}
      </SimpleGrid>
    </Box>
  );
}
