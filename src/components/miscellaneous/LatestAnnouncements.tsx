import {Box, Divider, Heading, Link, Text} from "@chakra-ui/react";
import {HiOutlineDotsVertical, HiOutlineExternalLink} from "react-icons/hi";
import {RxDragHandleDots1} from "react-icons/rx";

export default function LatestAnnouncements() {
    return (
        <div className="md:col-span-8 col-span-12 border  rounded-md border-gray-300">
            <Box
                className="bg-blue-900 text-white rounded-md"
                p={3}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center">
                <Box display={"flex"} alignItems="center" gap={2}>
                    <RxDragHandleDots1 fontSize={"20px"}/>
                    <Text>Latest Announcements</Text>
                    <Text fontSize={"x-small"} color="blue.500">
                        info
                    </Text>
                </Box>
                <HiOutlineDotsVertical/>
            </Box>
            <Box>
                <Box p={4} mt={2} display="flex" gap={4} alignItems="center">
                    <Box>
                        <Text color={"gray.500"}>JUL</Text>
                        <Heading fontSize={"lg"}>22</Heading>
                    </Box>
                    <Box display={"flex"} className={"flex-col"}>
                        <Heading fontSize={"md"} color="blue.500">
                            <Link>
                                System Maintenance - Downtime Notification
                            </Link>{" "}
                        </Heading>
                        <Text>
                            Attention Users,
                            We will be performing scheduled maintenance on the Web App Image Deployer platform to
                            enhance performance and implement critical updates. During this time, the platform will be
                            temporarily unavailable.
                        </Text>
                    </Box>
                </Box>
                <Divider/>
                <Box p={4} mt={2} display="flex" gap={4} alignItems="center">
                    <Box>
                        <Text color={"gray.500"}>JUL</Text>
                        <Heading fontSize={"lg"}>20</Heading>
                    </Box>
                    <Box display={"flex"} className={"flex-col"}>
                        <Heading fontSize={"md"} color="blue.500">
                            <Text>
                                New Blogging Module - Share Your Insights!
                            </Text>{" "}
                        </Heading>
                        <Text>
                            Hello Developers,
                            Introducing the new Blogging Module on the Web App Image Deployer platform! We believe in the power of knowledge sharing and want to provide you with a space to share your expertise, experiences, and insights with the community.
                        </Text>
                    </Box>
                </Box>
                <Divider/>
                <Box p={4} mt={2} display="flex" gap={4} alignItems="center">
                    <Box>
                        <Text color={"gray.500"}>JUN</Text>
                        <Heading fontSize={"lg"}>15</Heading>
                    </Box>
                    <Box display={"flex"} className={"flex-col"}>
                        <Heading fontSize={"md"} color="blue.500">
                            <Text>
                                New Feature Release - Continuous Deployment Integration
                            </Text>{" "}
                        </Heading>
                        <Text>
                            Attention Users,

                            We will be performing scheduled maintenance on the Web App Image Deployer platform to
                            enhance performance and implement critical updates. During this time, the platform will be
                            temporarily unavailable.
                        </Text>
                    </Box>
                </Box>
                <Divider/>
            </Box>
            <Divider mt={4}/>
            <Link
                paddingY={3}
                display="flex"
                justifyContent={"center"}
                alignItems="center"
                color={"blue.500"}>
                View all Announcements <HiOutlineExternalLink/>
            </Link>
        </div>
    );
}
