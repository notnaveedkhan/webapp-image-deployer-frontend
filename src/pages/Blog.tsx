import {
  AddIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Link,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import BlogPost from "../components/miscellaneous/BlogPost";
import BlogPostCategories from "../components/miscellaneous/BlogPostCategories";
import PopularBlogs from "../components/miscellaneous/PopularBlogs";
import { Link as RouterLink } from "react-router-dom";
import {
  useAllTopicsQuery,
  useFollowingTopicsQuery,
} from "../services/topic.service";
import { useGetAllBlogsMutation } from "../services/blog.service";
import { useEffect, useRef, useState } from "react";
import CreateTopic from "../components/miscellaneous/CreateTopic";
import ReactPaginate from "react-paginate";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  let topics: number[] = [];
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const { data, isSuccess, isError, error } = useFollowingTopicsQuery();
  const toast = useToast();
  const {
    data: allTopics,
    isError: isAllTopicsError,
    error: allTopicsError,
    isSuccess: isAllTopicsSuccess,
  } = useAllTopicsQuery({});
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
    setLoadingBlogs(true);
    topics = [];
    if (isSuccess) {
      if (data.length > 0) {
        data.forEach((topic: any) => {
          topics.push(topic.id);
        });
      } else {
        if (isAllTopicsSuccess) {
          allTopics.forEach((topic: any) => {
            topics.push(topic.id);
          });
        }
      }
    }

    if (topics) {
      allBlogs({
        page: 0,
        topics: topics,
        size: 2,
      })
        .then((res: any) => {
          if (res.data) {
            setLoadingBlogs(false);
            console.log(res.data);
            setBlogs(res.data);
          }
          if (res.isError) {
            setLoadingBlogs(false);
            toast({
              title: res.error.data.message || res.error.data.error,
              position: "top",
              isClosable: true,
              duration: 3000,
              variant: "left-accent",
              icon: <WarningIcon />,
            });
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isError, isSuccess, isAllTopicsSuccess, isAllTopicsError]);

  return (
    <div className="w-[95%] mx-auto my-3">
      <Heading
        className="text-blue-900 dark:text-white my-5"
        textAlign={"center"}>
        Blogs
      </Heading>
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
            <button className="bg-blue-900 text-white p-2 gap-3 rounded-md flex items-center justify-between">
              Create Blog <AddIcon />
            </button>
          </Link>
          <Divider className="border border-gray-500" />
          {loadingBlogs ? (
            <Center>
              <Spinner />
            </Center>
          ) : blogs.length > 0 ? (
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
    </div>
  );
}
