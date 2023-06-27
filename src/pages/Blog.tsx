import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Heading, Link, Text } from "@chakra-ui/react";
import BlogPost from "../components/miscellaneous/BlogPost";
import BlogPostCategories from "../components/miscellaneous/BlogPostCategories";
import PopularBlogs from "../components/miscellaneous/PopularBlogs";
import { Link as RouterLink } from "react-router-dom";
import { useAllTopicsQuery } from "../services/topic.service";
import { useGetAllBlogsMutation } from "../services/blog.service";
import { useEffect, useState } from "react";
import CreateTopic from "../components/miscellaneous/CreateTopic";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const { data, isSuccess, isError, error } = useAllTopicsQuery({});
  const [allBlogs] = useGetAllBlogsMutation();
  interface BlogPost {
    image: string;
    heading: string;
    content: string;
    date: string;
    author: string;
    comments: string;
  }

  useEffect(() => {
    const topics: number[] = [];
    data?.map((topic: any) => {
      return topics.push(topic.id);
    });
    if (isError) {
      console.log(error);
    }
    if (isSuccess) {
      allBlogs({
        page: 0,
        topics: topics,
        size: 0,
      })
        .then((res: any) => {
          if (res.data) {
            setBlogs(res.data);
          } else {
            console.log(res);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isError, isSuccess]);

  return (
    <>
      <Heading textAlign={"center"}>Blogs</Heading>
      <Box
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        w="100%"
        p={6}
        gap={9}>
        <Box
          w={{ base: "100%", md: "70%" }}
          display={"flex"}
          flexDir="column"
          gap={3}>
          <Link w={"fit-content"} as={RouterLink} _hover={{}} to="/create-blog">
            <Button
              rightIcon={<AddIcon />}
              color="white"
              _hover={{}}
              bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR}>
              Create Blog
            </Button>
          </Link>
          {blogs.length > 0 ? (
            blogs.slice(0, 5).map((post: any) => {
              const { author, title, content, commentsCount, id, createdAt } =
                post;
              return (
                <BlogPost
                  image={
                    "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  }
                  author={author.name}
                  comments={`${commentsCount} Comments`}
                  content={
                    content.length > 276 ? content.substring(0, 276) : content
                  }
                  date={createdAt}
                  heading={title}
                  id={id}
                  key={id}
                />
              );
            })
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"400px"}>
              <Center>
                <Heading fontSize={"xs"} color={"gray.500"}>
                  No Blogs
                </Heading>
              </Center>
            </Box>
          )}
          <Box display={"flex"} flexShrink={"wrap"} gap={3}>
            <Button colorScheme={"blue"} leftIcon={<ArrowLeftIcon />}>
              Pervious
            </Button>
            <Button colorScheme={"blue"} variant="outline">
              1
            </Button>
            <Button colorScheme={"blue"} variant="outline">
              2
            </Button>
            <Button colorScheme={"blue"} variant="outline">
              3
            </Button>
            <Button colorScheme={"blue"} variant="outline">
              4
            </Button>
            <Text color={"blue"}>.......</Text>
            <Button colorScheme={"blue"} variant="outline">
              20
            </Button>
            <Button colorScheme={"blue"} rightIcon={<ArrowRightIcon />}>
              Next
            </Button>
          </Box>
        </Box>
        <Box
          px={{ base: 3, md: 6 }}
          w={{ base: "100%", md: "30%" }}
          display={"flex"}
          flexDir="column"
          gap={9}>
          <CreateTopic />
          <Box>
            <BlogPostCategories />
          </Box>
          <Box>
            <PopularBlogs />
          </Box>
        </Box>
      </Box>
    </>
  );
}
