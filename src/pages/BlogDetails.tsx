import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useCreateCommentMutation,
  useFindByIdQuery,
} from "../services/blog.service";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  StackDivider,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import BlogPostCategories from "../components/miscellaneous/BlogPostCategories";
import CreateTopic from "../components/miscellaneous/CreateTopic";
import { useFormik } from "formik";
import * as yup from "yup";
import { ArrowDownIcon, ChevronDownIcon } from "@chakra-ui/icons";
import CommentBox from "../components/Blogs/comments/CommentBox";

export default function BlogDetails() {
  const toast = useToast();

  const [blog, setBlog] = useState<any>({});

  const params = useParams();

  const { data, isSuccess, isError, isLoading } = useFindByIdQuery(params.id);

  const [createComment] = useCreateCommentMutation();

  useEffect(() => {
    if (isSuccess) {
      setBlog(data);
    }
    if (isError) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
    }
  }, [data]);

  const Formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: (values) => {
      if (values.content.length === 0) {
        toast({
          title: "Error",
          description: "Please write something",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
          variant: "left-accent",
        });
      }

      if (values.content.length > 0) {
        createComment({
          blog: Number(params?.id),
          content: values.content,
        })
          .then((res: any) => {
            if (res.data) {
              toast({
                title: "Success",
                description: "Comment posted successfully",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top",
                variant: "left-accent",
              });
            }
            if (res.error) {
              toast({
                title: "Error",
                description: res.error.data.message,
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top",
                variant: "left-accent",
              });
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    },
  });

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Box p={5} display={"flex"} gap={5} w="100%">
          <Box w="70%">
            <Image
              src={
                "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              }
              alt="blog_image"
              width="100%"
              height="400px"
              objectFit={"fill"}
            />

            <Heading mt={4}>{blog?.title}</Heading>
            <Text mt={4} lineHeight={2}>
              {blog?.content}
            </Text>

            <form onSubmit={Formik.handleSubmit}>
              <InputGroup mt={4} w="100%">
                <Input
                  {...Formik.getFieldProps("content")}
                  placeholder="Enter your comment"
                  type="text"
                />
                <InputRightElement bg={"blueviolet"} px={4}>
                  <Button
                    bg={"blueviolet"}
                    _hover={{ bg: "blueviolet" }}
                    color={"white"}
                    type="submit">
                    Post
                  </Button>
                </InputRightElement>
              </InputGroup>
            </form>
            <Box
              border={"1px"}
              borderColor={"gray.200"}
              p={4}
              borderRadius={"lg"}
              mt={3}>
              <Heading
                borderBottom={"1px"}
                borderColor={"gray.200"}
                mb={4}
                fontSize={"xl"}>
                Comments
              </Heading>
              <CommentBox blog={blog} />
            </Box>
          </Box>
          <Box
            px={{ base: 3, md: 6 }}
            w={{ base: "100%", md: "30%" }}
            display={"flex"}
            flexDir="column"
            gap={9}>
            <CreateTopic />
            <BlogPostCategories />
          </Box>
        </Box>
      )}
    </>
  );
}
