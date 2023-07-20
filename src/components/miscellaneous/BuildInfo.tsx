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
import { BuildDetails } from "../../services/common.service";

interface StaticsProps {
  children: React.ReactNode;
  buildDetails: BuildDetails[];
}

const BuildInfo: React.FC<StaticsProps> = ({ children, buildDetails }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Popover isOpen={isOpen} onClose={onClose} placement="bottom" closeOnBlur>
      <PopoverTrigger>
        <button onMouseEnter={onOpen}>{children}</button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-[rgba(0,0,0,0.9)] text-white w-fit"
        role="tooltip"
        onMouseLeave={onClose}>
        <PopoverArrow />
        <PopoverBody>
          {buildDetails.map((buildDetail: BuildDetails) => {
            return (
              <div key={buildDetail.buildNumber}>
                {buildDetail.applicationName} - {buildDetail.buildNumber}
              </div>
            );
          })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default BuildInfo;
