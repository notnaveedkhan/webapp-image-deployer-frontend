import { Box, Divider, Flex, Heading, Text, Link } from "@chakra-ui/react";
import { FcIdea } from "react-icons/fc";
import { HiOutlineDotsVertical, HiOutlineExternalLink } from "react-icons/hi";
import { RxDragHandleDots1, RxRocket } from "react-icons/rx";
import { TbCertificate } from "react-icons/tb";
import {useNavigate} from "react-router-dom";

export default function WelcomeToWaidk8() {

  const navigate = useNavigate();

  return (
    <div className="md:col-span-4 col-span-12 border  rounded-md border-gray-300">
      <Box
        className="bg-blue-900 text-white rounded-md"
        p={3}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems="center">
        <Box display={"flex"} alignItems="center" gap={2}>
          <RxDragHandleDots1 fontSize={"20px"} />
          <Text>Welcome To Waidk8</Text>
        </Box>
        <HiOutlineDotsVertical />
      </Box>
      <Box display={"flex"} p={3} gap={2} alignItems="center">
        <RxRocket fontSize={"100px"} />
        <Divider orientation="vertical" />
        <Box>
          <Flex cursor={"pointer"}>
            <Heading fontSize={"lg"} color={"blue.500"}>
              <Link onClick={()=> navigate('/blog/4')}>Getting Started With Waidk8</Link>
            </Heading>{" "}
            <HiOutlineExternalLink color="blue" />
          </Flex>
          <Text as={"p"}>
            A powerful tool designed to simplify web application deployment on Kubernetes clusters without the need for specialized DevOps knowledge.
          </Text>
        </Box>
      </Box>
      <Divider />
      <Box display={"flex"} p={3} gap={2} alignItems="center">
        <TbCertificate fontSize={"100px"} />
        <Divider orientation="vertical" />
        <Box>
          <Flex cursor={"pointer"}>
            <Heading fontSize={"lg"} color={"blue.500"}>
              <Link>Traning and certification</Link>
            </Heading>{" "}
            <HiOutlineExternalLink color="blue" />
          </Flex>
          <Text as={"p"}>
            Hi, how do i change the placeholder color for a variant style? I
            tried this in the extendTheme configs:
          </Text>
        </Box>
      </Box>
      <Divider />
      <Box display={"flex"} p={3} gap={2} alignItems="center">
        <FcIdea fontSize={"100px"} />
        <Divider orientation="vertical" />
        <Box>
          <Flex cursor={"pointer"}>
            <Heading fontSize={"lg"} color={"blue.500"}>
              <Link>Whats new in Waidk8?</Link>
            </Heading>{" "}
            <HiOutlineExternalLink color="blue" />
          </Flex>
          <Text as={"p"}>
            Hi, how do i change the placeholder color for a variant style? I
            tried this in the extendTheme configs:
          </Text>
        </Box>
      </Box>
    </div>
  );
}
