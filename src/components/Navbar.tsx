import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import LOGO from "../assets/logo.png";
import {
  Link as RouterLink,
  Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BsFillBellFill } from "react-icons/bs";
import { ChevronDownIcon, SunIcon } from "@chakra-ui/icons";
import cookies from "react-cookies";
import { useLazyGetUserQuery } from "../services/user.service";
import { useEffect, useState } from "react";
import HamBurgerMenu from "./HamBurgerMenu";
import {
  useGetAllNotificationsQuery,
  Notification,
  useLazyGetAllNotificationsQuery,
} from "../services/notification.service";
import NotificationMenu from "./miscellaneous/NotificationMenu";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { links } from "../Helper/Links";
import useDarkSide from "../hooks/useDarkSide";
import ProfileMenu from "./miscellaneous/ProfileMenu";
import BuildInfo from "./miscellaneous/BuildInfo";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import isAdmin from "../Helper/Admin";
import { AdminMenuPopover } from "./AdminMenuPopover";

export default function Navbar() {
  const location = useLocation();

  const { roles } = useSelector((state: RootState) => state.user);

  const admin = isAdmin(roles);

  const { data, isSuccess } = useGetAllNotificationsQuery();

  const [getNotification] = useLazyGetAllNotificationsQuery();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [user, setUser] = useState<any>({});

  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove("token");
    window.location.href = "/";
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
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
    setInterval(() => {
      getNotification()
        .then((res: any) => {
          if (res.data) {
            setNotifications(res.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }, 60000);
  }, [notifications]);

  useEffect(() => {
    if (isSuccess) {
      setNotifications(data);
    }
  }, [data]);

  return (
    <div className="text-black flex items-center justify-between px-5 py-3 shadow-lg">
      <BuildInfo>
        <Link
          _hover={{}}
          as={RouterLink}
          to={"/"}
          display={"flex"}
          alignItems="center"
          gap={1}
          cursor="pointer">
          <Image cursor={"pointer"} src={LOGO} alt={"Logo"} h={"35px"} />
        </Link>
      </BuildInfo>
      <Box
        display={{ base: "none", md: "flex" }}
        gap={5}
        alignItems={"center"}
        cursor="pointer">
        {links.map((link) => {
          return (
            <RouterLink
              className={`${
                location.pathname === link.url
                  ? "text-white dark:text-black dark:bg-blue-200 bg-blue-900"
                  : "text-black dark:text-white"
              } px-3 py-2 rounded-md tracking-wide transition-all`}
              to={link.url}
              key={link.url}>
              {link.text}
            </RouterLink>
          );
        })}
        {admin && <AdminMenuPopover>Admin</AdminMenuPopover>}
      </Box>
      <Box display={{ base: "none", md: "flex" }} gap={2} alignItems={"center"}>
        <div style={{ position: "relative" }}>
          <NotificationMenu notifications={notifications}>
            <BsFillBellFill
              size={18}
              className="text-black hover:text-blue-900 cursor-pointer"
            />
            {notifications.length > 0 && (
              <Badge
                position={"absolute"}
                rounded="full"
                left={2}
                top={0}
                boxSize={4}
                colorScheme="red">
                {notifications.length}
              </Badge>
            )}
          </NotificationMenu>
        </div>
        <ProfileMenu handleLogout={handleLogout}>
          <div className="h-8 w-20 border border-blue-900 rounded-full flex items-center justify-between pl-4">
            <AiOutlineMenuUnfold className="text-lg text-black hover:text-blue-900" />
            <Avatar name={user.name} size="sm" />
          </div>
        </ProfileMenu>
        <IconButton
          aria-label="theme-toggle"
          icon={<SunIcon />}
          variant="ghost"
          color="yellow"
          onClick={toggleTheme}
          className="border shadow-lg hover:text-blue-900"
        />
      </Box>
      <HamBurgerMenu />
    </div>
  );
}
