import React from 'react';

import type { NextPage } from 'next';
import { Flex, Text, Icon } from '@chakra-ui/react';
import { Container } from 'components/layout';
import { useSettings } from 'utils/settings';
import Image from 'next/image';
import { FaBeer } from 'react-icons/fa';
import { Link } from 'components/global/navigation/link';
import { IconType } from 'react-icons';

type IconLinkProps = {
  href: string;
  caption: string;
  icon: IconType;
};

const IconLink: React.FC<IconLinkProps> = ({ href, caption, icon }) => {
  return (
    <Link
      boxShadow="lg"
      px="10"
      py="5"
      borderRadius="xl"
      _hover={{ bgColor: 'gray.100' }}
      href={href}
    >
      <Flex direction="column" alignItems="center">
        <Text fontSize="lg">{caption}</Text>
        <Icon mt="2" boxSize="12" as={icon} />
      </Flex>
    </Link>
  );
};

const Home: NextPage = () => {
  useSettings();
  return (
    <Container>
      <Flex direction="column" alignItems="center">
        <Image
          height={150}
          width={200}
          src="/star-wars.svg"
          alt="Logo star wars"
        />
        <Text maxW={500} fontSize="md" textAlign="center">
          Star Wars is an American epic space opera multimedia franchise created
          by George Lucas, which began with the eponymous 1977 film and quickly
          became a worldwide pop-culture phenomenon.
        </Text>
        <Flex mt="10" gap="10" flexWrap="wrap" justifyContent="center">
          <IconLink href="#" icon={FaBeer} caption="Character" />
          <IconLink href="#" icon={FaBeer} caption="Character" />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Home;
