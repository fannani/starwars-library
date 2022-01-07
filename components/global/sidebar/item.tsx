import React, { FC } from 'react';
import { Flex, Text, Skeleton } from '@chakra-ui/react';
import { Link } from 'components/global/navigation/link';
import { activeMenuAtom } from 'states';
import { useAtom } from 'jotai';
import { IconType } from 'react-icons';

type SidebarItemProps = {
  icon: IconType;
  href?: string;
  text: string;
  isLoaded?: boolean;
  onClick?: any;
};

const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  href,
  text,
  isLoaded = true,
  onClick = () => {},
}) => {
  const Icon = icon;
  const [activeMenu] = useAtom(activeMenuAtom);
  const isActive = activeMenu === href;

  return (
    <Link href={href ?? '#'} onClick={onClick}>
      <Skeleton isLoaded={isLoaded}>
        <Flex align="center" mt={5}>
          <Icon color={isActive ? 'primary.500' : 'gray'} />
          <Text
            ml={3}
            fontWeight={500}
            color={isActive ? 'primary.500' : 'text'}
          >
            {text}
          </Text>
        </Flex>
      </Skeleton>
    </Link>
  );
};

export default SidebarItem;
