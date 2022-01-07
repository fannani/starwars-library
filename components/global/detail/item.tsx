import React from 'react';
import { Text, GridItem, Divider } from '@chakra-ui/react';

type DetailItemProps = {
  label: string;
};

export const DetailItem: React.FC<DetailItemProps> = ({ children, label }) => (
  <>
    <Text px={5} fontWeight="bold">
      {label}
    </Text>
    {children}
    <GridItem colSpan={3}>
      <Divider color="neutral" />
    </GridItem>
  </>
);
