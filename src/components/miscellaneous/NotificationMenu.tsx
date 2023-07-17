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
  Tooltip,
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
      <PopoverContent
        bg="white"
        className="rounded-md max-h-[400px] overflow-y-scroll scroll-">
        <PopoverArrow className="bg-blue-900" />
        <PopoverBody>
          <div className="flex justify-between items-center">
            <h2>Notification</h2>
            <BsEye
              title="Mark All As Read"
              className="cursor-pointer text-blue-900 relative"
              onClick={handleSeenAll}
            />
          </div>
          <Divider className="mb-3" />
          <VStack divider={<Divider />} align="stretch">
            {props.notifications.map((notification) => {
              return (
                <Box
                  key={notification.id}
                  cursor="pointer"
                  className="px-3 py-0">
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
                      title="Mark as read"
                      variant="ghost"
                      className="text-blue-900"
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
