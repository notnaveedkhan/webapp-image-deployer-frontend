import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { BsEye } from "react-icons/bs";
import {
  Notification,
  useSeenAllNotificationMutation,
  useSeenNotificationMutation,
} from "../../services/notification.service";

interface NotificationMenuProps {
  children: React.ReactNode;
  notifications: Notification[];
}

export default function NotificationMenu(props: NotificationMenuProps) {
  const toast = useToast();

  const [seenNotification] = useSeenNotificationMutation();

  const [seenAllNotification] = useSeenAllNotificationMutation();

  const handleSeen = (nid: string) => {
    seenNotification(nid)
      .then((res: any) => {
        if (res.error) {
          toast({
            title: "Error",
            description: res.error.data.message,
            status: "error",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
        }
      })
      .catch((err: any) => {
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      });
  };

  const handleSeenAll = () => {
    seenAllNotification()
      .then((res: any) => {
        if (res.error) {
          toast({
            title: "Error",
            description: res.error.data.message,
            status: "error",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
        }
      })
      .catch((err: any) => {
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      });
  };
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button variant={"unstyled"}>{props.children}</Button>
      </PopoverTrigger>
      <PopoverContent bg="white">
        <PopoverHeader
          fontSize={"lg"}
          fontWeight={600}
          textTransform="uppercase">
          Notifications
        </PopoverHeader>
        <PopoverArrow bg="blueviolet" />
        <PopoverCloseButton />
        <PopoverBody>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Text
              fontSize={"sm"}
              fontWeight={600}
              color={"blueviolet"}
              cursor="pointer"
              transitionDelay={"300ms"}
              transitionDuration={"300ms"}
              transitionProperty={"all"}
              transitionTimingFunction={"linear"}
              _hover={{ textDecoration: "underline" }}
              onClick={handleSeenAll}>
              Seen All
            </Text>
          </Box>
          <Divider />
          <VStack divider={<Divider />} spacing={2} align="stretch">
            {props.notifications.map((notification) => {
              return (
                <Box key={notification.id} cursor="pointer" padding="10px">
                  <Box display={"flex"} alignItems="center">
                    <Box>
                      <Text
                        fontSize={"sm"}
                        textTransform={"uppercase"}
                        fontWeight={600}>
                        {notification.title}
                      </Text>
                      <Text fontSize={"sm"} fontWeight={300}>
                        {notification.description}
                      </Text>
                    </Box>
                    <IconButton
                      size={"sm"}
                      aria-label="seen"
                      icon={<BsEye />}
                      variant="ghost"
                      color={"blueviolet"}
                      onClick={() => handleSeen(String(notification.id))}
                    />
                  </Box>
                </Box>
              );
            })}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
