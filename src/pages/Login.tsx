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
    Text,
    useToast
} from "@chakra-ui/react";
import {Link} from 'react-router-dom'
import {useState} from "react";
import KubernetesLogo from '../assets/logo.png';
import {useFormik} from "formik";
import Values from "../interfaces/LoginFormValues.interface";
import * as yup from 'yup';
import { useLoginMutation } from "../services/auth.service";
import cookie from 'react-cookies';
import { useDispatch } from "react-redux";
import { addLoginInfo } from "../states/loginInfo";
import { AppDispatch } from "../store";



export default function Login() {
    const dispatch:AppDispatch = useDispatch();
    const toast = useToast();
    const [login] = useLoginMutation();
    const [show, setShow] = useState(false);
    const handleViewPassword = () => {
        show ? (setShow(false)) : setShow(true);
    }
    const initialValues: Values = {
        email: "",
        password: ""
    }
    const Formik = useFormik({
        initialValues: initialValues,
        onSubmit:async (values) => {
            login(values).then((res:any )=> {
                if (res.error) {
                    toast({
                        title: res.error.data.message,
                        isClosable: true,
                        duration: 3000,
                        position: "top",
                        status:"error"
                    }) 
                }
                if (res.data) {
                    toast({
                        title: "Login Successfully",
                        isClosable: true,
                        duration: 3000,
                        position: "top",
                        status:"success"
                    })
                    dispatch(addLoginInfo({
                        login: true,
                        token: res.data.token,
                        expireAt: res.data.expiresAt
                    }));
                    const date = new Date(res.data.expiresAt);
                    document.cookie = `token=${res.data.token}; expires=${date}; path=/`;
                }
            })
        },
         validationSchema: yup.object({
            email: yup.string().required("Email Required").email(),
            password:yup.string().required("Password Required")
        })
    });

    return (
        <Box bgGradient='linear(to-b,blue,blue.200)' w={"100%"} minH={"100vh"}  display={"flex"} flexDir="column" gap={4}
             justifyContent="center" alignItems={"center"}>
            <Image src={KubernetesLogo} alt="LOGO" w={"100px"}/>
            <Box p={4} borderRadius="2xl" bgColor={"white"} w={{"base": "100%", "md": "30%", "lg": "30%"}}>
                <Text color={"blue.500"} textAlign={"center"} fontSize="2xl">Login To Your Account</Text>
                <form onSubmit={Formik.handleSubmit}>
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
                        <Button type="submit" w={"100%"} colorScheme={"facebook"}>Login</Button>
                    </Box>
                </form>
                <Divider mt={5}/>
                <Box  mx={3} borderRadius={"lg"} display={"flex"} gap={2} justifyContent="center" paddingY={2} bgColor={"gray.100"}>
                    <Link to={"/register"}><ChakraLink fontSize={"md"} color={"blue.500"}>Create new account?</ChakraLink></Link>
                </Box>
            </Box>
            <Box>
                <ChakraLink color={"white"}>Forgot Password?</ChakraLink>
            </Box>
        </Box>
    )
}
