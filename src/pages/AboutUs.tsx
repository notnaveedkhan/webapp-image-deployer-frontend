import { Box, Heading, Image, Link, Text } from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephoneForward } from "react-icons/bs";
import { RiMapPin5Line } from "react-icons/ri";

export default function AboutUs() {
  return (
    <Box w={"100%"} h={"100vh"}>
      <Box
        m={"80px"}
        p={6}
        display={"flex"}
        gap={6}
        flexWrap={"wrap"}
        justifyContent={"space-between"}>
        <Box
          bg={"blueviolet"}
          color={"white"}
          p={9}
          flex="30%"
          display={"flex"}
          alignItems="center"
          gap={9}
          borderRadius="lg">
          <RiMapPin5Line size={"80px"} style={{ color: "white" }} />
          <Text fontWeight={"bold"} fontSize={"lg"}>
            Chattha Bakhtawar, Islamabad , Pakistan
          </Text>
        </Box>
        <Box
          bg={"blueviolet"}
          color={"white"}
          p={9}
          flex="30%"
          display={"flex"}
          alignItems="center"
          gap={9}
          borderRadius="lg">
          <BsTelephoneForward size={"80px"} style={{ color: "white" }} />
          <Box>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              +92-33-677-7777
            </Text>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Mon-Fri... 8AM to 7PM
            </Text>
          </Box>
        </Box>
        <Box
          bg={"blueviolet"}
          color={"white"}
          p={9}
          flex="30%"
          display={"flex"}
          alignItems="center"
          gap={9}
          borderRadius="lg">
          <AiOutlineMail size={"80px"} style={{ color: "white" }} />
          <Box>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              <Link href="mailto:XXXXXXXXXXXXXXXXXXXXXXXXXX">
                email@gamil.com
              </Link>
            </Text>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              <Link href="mailto:XXXXXXXXXXXXXXXXXXXXXXXXXX">
                info@gamil.com
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        color={"white"}
        mt={"4em"}
        w={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}>
        <Box
          w="50%"
          h="400px"
          position={"relative"}
          bgColor="darkviolet"
          p={9}
          borderRadius="lg">
          <Image
            position={"absolute"}
            top={"-70px"}
            right="35%"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            borderRadius={"full"}
            alt="profile"
            h={"200px"}
            w="200px"
          />
          <Box
            mt={"7em"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={4}>
            <Box>
              <Heading textAlign={"center"} fontSize="5xl">
                Naveed Khan
              </Heading>
              <Text fontSize={"md"}>
                I am a web developer. I love to code and create things that live
                on the internet. I have experience in building responsive
                websites and web applications. I am currently pursuing my
                bachelors degree in computer science. This is my final year
                project.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
