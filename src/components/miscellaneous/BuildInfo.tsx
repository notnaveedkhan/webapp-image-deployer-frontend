import React from "react";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";

interface StaticsProps {
  children: React.ReactNode;
}

const BuildInfo: React.FC<StaticsProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Popover isOpen={isOpen} onClose={onClose} placement="bottom" closeOnBlur>
      <PopoverTrigger>
        <button onMouseEnter={onOpen}>{children}</button>
      </PopoverTrigger>
      <PopoverContent role="tooltip" onMouseLeave={onClose}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Build Info</PopoverHeader>
        <PopoverBody>
          authentication-service - #01
          authentication-service - #02
          authentication-service - #03
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default BuildInfo;
