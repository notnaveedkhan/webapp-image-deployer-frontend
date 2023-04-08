import { Badge, Box, Button, Divider, FormControl, FormHelperText, FormLabel, Heading, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import {GoTextSize} from 'react-icons/go'
import { FaBold } from 'react-icons/fa'
import { BiItalic, BiSend } from 'react-icons/bi'
import { ImLink } from 'react-icons/im'
import { FaQuoteRight } from 'react-icons/fa'
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { AiFillPicture, AiOutlineAlignCenter, AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { BsCardText, BsTable } from "react-icons/bs";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';


export default function CreateBlog() {
    // const [tags, setTags] = useState([]);
    interface BlogDto{
        title: string,
        content: string,
        tags: string[],
        tag:string
    }

    const initialValues: BlogDto = {
        title: "",
        content: "",
        tags: [''],
        tag:""
    }

    const Formik = useFormik({
        initialValues: initialValues,
        onSubmit: (value) => { 

        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title Field is Required"),
            content: Yup.string().min(100, "Minimum 100 lenght").required("content required"),
            tags:Yup.array()
      .of(Yup.string())
      .min(1, 'At least one email address is required'),
        })
    })


    const handleEnterPress = (e:React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if (Formik.values.tag) {
                if (!Formik.values.tags.includes(Formik.values.tag)) {
                   Formik.values.tags.concat(Formik.values.tag) 
                }
            }
        }
    }
    
    return (
        <>
            <Heading textAlign={"center"}>Write Your Blog</Heading>
            <form>
            <Box display={"flex"} w="100%" p={6} justifyContent="center">
          <Box mt={5} w="50%" bgColor={"white"} boxShadow="lg" borderRadius={"lg"} p={6} >
              <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="title" id="title" type={"text"} placeholder="Title"/>
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
                        
                        <FormControl my={3}>
                            <Textarea colorScheme={"teal"} variant={"unstyled"} rows={10} size={"lg"} placeholder="Write the blog body here..."/>
                        </FormControl>
                    </Box>
                    
                    <Box mt={3} border="1px" p={3} borderColor={"gray.300"} borderRadius={"lg"}>
                        <FormControl>
                            <FormLabel>Tags</FormLabel>
                            <Input value={Formik.values.tag} name="tag" onChange={Formik.handleChange} onBlur={Formik.handleBlur} onKeyDown={handleEnterPress} type={"search"} placeholder={"e.g (Deploment,Aws)"} />
                            </FormControl>
                            <Stack direction='row'>
                                {Formik.values.tags.map(tag => {
                                    return <Badge colorScheme='green'>{tag}</Badge>
                               })}
                                
                            </Stack>
                        </Box>
                        
                    <Button mt={3} w="100%" bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR} _hover={{}} color="white" rightIcon={<BiSend/>}>Publish</Button>
                    </Box>
                </Box>
                </form>
            </>
  )
}
