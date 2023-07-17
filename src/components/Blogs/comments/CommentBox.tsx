import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  StackDivider,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useCreateCommentMutation } from "../../../services/blog.service";
import { useState } from "react";

interface CommentBoxProps {
  blog: any;
}

export default function CommentBox(props: CommentBoxProps) {
  console.log(props.blog);
  return (
    <VStack
      divider={<StackDivider borderColor="gray.500" />}
      spacing={4}
      align="stretch">
      {props.blog?.comments?.length > 0 ? (
        props.blog?.comments?.map((comment: any) => {
          return (
            <Box key={comment?.id}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Heading fontSize={"md"}>{comment?.author?.name}</Heading>

                <Text fontSize={"xs"} color={"gray.500"} fontStyle="italic">
                  {new Date(comment?.createdAt).toLocaleDateString()}
                </Text>
              </Box>
              <Text mt={2}>{comment?.content}</Text>
              <Reply id={comment?.id}>
                <Button
                  mt={2}
                  colorScheme="blue"
                  variant="ghost"
                  size="sm"
                  rightIcon={<ChevronDownIcon />}>
                  Reply
                </Button>
              </Reply>
            </Box>
          );
        })
      ) : (
        <Center>
          <Text>No comments yet</Text>
        </Center>
      )}
    </VStack>
  );
}

interface ReplyBoxProps {
  children: JSX.Element;
  id: number;
}

function Reply(props: ReplyBoxProps) {
  const [show, setShow] = useState(false);

  const toast = useToast();

  const params = useParams();

  const [createComment] = useCreateCommentMutation();

  const Formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: (values, action) => {
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
          comment: props?.id,
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
              action.resetForm();
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

  console.log(props.id);

  return (
    <>
      <span onClick={() => setShow(!show)}>{props.children}</span>
      <Box display={show ? "block" : "none"} ml={5}>
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
                className="p-2 rounded-md bg-blue-900 text-white">
                Post
              </button>
            </InputRightElement>
          </InputGroup>
        </form>
      </Box>
    </>
  );
}
