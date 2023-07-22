import {
    Box,
    Divider,
    Flex,
    Heading,
    Text,
    Link,
    Image,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {RxDragHandleDots1} from "react-icons/rx";
import LOGO from "../../assets/logo.png";
import {
    CostaAndUsage,
    useGetCostOfAuthenticationQuery,
    useGetCostOfDeploymentsQuery,
} from "../../services/dashboard.service";

export default function CostAndUsage() {
    const [costOfAuthentication, setCostOfAuthentication] =
        useState<CostaAndUsage>({cost: 0, count: 0});
    const [costOfDeployments, setCostOfDeployments] = useState<CostaAndUsage>({
        cost: 0,
        count: 0,
    });

    const {
        data: costOfAuthenticationData,
        isSuccess: isCostOfAuthenticationSuccess,
    } = useGetCostOfAuthenticationQuery();
    const {data: costOfDeploymentsData, isSuccess: isCostOfDeploymentsSuccess} =
        useGetCostOfDeploymentsQuery();

    useEffect(() => {
        if (isCostOfAuthenticationSuccess) {
            setCostOfAuthentication(costOfAuthenticationData);
        }
        if (isCostOfDeploymentsSuccess) {
            setCostOfDeployments(costOfDeploymentsData);
        }
    }, [
        costOfAuthenticationData,
        costOfDeploymentsData,
        isCostOfAuthenticationSuccess,
        isCostOfDeploymentsSuccess,
    ]);

    return (
        <Box className="md:col-span-6 col-span-12 border rounded-md border-gray-300">
            <Box
                className="bg-blue-900 text-white rounded-md"
                p={3}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center">
                <Box display={"flex"} alignItems="center" gap={2}>
                    <RxDragHandleDots1 fontSize={"20px"}/>
                    <Text>Cost & Usage</Text>
                    <Text fontSize={"x-small"} color="blue.500">
                        info
                    </Text>
                </Box>
                <HiOutlineDotsVertical/>
            </Box>
            <Box p={2} display={"flex"} w="100%" gap={2}>
                <Box p={4} w={"50%"}>
                    <Box display={"flex"} gap={2} flexDir="column">
                        <Text
                            fontSize={"md"}
                            color="gray.500"
                            w={"fit-content"}
                            borderBottom="dashed">
                            Total Cost
                        </Text>
                        <Heading fontSize="2xl">
                            {Math.floor(costOfAuthentication.cost + costOfDeployments.cost)}$
                        </Heading>
                    </Box>
                </Box>
                <Box w="50%" p={4}>
                    <Text>Cost for current month</Text>
                    <Box
                        paddingY={2}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}>
                        <Flex alignItems={"center"} gap={2}>
                            <Image h={"30px"} src={LOGO} alt=""/>
                            <Text>Cluster</Text>
                        </Flex>
                        <Text>{Math.floor(costOfAuthentication.cost)}$</Text>
                    </Box>
                    <Divider/>
                    <Box
                        paddingY={2}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}>
                        <Flex alignItems={"center"} gap={2}>
                            <Image h={"30px"} src={LOGO} alt=""/>
                            <Text>Deployments</Text>
                        </Flex>
                        <Text>{Math.floor(costOfDeployments.cost)}$</Text>
                    </Box>
                </Box>
            </Box>
            <Divider/>
            <Link
                paddingY={3}
                display="flex"
                justifyContent={"center"}
                color={"blue.500"}>
                WAIDK8 Cost Management
            </Link>
        </Box>
    );
}
