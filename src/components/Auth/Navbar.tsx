import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Colors from "../../assets/Colors";
import LOGO from "../../assets/logo.png";
import UnAuthLinks from "../../Helper/UnAuthLinks";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={{ base: 2, md: 10 }}
      py={{ base: 2, md: 5 }}>
      <Flex gap={2} alignItems="center">
        <Image src={LOGO} alt="logo" boxSize={"50px"} />
        {/* <Heading fontSize={"2xl"} letterSpacing={1} color={Colors.primary}>
          Waidk8.
        </Heading> */}
      </Flex>
      <Box display="flex" gap={5} alignItems="center">
        <Flex gap={5} alignItems="center">
          {UnAuthLinks.map((item, index) => {
            return (
              <Link
                key={item.path}
                fontWeight={600}
                letterSpacing={1}
                color={location.hash === item.path ? Colors.primary : "gray"}
                borderBottom={location.hash === item.path ? "2px solid" : ""}
                borderBottomColor={
                  location.hash === item.path ? Colors.primary : ""
                }
                _hover={{
                  color: Colors.primary,
                  borderBottomColor: Colors.primary,
                  borderBottomWidth: 2,
                }}
                py={3}
                href={item.path}>
                {item.name}
              </Link>
            );
          })}
        </Flex>
        <ButtonGroup>
          <Button
            variant="outline"
            colorScheme="blue"
            size="sm"
            onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button
            onClick={() => navigate("/register")}
            variant="solid"
            colorScheme="blue"
            size="sm">
            Signup
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
