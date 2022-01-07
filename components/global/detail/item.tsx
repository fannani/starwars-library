import React from 'react';
import { Text, GridItem, Divider, Box } from '@chakra-ui/react';

type DetailItemProps = {
  label: string;
};

export const DetailItem: React.FC<DetailItemProps> = ({ children, label }) => (
  <>
    <Text px={5} fontWeight="bold">
      {label}
    </Text>
    <Box>{children}</Box>
    <GridItem colSpan={3}>
      <Divider color="neutral" />
    </GridItem>
  </>
);
