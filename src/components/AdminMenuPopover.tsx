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
import React from "react";
import { Link } from "react-router-dom";
import { adminLinks, helpLinks, Links } from "../Helper/Links";

interface Props {
  children: React.ReactNode;
}

export const AdminMenuPopover: React.FC<Props> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Popover isOpen={isOpen} onClose={onClose} placement="bottom" closeOnBlur>
      <PopoverTrigger>
        <button onMouseEnter={onOpen}>{children}</button>
      </PopoverTrigger>
      <PopoverContent
        onMouseLeave={onClose}
        className="dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 w-[500px]">
        <PopoverArrow />
        <PopoverBody className="">
          <div className="flex gap-20 p-5">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Admin Links</h1>
              {adminLinks.map((link: Links) => {
                return (
                  <Link key={link.url} to={link.url}>
                    {link.text}
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Help Center</h1>
              {helpLinks.map((link: Links) => {
                return (
                  <Link key={link.url} to={link.url}>
                    {link.text}
                  </Link>
                );
              })}
            </div>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
