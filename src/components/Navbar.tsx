import { Box, Divider, Heading, Image, Link, Text } from "@chakra-ui/react";
import LOGO from '../assets/logo.png'
import { Link as RouterLink } from 'react-router-dom'
import {BsFillBellFill} from 'react-icons/bs'
import { ChevronDownIcon } from "@chakra-ui/icons";


export default function Navbar() {
    return (
        <Box
            w={"100%"}
            bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR}
            // bgColor={"blueviolet"}
            position={"fixed"}
            top={0}
            p={3}
            display={"flex"}
            justifyContent={"space-between"}
            zIndex={1000}
        >
            <Box display={"flex"} gap={2} alignItems={"center"} color="white">

                    <Link _hover={{}} as={RouterLink} to={"/"} display={"flex"} alignItems="center" gap={1} cursor="pointer">
                        <Image cursor={"pointer"} src={LOGO} alt={"Logo"} h={"35px"} />
                        <Heading color={"white"} fontSize="lg" >waidk8</Heading>
                    </Link>
        
                <Divider orientation="vertical" />
                <Box display={"flex"} gap={5} alignItems={"center"} cursor="pointer">
                    <Link as={RouterLink} to={"/"} color={"whiteAlpha.800"} _hover={{ color: "white" }}>Dashboard</Link>
                    <Link as={RouterLink} to={"/"} color={"whiteAlpha.800"} _hover={{ color: "white" }}>Clusters</Link>
                    <Link as={RouterLink} to={"/"} color={"whiteAlpha.800"} _hover={{ color: "white" }}>Deploments</Link>
                    <Link as={RouterLink} to={"/"} color={"whiteAlpha.800"} _hover={{ color: "white" }}>About</Link>
                </Box>
            </Box>
            <Box display={"flex"}  gap={2} alignItems={"center"}>
                <BsFillBellFill cursor={"pointer"} color="white"  />
                <Divider orientation="vertical" />
                <Box cursor={"pointer"} color={"white"} display={"flex"} alignItems="center">
                    <Text>notnaveedkhan</Text>
                    <ChevronDownIcon/>
                </Box>
            </Box>
    </Box>
  )
}
