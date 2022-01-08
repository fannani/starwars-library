import React, { FC } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import SidebarItem from 'components/global/sidebar/item';
import { FaBeer } from 'react-icons/fa';
import Sidebar from 'components/global/sidebar';
import { useAtom } from 'jotai';
import { breadcrumbAtom } from 'states';
import { FaChevronRight } from 'react-icons/fa';

const MainLayout: FC = ({ children }) => {
  const [breadcrumb] = useAtom(breadcrumbAtom);

  return (
    <Box backgroundColor="background" w="100%" overflowX="hidden">
      <Sidebar>
        <SidebarItem icon={FaBeer} text="Films" href="/films" />
        <SidebarItem icon={FaBeer} text="Characters" href="/characters" />
      </Sidebar>
      <Flex direction="column" ml={[0, 300]} minH="100vh" mt={[10, 0]}>
        <Flex justify="space-between" alignItems="center" p={5}>
          <Breadcrumb
            spacing="8px"
            display={['none', 'block']}
            separator={<FaChevronRight />}
          >
            {breadcrumb.map((item, index) => (
              <BreadcrumbItem
                isCurrentPage={index === breadcrumb.length - 1}
                key={index}
              >
                <Link href={item.href ?? '#'} passHref>
                  <BreadcrumbLink
                    as={Link}
                    color="text"
                    fontWeight={index === breadcrumb.length - 1 ? 500 : 400}
                  >
                    {item.caption}
                  </BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </Flex>
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
