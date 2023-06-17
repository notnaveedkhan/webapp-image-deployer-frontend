import {
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import LOGO from "../assets/logo.png";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { BsFillBellFill } from "react-icons/bs";
import { ChevronDownIcon } from "@chakra-ui/icons";
import cookies from "react-cookies";
import { useLazyGetUserQuery } from "../services/user.service";
import { useEffect, useState } from "react";
import HamBurgerMenu from "./HamBurgerMenu";
import {
  useGetAllNotificationsQuery,
  Notification,
} from "../services/notification.service";
import NotificationMenu from "./miscellaneous/NotificationMenu";

export default function Navbar() {
  const location = useLocation();

  const { data, isSuccess } = useGetAllNotificationsQuery();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [user, setUser] = useState<any>({});

  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove("token");
    window.location.href = "/";
  };

  const [getUser] = useLazyGetUserQuery();

  useEffect(() => {
    getUser({})
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        }
      })
      .catch((err) => {
        cookies.remove("token");
        navigate("/", { replace: false });
        window.location.reload();
        console.log(err);
      });
  }, [user, getUser]);

  useEffect(() => {
    if (isSuccess) {
      setNotifications(data);
    }
  }, [data]);

  return (
    <Box
      w={"100%"}
      bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR}
      position={"fixed"}
      top={0}
      p={3}
      display={"flex"}
      justifyContent={"space-between"}
      zIndex={1000}>
      <Box display={"flex"} gap={2} alignItems={"center"} color="white">
        <Link
          _hover={{}}
          as={RouterLink}
          to={"/"}
          display={"flex"}
          alignItems="center"
          gap={1}
          cursor="pointer">
          <Image cursor={"pointer"} src={LOGO} alt={"Logo"} h={"35px"} />
          <Heading color={"white"} fontSize="lg">
            waidk8
          </Heading>
        </Link>

        <Divider
          display={{ base: "none", md: "block" }}
          orientation="vertical"
        />
        <Box
          display={{ base: "none", md: "flex" }}
          gap={5}
          alignItems={"center"}
          cursor="pointer">
          <Link
            as={RouterLink}
            to={"/"}
            color={location.pathname === "/" ? "white" : "whiteAlpha.800"}
            _hover={{ color: "white" }}>
            Dashboard
          </Link>
          <Link
            as={RouterLink}
            to={"/cluster"}
            color={
              location.pathname === "/cluster" ? "white" : "whiteAlpha.800"
            }
            _hover={{ color: "white" }}>
            Clusters
          </Link>
          <Link
            as={RouterLink}
            to={"/deployments"}
            color={
              location.pathname === "/deployments" ? "white" : "whiteAlpha.800"
            }
            _hover={{ color: "white" }}>
            Deploments
          </Link>
          <Link
            as={RouterLink}
            to={"/blogs"}
            color={location.pathname === "/blogs" ? "white" : "whiteAlpha.800"}
            _hover={{ color: "white" }}>
            Blogs
          </Link>
          <Link
            as={RouterLink}
            to={"/about"}
            color={location.pathname === "/about" ? "white" : "whiteAlpha.800"}
            _hover={{ color: "white" }}>
            About
          </Link>
        </Box>
      </Box>
      <Box display={{ base: "none", md: "flex" }} gap={2} alignItems={"center"}>
        <Box position={"relative"}>
          <NotificationMenu notifications={notifications}>
            <BsFillBellFill cursor={"pointer"} color="white" />
            <Badge
              colorScheme={"red"}
              borderRadius={"full"}
              position={"absolute"}
              top={-3}
              right={-1}>
              {notifications.length}
            </Badge>
          </NotificationMenu>
        </Box>
        <Divider orientation="vertical" />
        <Box
          cursor={"pointer"}
          color={"white"}
          display={"flex"}
          alignItems="center">
          <Text>{user.name}</Text>
          <ChevronDownIcon />
        </Box>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
      <HamBurgerMenu />
    </Box>
  );
}
