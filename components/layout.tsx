import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import SidebarItem from 'components/global/sidebar/item';
import { FaBeer } from 'react-icons/fa';
import Sidebar from 'components/global/sidebar';

const MainLayout: FC = ({ children }) => {
  return (
    <Box backgroundColor="background" w="100%" overflowX="hidden">
      <Sidebar>
        <SidebarItem icon={FaBeer} text="Films" href="/films" />
      </Sidebar>
      <Flex direction="column" ml={[0, 300]} minH="100vh" mt={[10, 0]}>
        <Box
          overflowX={['scroll', 'visible']}
          width="100%"
          position="relative"
          flex={1}
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export const Container: FC = (props) => (
  <Box
    m={5}
    p={5}
    backgroundColor="white"
    direction="column"
    overflowX="auto"
    boxShadow="0px 12px 26px rgba(16, 30, 115, 0.06);"
    {...props}
  />
);

export default MainLayout;
