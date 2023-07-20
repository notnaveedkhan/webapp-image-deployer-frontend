import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useCreateCommentMutation,
  useFindByIdQuery,
} from "../services/blog.service";
import {
  Badge,
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
import {
  ArrowDownIcon,
  CalendarIcon,
  ChevronDownIcon,
  EditIcon,
} from "@chakra-ui/icons";
import CommentBox from "../components/Blogs/comments/CommentBox";
import { BiUserCircle } from "react-icons/bi";

export default function BlogDetails() {
  const toast = useToast();

  const [paragraphs, setParagraphs] = useState([]);

  const [blog, setBlog] = useState<any>();

  const colorSchemesBadges: string[] = [
    "red",
    "yellow",
    "blue",
    "whatsapp",
    "cyan",
    "facebook",
    "teal",
    "messenger",
    "gray",
    "green",
    "linkedin",
    "pink",
    "purple",
  ];

  const params = useParams();

  const { data, isSuccess, isError, isLoading } = useFindByIdQuery(params.id);
  const [createComment] = useCreateCommentMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setBlog(data);
      setParagraphs(data?.content.split("\n"));
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
  }, [data, isError, isSuccess]);

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

  const renderTextWithFormatting = (text: string) => {
    const italicRegex = /_(.*?)_/g;
    text = text.replace(italicRegex, "<i>$1</i>");

    const codeRegex = /`([^`]+)`/g;
    text = text.replace(codeRegex, "<code>$1</code>");

    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    text = text.replace(linkRegex, '<a href="$2">$1</a>');

    return text;
  };

  const handleClick = () => {
    console.log(blog);
  };

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        isSuccess && (
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
              <div className="flex gap-3 items-center italic text-gray-500">
                <p className="flex gap-2 items-center">
                  <BiUserCircle /> {blog?.author?.name}
                </p>
                <p className="flex gap-2 items-center">
                  <CalendarIcon /> {blog?.createdAt}
                </p>
                <p className="flex gap-2 items-center">
                  <EditIcon /> {blog?.modifiedAt}
                </p>
              </div>
              <div className="flex gap-3 items-center mt-3">
                {blog?.topics.map((topic: any) => {
                  return (
                    <Badge key={topic?.id} colorScheme={"green"}>
                      {topic?.name}
                    </Badge>
                  );
                })}
              </div>
              <Text mt={4} lineHeight={2}>
                {paragraphs.map((paragraph: any, index: number) => {
                  if (paragraph.startsWith("#")) {
                    const headingLevel =
                      paragraph.match(/^(#+)/)?.[0].length || 0;
                    const headingText = paragraph.replace(/^#+/, "");
                    const HeadingTag =
                      `h${headingLevel}` as keyof JSX.IntrinsicElements;
                    return (
                      <HeadingTag
                        className="mt-4 text-2xl font-bold"
                        key={index}>
                        {headingText}
                      </HeadingTag>
                    );
                  }

                  return (
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: renderTextWithFormatting(paragraph),
                      }}></div>
                  );
                })}
              </Text>

              <form onSubmit={Formik.handleSubmit}>
                <InputGroup mt={4} w="100%">
                  <Input
                    {...Formik.getFieldProps("content")}
                    placeholder="Enter your comment"
                    type="text"
                    className="border-gray-500"
                  />
                  <InputRightElement p={0}>
                    <button
                      type="submit"
                      className="bg-blue-900 px-2 py-2 rounded-md text-white">
                      post
                    </button>
                  </InputRightElement>
                </InputGroup>
              </form>

              <Box
                border={"1px"}
                borderColor={"gray.500"}
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
        )
      )}
    </>
  );
}
