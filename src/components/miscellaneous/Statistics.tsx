import { Box, Divider, Text, Link, useToast } from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RxDragHandleDots1 } from "react-icons/rx";
import Chart from "../Chart/Chart";
import { useState, useEffect } from "react";
import {
  StatisticsResponse,
  useBlogStatisticsQuery,
} from "../../services/common.service";
import { isApiResponse } from "../../Helper/isApiErrorResponce";

export default function Statistics() {
  const [chatData, setChatData] = useState<StatisticsResponse[]>([]);

  const { data, isLoading, isSuccess, isError, error } =
    useBlogStatisticsQuery();

  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      setChatData(data);
    }

    if (isApiResponse(error)) {
      toast({
        title: "Error Occured",
        description: error.data?.message,
        status: "error",
        position: "top",
        duration: 5000,
        variant: "left-accent",
      });
    }
  }, [data, isLoading, isSuccess, isError, error]);

  return (
    <div className="md:col-span-6 col-span-12 border rounded-md border-gray-300">
      <Box
        className="bg-blue-900 text-white rounded-md"
        p={3}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems="center">
        <Box display={"flex"} alignItems="center" gap={2}>
          <RxDragHandleDots1 fontSize={"20px"} />
          <Text>Statistics</Text>
          <Text fontSize={"x-small"} color="blue.500">
            info
          </Text>
        </Box>
        <HiOutlineDotsVertical />
      </Box>

      <Chart data={chatData} />
    </div>
  );
}
