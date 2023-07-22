import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FaBold, FaQuoteRight } from "react-icons/fa";
import { BiItalic, BiSend } from "react-icons/bi";
import { ImCross, ImLink } from "react-icons/im";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import {
  AiFillPicture,
  AiOutlineAlignCenter,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsCardText, BsTable } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useCreateBlogMutation,
  CreateBlogBody,
} from "../services/blog.service";
import { useAllTopicsQuery } from "../services/topic.service";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<any[]>([]);
  const [addedTopics, setAddedTopics] = useState<any[]>([]);
  const [filterArray, setFilterArray] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [CreateBlog] = useCreateBlogMutation();
  const toast = useToast();
  const { data, isSuccess } = useAllTopicsQuery({});

  useEffect(() => {
    if (isSuccess) {
      setTopics(data);
    }
  }, [data, isSuccess]);

  interface BlogDto {
    title: string;
    content: string;
    tag: string;
  }

  const initialValues: BlogDto = {
    title: "",
    content: "",
    tag: "",
  };

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: (value) => {
      setSubmitLoading(true);
      const topics: number[] = [];
      addedTopics.forEach((topic) => {
        topics.push(topic.id);
      });
      const body: CreateBlogBody = {
        title: value.title,
        content: value.content,
        topics: topics,
      };
      console.log(body);
      CreateBlog(body).then((res: any) => {
        if (res.data) {
          console.table(res.data);
          setSubmitLoading(false);
          toast({
            title: "Successfully Created Blog",
            position: "top",
            isClosable: true,
            duration: 3000,
            icon: <CheckIcon />,
            status: "success",
            variant: "left-accent",
          });
          navigate("/blogs", { replace: true });
        }
        if (res.error) {
          toast({
            title: res.error.data.message || res.error.data.error,
            position: "top",
            isClosable: true,
            duration: 3000,
            variant: "left-accent",
            icon: <WarningIcon />,
          });
          console.table(res.error.data);
          setSubmitLoading(false);
        }
      });
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title Field is Required"),
      content: Yup.string()
        .min(100, "Minimum 100 lenght")
        .required("content required"),
    }),
  });

  const handleTopicOnChange = (e: any) => {
    const find = addedTopics.find(
      (t: any) => t.id === parseInt(e.target.value)
    );
    if (find) {
      return;
    } else {
      topics.forEach((topic: any) => {
        if (topic.id === parseInt(e.target.value)) {
          console.log(topic);
          setAddedTopics([...addedTopics, topic]);
        }
      });
    }
  };
  const handleRemoveTag = (topic: any): void => {
    const newTopics = addedTopics.filter((t: any) => t.id !== topic.id);
    setAddedTopics(newTopics);
  };

  return (
    <div className="my-3">
      <Heading textAlign={"center"}>Write Your Blog</Heading>
      <form onSubmit={Formik.handleSubmit}>
        <Box
          display={"flex"}
          w="100%"
          p={{ base: 2, md: 6 }}
          justifyContent="center">
          <Box
            mt={5}
            w={{ base: "100%", md: "50%" }}
            boxShadow="lg"
            borderRadius={"lg"}
            p={6}>
            <FormControl
              isInvalid={
                Formik.touched.title && Formik.errors.title ? true : false
              }>
              <FormLabel>Title</FormLabel>
              <Input
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                name="title"
                id="title"
                type={"text"}
                placeholder="Title"
                className="border-gray-600"
              />
              <FormErrorMessage>{Formik.errors.title}</FormErrorMessage>
            </FormControl>
            <Box
              p={2}
              border={"1px"}
              borderColor={"gray.300"}
              borderRadius={"lg"}
              mt={3}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box display={"flex"} gap={{ base: 0, md: 2 }}>
                  {/* <GoTextSize /> */}
                  <FaBold />
                  <BiItalic />
                  <Text letterSpacing={"-10px"}>
                    <ChevronLeftIcon /> <ChevronRightIcon />{" "}
                  </Text>
                  <ImLink />
                  <FaQuoteRight />
                  <AiFillPicture />
                  <BsTable />
                  <AiOutlineOrderedList />
                  <AiOutlineUnorderedList />
                  <AiOutlineAlignCenter />
                </Box>

                <Box display={"flex"} gap={2}>
                  <BsCardText />
                  <BsCardText />
                  <BsCardText />
                </Box>
              </Box>
              <Divider />

              <FormControl
                my={3}
                isInvalid={
                  Formik.touched.content && Formik.errors.content ? true : false
                }>
                <Textarea
                  name="content"
                  id="content"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  colorScheme={"teal"}
                  variant={"unstyled"}
                  rows={10}
                  size={"lg"}
                  placeholder="Write the blog body here..."
                  className="border-gray-600"
                />
                <FormErrorMessage>{Formik.errors.content}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box
              mt={3}
              border="1px"
              p={3}
              position="relative"
              borderColor={"gray.300"}
              borderRadius={"lg"}>
              <FormControl>
                <FormLabel>Topics</FormLabel>
                <Select
                  placeholder="Select Topic"
                  className="border-gray-600"
                  onChange={handleTopicOnChange}>
                  {topics.map((topic) => {
                    return (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <Flex wrap={"wrap"} gap={2} m={4}>
                {addedTopics.map((topic: any) => {
                  return (
                    <Badge
                      key={topic.id}
                      w="fit-content"
                      p={1}
                      px={2}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={1}
                      borderRadius={"3xl"}
                      className="bg-blue-300 text-blue-900"
                      textTransform={"capitalize"}>
                      {topic.name}
                      <ImCross
                        size={"10px"}
                        className="text-red-600"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveTag(topic)}
                      />
                    </Badge>
                  );
                })}
              </Flex>
            </Box>

            <Button
              type="submit"
              mt={3}
              w="100%"
              className="bg-blue-900"
              _hover={{}}
              color="white"
              rightIcon={!submitLoading ? <BiSend /> : undefined}>
              {submitLoading ? <Spinner /> : "Publish"}
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
}
