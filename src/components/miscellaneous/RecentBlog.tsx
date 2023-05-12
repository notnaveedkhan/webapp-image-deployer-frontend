import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react";
import { HiOutlineDotsVertical,HiOutlineExternalLink } from "react-icons/hi";
import { RxDragHandleDots1 } from "react-icons/rx";
import {Link as RouterLink } from 'react-router-dom';
import {useLatestBlogQuery} from "../../services/blog.service";
import {useEffect, useLayoutEffect, useState} from "react";


export default function RecentBlog() {
    const [latestBlog,setLatestBlog]=useState<any[]>([])
    const {data,isSuccess}=useLatestBlogQuery({})
    useLayoutEffect(()=> {
        if (isSuccess) {
            setLatestBlog(data)
        }
    },[isSuccess]);

  return (
      <Box w={"50%"}  minH="200px" boxShadow={"md"} bgColor="white">
                    <Box bgColor={"gray.300"} p={3} display={"flex"} justifyContent={"space-between"} alignItems="center">
                        <Box display={"flex"} alignItems="center" gap={2}>
                            <RxDragHandleDots1 fontSize={"20px"}/>
                            <Text>Recent Blog Post</Text>
                            <Text fontSize={"x-small"} color="blue.500">info</Text>
                        </Box>
                        <HiOutlineDotsVertical/>
          </Box>
          <Box>
              {
                  latestBlog.length>0?latestBlog.map((blog:any,index:number)=>{
                      return(
                          <>
                          <Box key={blog.id} p={4} mt={2} display="flex" gap={4} alignItems="center">
                              <Box>
                                  <Text color={"gray.500"}>{blog.createdAt.split(" ")[1]}</Text>
                                  <Heading fontSize={"lg"} >{blog.createdAt.split(" ")[0]}</Heading>
                              </Box>
                              <Heading fontSize={"md"} color="blue.500"><Link>{blog.title}</Link> </Heading>
                          </Box>
                              {
                                  index<latestBlog.length-1?<Divider/>:null
                              }
                          </>
                      )
                  }):<Box display="flex" justifyContent={"center"} alignItems="center" height={"100%"}><Text>No Blog Post</Text></Box>
              }
              <Divider />
             <Box p={4} mt={2} display="flex" gap={4} alignItems="center">
                  <Box>
                      <Text color={"gray.500"}>MAR</Text>
                      <Heading fontSize={"lg"} >25</Heading>
                  </Box>
                  <Heading fontSize={"md"} color="blue.500"><Link>Fast, simple,cost efficent data warehouse that can extend quires to your data lake</Link> </Heading>
              </Box>
          </Box>
          <Divider mt={4}/>
           <Link as={RouterLink} to={"/blogs"}  paddingY={3} display="flex" justifyContent={"center"} alignItems="center" color={"blue.500"}>view all blog post<HiOutlineExternalLink/></Link>
                </Box>
  )
}
