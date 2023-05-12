//
import {EmailIcon, LockIcon, ViewOffIcon, ViewIcon} from "@chakra-ui/icons";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link as ChakraLink,
    Spinner,
    Text,
    useToast
} from "@chakra-ui/react";
import {Link, useNavigate} from 'react-router-dom'
import {useState} from "react";
import KubernetesLogo from '../assets/logo.png';
import {useFormik} from "formik";
import Values from "../interfaces/RegisterFormValue.interface";
import * as yup from 'yup';
import {useRegisterMutation} from "../services/auth.service"
export default function Register() {
    const [submitLoading,setSubmitLoading] = useState(false);
    const navigate = useNavigate();
     const toast = useToast();
    const [show, setShow] = useState(false);
    const [register] = useRegisterMutation();
    const handleViewPassword = () => {
        show ? (setShow(false)) : setShow(true);
    }
    const initialValues: Values = {
        name:"",
        email: "",
        password: ""
    }
    const Formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
             setSubmitLoading(true);
            register(values).then((res:any) => {
                if (res.data) {
                    toast({
                        title: `${res.data.message} redirect to login`,
                        isClosable: true,
                        duration: 3000,
                        position: "top",
                        status:"success"
                    }) 
                     setSubmitLoading(false);
                    setTimeout(() => {
                        navigate("/", { replace: true });
                    }, 3000);
                }
                if (res.error) {
                     toast({
                        title: res.error.data.message,
                        isClosable: true,
                        duration: 3000,
                        position: "top",
                        status:"error"
                     }) 
                    setSubmitLoading(false);
                }
            })
        },
        validationSchema: yup.object({
             name:yup.string().required("Name Required"),
            email: yup.string().required("Email Required").email(),
            password:yup.string().required("Password Required")
        })
    });
  return (
          <Box bgGradient='linear(to-b,blue,blue.200)' w={"100%"} minH={"100vh"}  display={"flex"} flexDir="column" gap={4}
             justifyContent="center" alignItems={"center"}>
            <Image src={KubernetesLogo} alt="LOGO" w={"100px"}/>
            <Box p={4} borderRadius="2xl" bgColor={"white"} w={{"base": "100%", "md": "30%", "lg": "30%"}}>
                <Text color={"blue.500"} textAlign={"center"} fontSize="2xl">Create Your Account</Text>
              <form onSubmit={Formik.handleSubmit}>
                  <FormControl p={3} isInvalid={Formik.touched.name && Formik.errors.name?true:false}>
                        <FormLabel fontSize={"sm"} color={"gray.500"}>Name</FormLabel>
                        <InputGroup>
                            <InputLeftElement px={2}><EmailIcon/></InputLeftElement>
                            <Input value={Formik.values.name} onBlur={Formik.handleBlur} name="name" id="name" onChange={Formik.handleChange} type={"text"} placeholder="Name"/>
                        </InputGroup>
                        <FormErrorMessage>{Formik.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl p={3} isInvalid={Formik.touched.email && Formik.errors.email?true:false}>
                        <FormLabel fontSize={"sm"} color={"gray.500"}>Email</FormLabel>
                        <InputGroup>
                            <InputLeftElement px={2}><EmailIcon/></InputLeftElement>
                            <Input value={Formik.values.email} onBlur={Formik.handleBlur} name="email" id="email" onChange={Formik.handleChange} type={"email"} placeholder="Email Address"/>
                        </InputGroup>
                        <FormErrorMessage>{Formik.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={Formik.touched.password && Formik.errors.password?true:false } p={3}>
                        <FormLabel fontSize={"sm"} color={"gray.500"}>Password</FormLabel>
                        <InputGroup>
                            <InputLeftElement px={2}><LockIcon/></InputLeftElement>
                            <Input value={Formik.values.password} onBlur={Formik.handleBlur}  name="password" onChange={Formik.handleChange} type={show ? "text" : "password"} placeholder="Password"/>
                            <InputRightElement onClick={handleViewPassword}>{show ? <ViewOffIcon/> : <ViewIcon/>}</InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{Formik.errors.password}</FormErrorMessage>
                    </FormControl>
                    <Box p={3}>
                        <Button type="submit" w={"100%"} colorScheme={"facebook"}>{submitLoading?<Spinner/>:"Register"}</Button>
                    </Box>
                </form>
                <Box  mx={3} borderRadius={"lg"} display={"flex"} gap={2} justifyContent="center" paddingY={2} bgColor={"gray.100"}>
                    <Link to={"/"}><ChakraLink fontSize={"md"} color={"blue.500"}>Already have a Account?</ChakraLink></Link>
                </Box>
            </Box>
        </Box>
  )
}
