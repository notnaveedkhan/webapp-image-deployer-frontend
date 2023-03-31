import { Box, Divider, Heading, Image, Input, InputAddon, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";
import LOGO from '../assets/logo.png'
import { AiOutlineInsertRowBelow, AiOutlineSearch } from 'react-icons/ai'
import {BsFillBellFill} from 'react-icons/bs'
import { ChevronDownIcon } from "@chakra-ui/icons";


export default function Navbar() {
    return (
        <Box
            w={"100%"}
            // bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR}
            bgColor={"blueviolet"}
            position={"fixed"}
            top={0}
            p={3}
            display={"flex"}
            justifyContent={"space-between"}
            zIndex={1000}
        >
            <Box display={"flex"} gap={2} alignItems={"center"} color="white">
                <Box display={"flex"} alignItems="center" gap={2} cursor="pointer">
                    <Image cursor={"pointer"} src={LOGO} alt={"Logo"} h={"35px"} />
                    <Heading color={"white"} fontSize="lg" >waidk8</Heading>
                </Box>
            
                <Divider orientation="vertical" />
                <Box display={"flex"} alignItems={"center"} cursor="pointer">
                     <AiOutlineInsertRowBelow style={{fontSize:"30px",color:"white"}}/>
                <Text fontSize={"md"}>Services</Text>
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
