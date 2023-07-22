import {Box, Heading, Image, Text} from '@chakra-ui/react'
import {BsCalendar3} from 'react-icons/bs'
import {FiUser} from 'react-icons/fi'

export default function PopularBlogs() {
    return (
        <Box display={"flex"} flexDir="column" gap={3}>
            <Heading fontSize={"md"}>Popular Blogs</Heading>
            <Box display={"flex"} gap={2}>
                <Image
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    h={"50px"}/>
                <Box>
                    <Heading fontSize={"sm"}>Cluster Approach</Heading>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <BsCalendar3 size={"14px"}/>
                        <Text fontSize={"sm"} color={"gray.500"}>26 june 2020</Text>
                    </Box>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <FiUser size={"14px"}/>
                        <Text fontSize={"sm"} color={"gray.500"}>Davis</Text>
                    </Box>
                </Box>
            </Box>
            <Box display={"flex"} gap={2}>
                <Image
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    h={"50px"}/>
                <Box>
                    <Heading fontSize={"sm"}>Cluster Approach</Heading>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <BsCalendar3 size={"14px"}/>
                        <Text fontSize={"sm"} color={"gray.500"}>26 june 2020</Text>
                    </Box>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <FiUser size={"14px"}/>
                        <Text fontSize={"sm"} color={"gray.500"}>Davis</Text>
                    </Box>
                </Box>
            </Box>
            <Box display={"flex"} gap={2}>
                <Image
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    h={"50px"}/>
                <Box>
                    <Heading fontSize={"sm"}>Cluster Appraoch</Heading>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <BsCalendar3 size={"14px"}/>
                        <Text fontSize={"sm"} color={"gray.500"}>26 june 2020</Text>
                    </Box>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <FiUser size={"14px"}/>
                        <Text fontSize={"sm"} color={"gray.500"}>Davis</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
