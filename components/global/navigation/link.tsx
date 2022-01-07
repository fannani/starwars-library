import React, { PropsWithChildren } from 'react';
import NextLink from 'next/link';
import { Box, BoxProps } from '@chakra-ui/react';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';

export type NextChakraLinkProps = PropsWithChildren<
  NextLinkProps & Omit<BoxProps, 'as'>
>;
export const Link = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  ...chakraProps
}: NextChakraLinkProps) => (
  <NextLink
    href={href}
    as={as}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    prefetch={prefetch}
  >
    <Box cursor="pointer" {...chakraProps} />
  </NextLink>
);
