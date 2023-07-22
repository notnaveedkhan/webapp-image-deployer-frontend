import {Box, Center, Heading, Image, Spinner, Text} from '@chakra-ui/react'
import {BsCalendar3} from 'react-icons/bs'
import {FiUser} from 'react-icons/fi'
import {useLayoutEffect, useState} from "react";
import {useLatestBlogQuery} from "../../services/blog.service";

export default function PopularBlogs() {

    const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
    const {data, isSuccess, isLoading} = useLatestBlogQuery({});
    useLayoutEffect(
        () => {
            if (isSuccess) {
                setRecentBlogs([]);
                console.log(data)
                if (data.length > 3) {
                    setRecentBlogs(data.slice(0, 3));
                } else {
                    setRecentBlogs(data);
                }
            }
        }, [isSuccess]);
    return (
        <Box display={"flex"} flexDir="column" gap={3}>
            <Heading fontSize={"md"}>Recent Blogs</Heading>
            {
                isLoading ?
                    (
                        <Center>
                            <Spinner mt={2}/>
                        </Center>
                    ) :
                    recentBlogs.length > 0 ? (
                        recentBlogs.map((blog: any, index: number) => {
                            return (
                                <Box key={blog.id} display={"flex"} gap={2}>
                                    <Image
                                        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                        h={"50px"}/>
                                    <Box>
                                        <Heading fontSize={"sm"}>{blog.title}</Heading>
                                        <Box display={"flex"} gap={2} alignItems={"center"}>
                                            <BsCalendar3 size={"14px"}/>
                                            <Text color={"gray.500"}>
                                                {blog.createdAt}
                                            </Text>
                                        </Box>
                                        <Box display={"flex"} gap={2} alignItems={"center"}>
                                            <FiUser size={"14px"}/>
                                            <Text fontSize={"sm"} color={"gray.500"}>{blog.author.name}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })
                    ) : (
                        <Box
                            display="flex"
                            justifyContent={"center"}
                            alignItems="center"
                            height={"100%"}>
                            <Text>No Blog Post</Text>
                        </Box>
                    )
            }
        </Box>
    )
}
