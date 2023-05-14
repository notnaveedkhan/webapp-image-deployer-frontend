import { Badge, Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spinner, Text, Textarea, useToast } from "@chakra-ui/react";
import {GoTextSize} from 'react-icons/go'
import { FaBold ,FaQuoteRight } from 'react-icons/fa'
import { BiItalic, BiSend } from 'react-icons/bi'
import { ImCross, ImLink } from 'react-icons/im'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, WarningIcon } from "@chakra-ui/icons";
import { AiFillPicture, AiOutlineAlignCenter, AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { BsCardText, BsTable } from "react-icons/bs";
import React, { useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useCreateBlogMutation,CreateBlogBody} from '../services/blog.service'
import { useAllTopicsQuery } from "../services/topic.service";
import {useNavigate} from "react-router-dom";


export default function CreateBlog() {
    const navigate = useNavigate();
    const [addedTopics,setAddedTopics] = useState<any[]>([]);
    const [filterArray,setFilterArray]=useState([])
    const [isOpen,setIsOpen]=useState(true)
    const [submitLoading,setSubmitLoading] = useState(false);
    const [CreateBlog] = useCreateBlogMutation();
    const toast = useToast();
    const { data } = useAllTopicsQuery({});
   
    interface BlogDto{
        title: string,
        content: string,
        tag:string
    }

    const initialValues: BlogDto = {
        title: "",
        content: "",
        tag:""
    }

    const Formik = useFormik({
        initialValues: initialValues,
        onSubmit: (value) => {
            setSubmitLoading(true)
            const topics: number[] = []
            addedTopics.forEach((topic) => {
                topics.push(topic.id);
            })
            const body: CreateBlogBody = {
                title: value.title,
                content: value.content,
                topics:topics
            }
            console.log(body)
            CreateBlog(body).then((res:any) => {
                if (res.data) {
                    console.table(res.data)
                    setSubmitLoading(false)
                     toast({
                        title: "Successfully Created Blog",
                        position: "top",
                        isClosable: true,
                        duration: 3000,
                        icon: <CheckIcon />,
                        status:"success"
                    })
                    navigate("/blogs",{replace:true});
                }
                if (res.error) {
                    toast({
                        title: res.error.data.message ||res.error.data.error  ,
                        position: "top",
                        isClosable: true,
                        duration: 3000,
                        icon: <WarningIcon />,
                        
                    })
                    console.table(res.error.data)
                    setSubmitLoading(false)
                }
            })
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title Field is Required"),
            content: Yup.string().min(100, "Minimum 100 lenght").required("content required"),
        })
    })

    const handleClickToAdded = (topic:any) => {
        setAddedTopics([...addedTopics, topic])
        setIsOpen(true)
    }

    const handleTopicOnChange = (e: React.ChangeEvent) => {
        Formik.handleChange(e);
        setIsOpen(false)
        const newArray = data.filter((topic:any) => topic.name.toLowerCase().includes(Formik.values.tag.toLowerCase()));
        setFilterArray(newArray)    
    }
    const handleRemoveTag = (topic:any): void => {
       const newArray=addedTopics.filter((item) => item.id !== topic.id)
       setAddedTopics(newArray)
    }

    
    return (
        <>
            <Heading textAlign={"center"}>Write Your Blog</Heading>
            <form onSubmit={Formik.handleSubmit} >
            <Box display={"flex"} w="100%" p={{base:2,md:6}} justifyContent="center">
          <Box mt={5} w={{base:'100%',md: "50%"}} bgColor={"white"} boxShadow="lg" borderRadius={"lg"} p={6} >
              <FormControl isInvalid={Formik.touched.title && Formik.errors.title?true:false}>
                  <FormLabel>Title</FormLabel>
                            <Input onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="title" id="title" type={"text"} placeholder="Title" />
                             <FormErrorMessage>{Formik.errors.title}</FormErrorMessage>
              </FormControl>
                    <Box p={2} border={"1px"} borderColor={"gray.300"} borderRadius={"lg"} mt={3}>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Box display={"flex"} gap={{base:0,md:2}}>
                                <GoTextSize />
                                <FaBold />
                                <BiItalic />
                                <Text letterSpacing={"-10px"}><ChevronLeftIcon /> <ChevronRightIcon /> </Text>
                                <ImLink />
                                <FaQuoteRight />
                                <AiFillPicture />
                                <BsTable />
                                <AiOutlineOrderedList />
                                <AiOutlineUnorderedList />
                                <AiOutlineAlignCenter/>
                            </Box>

                            <Box display={"flex"} gap={2}>
                              <BsCardText/>
                              <BsCardText/>
                              <BsCardText/>
                            </Box>
                        </Box>
                        <Divider />
                        
                        <FormControl my={3} isInvalid={Formik.touched.content && Formik.errors.content?true:false}>
                                <Textarea name="content" id="content" onChange={Formik.handleChange} onBlur={Formik.handleBlur} colorScheme={"teal"} variant={"unstyled"} rows={10} size={"lg"} placeholder="Write the blog body here..." />
                                 <FormErrorMessage>{Formik.errors.content}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Box mt={3} border="1px" p={3} position="relative" borderColor={"gray.300"} borderRadius={"lg"}>
                                 <FormControl>
                                <FormLabel>Tags</FormLabel>
                                <Input value={Formik.values.tag} name="tag" onChange={handleTopicOnChange} type={"search"} placeholder={"e.g (Deploment,Aws)"} />
                            </FormControl>
                            <Box p={3} zIndex={1000} bgColor={"white"} boxShadow="lg" borderRadius={"lg"} display={isOpen ?"none":"block"} position={"absolute"}  w="50%">
                                {
                                    filterArray.length > 0 ? (
                                        filterArray.map((topic: any) => {
                                            return <Box p={2} _hover={{ bgColor: "gray.100" }} cursor={"pointer"} key={topic.id} onClick={() =>handleClickToAdded(topic)}>
                                                <Text>{topic.name}</Text>
                                            </Box>
                                        
                                         })
                                    ):null
                                }
                                
                            </Box>
                            <Flex wrap={"wrap"} gap={2} m={4}>
                                {addedTopics.map((topic:any) => {
                                    return <Badge key={topic.id} w="fit-content" p={1} px={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={1} borderRadius={"3xl"} colorScheme='green' textTransform={"capitalize"}>
                                    {topic.name}
                                    <ImCross size={"10px"} style={{cursor:"pointer"}} onClick={()=>handleRemoveTag(topic)}/>
                                </Badge>
                               })}  
                            </Flex>
                        </Box>
                        
                        <Button type="submit" mt={3} w="100%" bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR} _hover={{}} color="white" rightIcon={!submitLoading ? <BiSend />:undefined}>{ submitLoading?<Spinner/>:"Publish"}</Button>
                    </Box>
                </Box>
                </form>
            </>
  )
}
