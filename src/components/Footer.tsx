import { Box, Divider, Heading, Image, Link, Icon } from "@chakra-ui/react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <Box
      borderTop="1px"
      borderColor="gray.200"
      px="4rem"
      py="2rem"
      mt="4rem"
      bg={"blueviolet"}
      color="white">
      <Box display={"flex"} justifyContent={"space-between"} w="100%">
        <Box display={"flex"} gap={2} w="50%" h="fit-content">
          <Image src={Logo} alt="logo" h="40px" />
          <Heading alignSelf={"center"} fontSize={"lg"}>
            Waidk8. Image Deployer
          </Heading>
        </Box>

        <Box display={"flex"} gap="8rem" w="50%">
          <Box>
            <Heading mb={4} color={"gray.400"} size="sm">
              Quick Links
            </Heading>
            <Heading size="sm" my={3}>
              <Link>Dashboard</Link>
            </Heading>
            <Heading size="sm" my={3}>
              <Link>Clusters</Link>
            </Heading>
            <Heading size="sm" my={3}>
              <Link>Deployments</Link>
            </Heading>
            <Heading size="sm" my={3}>
              <Link>Blogs</Link>
            </Heading>
          </Box>

          <Box>
            <Heading mb={4} color={"gray.400"} size="sm">
              About Us
            </Heading>
            <Heading size="sm" my={3}>
              <Link>About</Link>
            </Heading>
            <Heading size="sm" my={3}>
              <Link>Contact</Link>
            </Heading>
          </Box>

          <Box>
            <Heading mb={4} color={"gray.400"} size="sm">
              Help
            </Heading>
            <Heading size="sm" my={3}>
              <Link>FAQ</Link>
            </Heading>
            <Heading size="sm" my={3}>
              <Link>Support</Link>
            </Heading>
          </Box>
        </Box>
      </Box>

      <Divider />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p="1rem">
        <Box>
          <Heading mb={2} size="sm">
            10x faster deploy your website with waidk8.
          </Heading>
          <Heading size={"xs"}>Save your countless hours of work</Heading>
          <Box display="flex" gap={6} mt={4}>
            {/* //Social Links */}
            <Icon
              as={FaFacebookSquare}
              color="inherit"
              cursor={"pointer"}
              _hover={{ color: "blue.500" }}
              fontSize="20px"
            />
            <Icon
              as={FaInstagramSquare}
              color="inherit"
              cursor={"pointer"}
              _hover={{ color: "#E4405F" }}
              fontSize="20px"
            />
            <Icon
              as={FaTwitterSquare}
              color="inherit"
              cursor={"pointer"}
              _hover={{ color: "#1DA1F2" }}
              fontSize="20px"
            />
          </Box>
        </Box>

        <Box>
          <Heading size={"xs"} alignSelf={"flex-end"}>
            © 2022 waidk8. All rights reserved
          </Heading>
        </Box>
      </Box>
    </Box>
  );
}
