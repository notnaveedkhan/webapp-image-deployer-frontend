import { Badge, Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Spinner, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import {GoTextSize} from 'react-icons/go'
import { FaBold } from 'react-icons/fa'
import { BiItalic, BiSend } from 'react-icons/bi'
import { ImCross, ImLink } from 'react-icons/im'
import { FaQuoteRight } from 'react-icons/fa'
import { ChevronLeftIcon, ChevronRightIcon, WarningIcon } from "@chakra-ui/icons";
import { AiFillPicture, AiOutlineAlignCenter, AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { BsCardText, BsTable } from "react-icons/bs";
import {useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useCreateBlogMutation,CreateBlogBody} from '../services/blog.service'


export default function CreateBlog() {
    const [submitLoading,setSubmitLoading] = useState(false);
    const [tags, setTags] = useState<String[]>([]);
    const [CreateBlog] = useCreateBlogMutation();
    const toast = useToast();
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
            const body: CreateBlogBody = {
                title: value.title,
                content: value.content,
                topics:[1]
            }
            CreateBlog(body).then((res:any) => {
                if (res.data) {
                    console.table(res.data)
                    setSubmitLoading(false)
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

    const handleEnterPress = (e:React.KeyboardEvent) => {
        if (e.key === "Enter") {           
            if (Formik.values.tag) {
                if (!tags.includes(Formik.values.tag)) {
                    setTags([...tags, Formik.values.tag])
                    // setFieldValue("tag",'')
                }        
            }   
        }
    }

    const handleRemoveTag = (tag:String): void => {
        const tagIndex=tags.indexOf(tag);
        console.log(tagIndex)
        const updateTags = [...tags]
        updateTags.splice(tagIndex, 1);
        setTags(updateTags)
        
    }
    
    return (
        <>
            <Heading textAlign={"center"}>Write Your Blog</Heading>
            <form onSubmit={Formik.handleSubmit}>
            <Box display={"flex"} w="100%" p={6} justifyContent="center">
          <Box mt={5} w="50%" bgColor={"white"} boxShadow="lg" borderRadius={"lg"} p={6} >
              <FormControl isInvalid={Formik.touched.title && Formik.errors.title?true:false}>
                  <FormLabel>Title</FormLabel>
                            <Input onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="title" id="title" type={"text"} placeholder="Title" />
                             <FormErrorMessage>{Formik.errors.title}</FormErrorMessage>
              </FormControl>
                    <Box p={2} border={"1px"} borderColor={"gray.300"} borderRadius={"lg"} mt={3}>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Box display={"flex"} gap={2}>
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
                    
                    <Box mt={3} border="1px" p={3} borderColor={"gray.300"} borderRadius={"lg"}>
                        <FormControl>
                            <FormLabel>Tags</FormLabel>
                            <Input value={Formik.values.tag} name="tag" onChange={Formik.handleChange} onBlur={Formik.handleBlur} onKeyDown={handleEnterPress} type={"search"} placeholder={"e.g (Deploment,Aws)"} />
                            </FormControl>
                            <Flex wrap={"wrap"} gap={5} m={4}>
                                {tags.map((tag,index) => {
                                    return <Badge key={index} flex={"10%"} p={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={4} borderRadius={"3xl"} colorScheme='green'>
                                    {tag}
                                    <ImCross style={{cursor:"pointer"}} onClick={()=>handleRemoveTag(tag)}/>
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
