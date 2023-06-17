import {
  Box,
  Divider,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Notification } from "../../services/notification.service";

interface NotificationMenuProps {
  children: React.ReactNode;
  notifications: Notification[];
}

export default function NotificationMenu(props: NotificationMenuProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <span style={{ width: "100px" }} onClick={onOpen}>
        {props.children}
      </span>
      <Popover isOpen={isOpen} onClose={onClose} placement="left-end">
        <PopoverContent left={"-161px"}>
          <PopoverHeader>Notifications</PopoverHeader>
          <PopoverCloseButton />
          <PopoverArrow bg="red.500" />
          <PopoverBody>
            <VStack divider={<Divider />} spacing={2} align="stretch">
              {props.notifications.map((notification) => {
                return (
                  <Box
                    key={notification.id}
                    cursor="pointer"
                    _hover={{
                      backgroundColor: "gray.100",
                      transition: "all .2s ease-in-out",
                    }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center">
                      <Text>{notification.title}</Text>
                      <Box
                        h={"10px"}
                        w={"10px"}
                        bg={"red.500"}
                        borderRadius={"50%"}></Box>
                    </Box>
                    <Text>{notification.description}</Text>
                  </Box>
                );
              })}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
