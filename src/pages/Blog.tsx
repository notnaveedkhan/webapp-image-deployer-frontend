import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormLabel, Heading, IconButton, Input, InputGroup, InputRightAddon, Link, Text, Tooltip, useSafeLayoutEffect, useToast } from "@chakra-ui/react";
import BlogPost from "../components/miscellaneous/BlogPost";
import BlogPostCategories from "../components/miscellaneous/BlogPostCategories";
import PopularBlogs from "../components/miscellaneous/PopularBlogs";
import {Link as RouterLink} from 'react-router-dom'
import { useCreateTopicMutation } from "../services/topic.service";
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useAllTopicsQuery} from '../services/topic.service'
import { useGetAllBlogsMutation } from "../services/blog.service";
import { useEffect, useState } from "react";
import { forEachChild } from "typescript";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const { data, isSuccess,isError,error } = useAllTopicsQuery({});
  const [allBlogs] = useGetAllBlogsMutation();
  const toast = useToast();
  const [topicApi] = useCreateTopicMutation();
  interface BlogPost{
  image: string,
  heading: string,
  content: string,
  date: string,
  catogary: string[],
  comments:string
}
  let BlogPostsDto: BlogPost[] = [
    {
      image: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      heading: "Cluster Approch",
      content: "The Cluster Approach is used for coordinating in non-refugee humanitarian emergencies. Humanitarian organisations have agreed to lead certain clusters at global level (see the chart), and have defined a cluster structure for non-refugee humanitarian responses at country level",
      date: "26 june 2022",
      catogary: ["cluster"],
      comments:"10 comments"
    },
    {
      image: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      heading: "Image Deployer",
      content: "The Cluster Approach is used for coordinating in non-refugee humanitarian emergencies. Humanitarian organisations have agreed to lead certain clusters at global level (see the chart), and have defined a cluster structure for non-refugee humanitarian responses at country level",
      date: "26 june 2021",
      catogary: ["Deployer"],
      comments:"10 comments"
    }
   ]

  const FormikCreateTopic = useFormik({
    initialValues: {
      name:""
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object({
      name:Yup.string().matches(/^[a-zA-Z\s]*$/, 'Name must only contain alphabetic characters')
    })
  })

  const handleCreateTopic = () => {
    if (FormikCreateTopic.errors.name) {
      toast({
        title: FormikCreateTopic.errors.name,
        duration: 3000,
        isClosable: true,
        status: "warning",
        position:"top"
      })
    }
    else {
      topicApi({ name: FormikCreateTopic.values.name }).then(res => {
        console.log(res);
      })
    }
  }
  useEffect(() => {
    console.log(data);
    const topics: number[] = [];
    data?.map((topic: any) => { 
      topics.push(topic.id);
    })
    if (isError) {
      console.log(error);

    }
    console.log(topics);
     if (isSuccess) {
       allBlogs({
         page: 0,     
         topics: topics,
         size:0
       }).then((res: any) => {
         if (res.data) {
           setBlogs(res.data);
         }
         else {
            console.log(res);
         }
       }
      )
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data,isError,isSuccess])
  return (
    <>
      <Heading textAlign={"center"}>Blogs</Heading>
      <Box
          display={"flex"}
          w="100%"
          p={6}
          gap={9}
      >
        <Box w={"70%"} display={"flex"} flexDir="column" gap={3}>
          <Link w={"fit-content"} as={RouterLink} _hover={{}} to="/create-blog">
            <Button rightIcon={<AddIcon />} color="white" _hover={{}} bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR}>Create Blog</Button></Link> 
        {
          BlogPostsDto.map((post,index) => {
            return <BlogPost
              image={post.image}
              topics={post.catogary}
              comments={post.comments}
              content={post.content}
              date={post.date}
              heading={post.heading}
              key={index}
            />
          })
          }
          {
            blogs.map((post:any) => {
              const names: string[] = [];
              const { topics, title, content, commentsCount, comments, id, createdAt } = post;
              for (let index = 0; index < topics.length; index++) {
                 const topic = topics[index];
                names.push(topic.name);
              }
            return <BlogPost
              image={"https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"}
              topics={names}
              comments={commentsCount}
              content={content}
              date={ createdAt}
              heading={title}
              key={id}
            />
          })
        } 
        <Box display={"flex"} gap={3}>
          <Button colorScheme={"blue"} leftIcon={<ArrowLeftIcon />}>Pervious</Button>
          <Button colorScheme={"blue"} variant="outline">1</Button>
          <Button colorScheme={"blue"} variant="outline">2</Button>
          <Button colorScheme={"blue"} variant="outline">3</Button>
          <Button colorScheme={"blue"} variant="outline">4</Button>
          <Text color={"blue"}>.......</Text>
          <Button colorScheme={"blue"} variant="outline">20</Button>
          <Button colorScheme={"blue"} rightIcon={<ArrowRightIcon />}>Next</Button>
           </Box>
      </Box>
        <Box px={6} w={"30%"} display={"flex"} flexDir="column" gap={9}>
          <FormControl>
            <FormLabel>Create Topic</FormLabel>
          <InputGroup>
              <Input type={"search"} id="name" name="name" onChange={FormikCreateTopic.handleChange}
                onBlur={FormikCreateTopic.handleBlur} value={FormikCreateTopic.values.name} placeholder="Enter your topic" />
              <Tooltip label="Create Topic"><InputRightAddon bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR} cursor="pointer" _hover={{bgColor:"gray.200"}} onClick={handleCreateTopic} ><AddIcon/></InputRightAddon></Tooltip>
          </InputGroup>
           </FormControl>
        <Box>
           <BlogPostCategories/>
        </Box>
            
        <Box>
           <PopularBlogs/>
        </Box>
      </Box>
      </Box>
      </>
  )
}
