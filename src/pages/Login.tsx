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
    Link,
    Text
} from "@chakra-ui/react";
import {useState} from "react";
import KubernetesLogo from '../assets/logo.png';
import {useFormik} from "formik";
import Values from "../interfaces/FormValues.interface";

export default function Login() {
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
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const {handleChange, handleSubmit} = Formik;


    return (
        <Box bgGradient='linear(to-b,blue,blue.200)' w={"100%"} h={"100vh"} display={"flex"} flexDir="column" gap={4}
             justifyContent="center" alignItems={"center"}>
            <Image src={KubernetesLogo} alt="LOGO" w={"100px"}/>
            <Box p={4} borderRadius="2xl" bgColor={"white"} w={{"base": "100%", "md": "30%", "lg": "30%"}}>
                <Text color={"blue.500"} textAlign={"center"} fontSize="2xl">Login To Your Account</Text>
                <form onSubmit={handleSubmit}>
                    <FormControl p={3}>
                        <FormLabel fontSize={"sm"} color={"gray.500"}>Email</FormLabel>
                        <InputGroup>
                            <InputLeftElement px={2}><EmailIcon/> </InputLeftElement>
                            <Input name="email" id="email" onChange={handleChange} type={"email"}
                                   placeholder="Email Address"/>
                        </InputGroup>
                        <FormErrorMessage>Error</FormErrorMessage>
                    </FormControl>
                    <FormControl p={3}>
                        <FormLabel fontSize={"sm"} color={"gray.500"}>Password</FormLabel>
                        <InputGroup>
                            <InputLeftElement px={2}><LockIcon/></InputLeftElement>
                            <Input name="password" id="password" onChange={handleChange}
                                   type={show ? "text" : "password"} placeholder="Password"/>
                            <InputRightElement onClick={handleViewPassword}>{show ? <ViewOffIcon/> :
                                <ViewIcon/>}</InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Box p={3}>
                        <Button type="submit" w={"100%"} colorScheme={"facebook"}>Login</Button>
                    </Box>
                </form>
                <Divider mt={5}/>
                <Box display={"flex"} gap={2} justifyContent="center" paddingY={3} bgColor={"gray.100"}>
                    <Link fontSize={"md"} color={"blue.500"}>Create new account?</Link>
                </Box>
            </Box>
            <Box>
                <Link color={"white"}>Forgot Password?</Link>
            </Box>
        </Box>
    )
}
