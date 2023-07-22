import {Box, Divider, Text, Link, useToast} from "@chakra-ui/react";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {RxDragHandleDots1} from "react-icons/rx";
import Chart from "../Chart/Chart";
import {useState, useEffect} from "react";
import {
    StatisticsResponse,
    useBlogStatisticsQuery, useControlPlaneStatisticsQuery, useDeploymentsStatisticsQuery,
} from "../../services/common.service";
import {isApiResponse} from "../../Helper/isApiErrorResponce";

export default function Statistics() {
    const [blogChartData, setBlogChartData] = useState<StatisticsResponse[]>([]);
    const [clusterChartData, setClusterChartData] = useState<StatisticsResponse[]>([]);
    const [deploymentChartData, setDeploymentChartData] = useState<StatisticsResponse[]>([]);

    const {
        data: blogData,
        isLoading: isBlogDataLoading,
        isSuccess: isBlogDataSuccess,
        isError: isBlogDataError,
        error: blogError
    } = useBlogStatisticsQuery();

    const {
        data: clusterData,
        isLoading: isClusterDataLoading,
        isSuccess: isClusterDataSuccess,
        isError: isClusterDataError,
        error: clusterError
    } = useControlPlaneStatisticsQuery();

    const {
        data: deploymentData,
        isLoading: isDeploymentDataLoading,
        isSuccess: isDeploymentDataSuccess,
        isError: isDeploymentDataError,
        error: deploymentError
    } = useDeploymentsStatisticsQuery();

    const toast = useToast();

    useEffect(() => {
        if (isBlogDataSuccess) {
            setBlogChartData(blogData);
        }

        if (isApiResponse(blogError)) {
            toast({
                title: "Error",
                description: blogError.data?.message,
                status: "error",
                position: "top",
                duration: 5000,
                variant: "left-accent",
            });
        }
    }, [blogData, isBlogDataLoading, isBlogDataSuccess, isBlogDataError, blogError]);

    useEffect(() => {
        if (isClusterDataSuccess) {
            setClusterChartData(clusterData);
        }

        if (isApiResponse(clusterError)) {
            toast({
                title: "Error",
                description: clusterError.data?.message,
                status: "error",
                position: "top",
                duration: 5000,
                variant: "left-accent",
            });
        }
    }, [clusterData, isClusterDataLoading, isClusterDataSuccess, isClusterDataError, clusterError]);

    useEffect(() => {
        if (isDeploymentDataSuccess) {
            setDeploymentChartData(deploymentData);
        }

        if (isApiResponse(deploymentError)) {
            toast({
                title: "Error",
                description: deploymentError.data?.message,
                status: "error",
                position: "top",
                duration: 5000,
                variant: "left-accent",
            });
        }
    }, [deploymentData, isDeploymentDataLoading, isDeploymentDataSuccess, isDeploymentDataError, deploymentError]);

    return (
        <div className="md:col-span-12 col-span-12 border rounded-md border-gray-300">
            <Box
                className="bg-blue-900 text-white rounded-md"
                p={3}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center">
                <Box display={"flex"} alignItems="center" gap={2}>
                    <RxDragHandleDots1 fontSize={"20px"}/>
                    <Text>Statistics</Text>
                    <Text fontSize={"x-small"} color="blue.500">
                        info
                    </Text>
                </Box>
                <HiOutlineDotsVertical/>
            </Box>
            <Box display={"flex"} className={"flex-row"}>
                <Chart data={blogChartData}/>
                <Chart data={clusterChartData}/>
                <Chart data={deploymentChartData}/>
            </Box>
        </div>
    );
}
