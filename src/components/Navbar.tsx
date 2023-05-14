import { Box, Button, Divider, Heading, Image, Link, Text } from "@chakra-ui/react";
import LOGO from '../assets/logo.png'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {BsFillBellFill} from 'react-icons/bs'
import { ChevronDownIcon } from "@chakra-ui/icons";
import cookies from 'react-cookies'
import { useLazyGetUserQuery } from "../services/user.service";
import { useEffect,useState } from 'react';
import HamBurgerMenu from "./HamBurgerMenu";


export default function Navbar() {
    const [user,setUser] = useState<any>({});
    const navigate = useNavigate();
    const handleLogout = () => {
        cookies.remove("token");
        navigate("/", { replace: false });
        window.location.reload();
    }
    const [getUser] = useLazyGetUserQuery();

    useEffect(() => {
        getUser({}).then(res => {
            if (res.data) {
                setUser(res.data);
            }
        }
        );
    }, [user,getUser])
    
    return (
        <Box
            w={"100%"}
            bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR}
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
        
                <Divider display={{base:'none',md:"block"}} orientation="vertical" />
                <Box display={{base:"none",md:"flex"}} gap={5} alignItems={"center"} cursor="pointer">
                    <Link as={RouterLink} to={"/"} color={"whiteAlpha.800"} _hover={{ color: "white" }}>Dashboard</Link>
                    <Link as={RouterLink} to={"/cluster"} color={"whiteAlpha.800"} _hover={{ color: "white" }}>Clusters</Link>
                    <Link as={RouterLink} to={"/"} color={"whiteAlpha.800"} _hover={{ color: "white" }}>Deploments</Link>
                    <Link as={RouterLink} to={"/blogs"} color={"whiteAlpha.800"} _hover={{ color: "white" }}>Blogs</Link>
                    <Link as={RouterLink} to={"/about"} color={"whiteAlpha.800"} _hover={{ color: "white" }}>About</Link>
                </Box>

            </Box>
            <Box display={{base: "none", md: "flex"}}  gap={2} alignItems={"center"}>
                <BsFillBellFill cursor={"pointer"} color="white"  />
                <Divider orientation="vertical" />
                <Box cursor={"pointer"} color={"white"} display={"flex"} alignItems="center">
                    <Text>{user.name}</Text>
                    <ChevronDownIcon/>
                </Box>
                <Button onClick={handleLogout}>Logout</Button>
            </Box>
            <HamBurgerMenu/>
    </Box>
  )
}
