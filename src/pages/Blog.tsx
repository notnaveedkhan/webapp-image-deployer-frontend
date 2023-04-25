import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, Heading, IconButton, Input, InputGroup, InputRightAddon, Link, Text, useToast } from "@chakra-ui/react";
import BlogPost from "../components/miscellaneous/BlogPost";
import BlogPostCategories from "../components/miscellaneous/BlogPostCategories";
import PopularBlogs from "../components/miscellaneous/PopularBlogs";
import {Link as RouterLink} from 'react-router-dom'
import { useCreateTopicMutation } from "../services/topic.service";
import { useFormik } from "formik";
import * as Yup from 'yup';

export default function Blog() {
  const toast = useToast();
  const [topicApi] = useCreateTopicMutation();
  interface BlogPost{
  image: string,
  heading: string,
  content: string,
  date: string,
  catogary: string,
  comments:string
}
  let BlogPostsDto: BlogPost[] = [
    {
      image: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      heading: "Cluster Approch",
      content: "The Cluster Approach is used for coordinating in non-refugee humanitarian emergencies. Humanitarian organisations have agreed to lead certain clusters at global level (see the chart), and have defined a cluster structure for non-refugee humanitarian responses at country level",
      date: "26 june 2022",
      catogary: "cluster",
      comments:"10 comments"
    },
    {
      image: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      heading: "Image Deployer",
      content: "The Cluster Approach is used for coordinating in non-refugee humanitarian emergencies. Humanitarian organisations have agreed to lead certain clusters at global level (see the chart), and have defined a cluster structure for non-refugee humanitarian responses at country level",
      date: "26 june 2021",
      catogary: "Deployer",
      comments:"10 comments"
    }
   ]

  const FormikCreateTopic = useFormik({
    initialValues: {
      name:""
    },
    onSubmit: (values) => {
      
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
          <Link as={RouterLink} _hover={{}} to="/create-blog">
            <Button rightIcon={<AddIcon />} color="white" _hover={{}} bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR}>Create Blog</Button></Link> 
        {
          BlogPostsDto.map((post,index) => {
            return <BlogPost
              image={post.image}
              catogary={post.catogary}
              comments={post.comments}
              content={post.content}
              date={post.date}
              heading={post.heading}
              key={index}
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
          <InputGroup>
              <Input type={"search"} name="name" onChange={FormikCreateTopic.handleChange}
                onBlur={FormikCreateTopic.handleBlur} value={FormikCreateTopic.values.name} placeholder="create" />
              <InputRightAddon bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR} cursor="pointer" _hover={{bgColor:"gray.200"}} onClick={handleCreateTopic} ><AddIcon/></InputRightAddon>
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
