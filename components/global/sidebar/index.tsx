import React, { LegacyRef, useRef, RefObject, FC } from 'react';
import {
  Flex,
  Heading,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
  DrawerHeader,
  IconButton,
  Text,
  Accordion,
} from '@chakra-ui/react';
import { FaBeer } from 'react-icons/fa';

const Sidebar: FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef() as LegacyRef<HTMLButtonElement>;
  let activeIndex;

  return (
    <>
      <Flex
        position="fixed"
        display={['flex', 'none']}
        background="white"
        w="100%"
        zIndex={100}
        p={2}
        boxShadow="md"
        align="center"
      >
        <IconButton
          icon={<FaBeer />}
          aria-label="Menu"
          ref={btnRef}
          size="lg"
          variant="ghost"
          colorScheme="teal"
          onClick={onOpen}
        >
          Open
        </IconButton>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef as RefObject<any>}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Flex>
                <Flex direction="column" px={5} justify="center">
                  <Heading as="h1" size="lg" textColor="logoText">
                    Star Wars
                  </Heading>
                  <Text fontSize="lg" textColor="logoText">
                    Library
                  </Text>
                </Flex>
              </Flex>
            </DrawerHeader>

            <DrawerBody p={0}>
              <VStack align="stretch" onClick={onClose} m={5}>
                <Accordion w="100%" allowToggle defaultIndex={activeIndex}>
                  {children}
                </Accordion>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Flex
        direction="column"
        w={300}
        p={5}
        height="100vh"
        position="fixed"
        boxShadow="md"
        backgroundColor="white"
        display={['none', 'block']}
      >
        <Flex>
          <Flex direction="column" px={5} justify="center">
            <Heading as="h1" size="lg" textColor="logoText">
              Star Wars
            </Heading>
            <Text fontSize="lg" textColor="logoText">
              Library
            </Text>
          </Flex>
        </Flex>
        <VStack m={5} align="stretch">
          <Accordion w="100%" allowToggle defaultIndex={activeIndex}>
            {children}
          </Accordion>
        </VStack>
      </Flex>
    </>
  );
};

export default Sidebar;
