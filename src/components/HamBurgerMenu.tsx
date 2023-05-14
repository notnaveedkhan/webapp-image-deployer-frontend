import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay, Input, Link, useDisclosure
} from "@chakra-ui/react";
import {useRef} from "react";
import {Link as RouterLink} from "react-router-dom";
import {HamburgerIcon} from "@chakra-ui/icons";

const HamBurgerMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef(null)
    return (
                <>
                    <Button display={{base:'block',md:'none'}} ref={btnRef} bgColor={'inherit'} onClick={onOpen}>
                        <HamburgerIcon/>
                    </Button>
                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        onClose={onClose}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader></DrawerHeader>
                            <DrawerBody>
                                <Box display={"flex"} flexDir={'column'} gap={5} cursor="pointer">
                                    <Link onClick={onClose} as={RouterLink} to={"/"}  _hover={{ }}>Dashboard</Link>
                                    <Link onClick={onClose} as={RouterLink} to={"/cluster"} _hover={{ }}>Clusters</Link>
                                    <Link as={RouterLink} to={"/"} _hover={{  }}>Deploments</Link>
                                    <Link as={RouterLink} to={"/blogs"}  _hover={{  }}>Blogs</Link>
                                    <Link as={RouterLink} to={"/about"}  _hover={{}}>About</Link>
                                </Box>
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='blue'>Save</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </>
    )
}

export default HamBurgerMenu;