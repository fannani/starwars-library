import React from 'react';
import { Text, GridItem, Divider } from '@chakra-ui/react';

type DetailItemProps = {
  label: string;
};

export const DetailItem: React.FC<DetailItemProps> = ({ children, label }) => (
  <>
    <Text color="primary.500" px={8} fontWeight="bold">
      {label}
    </Text>
    <Text>{children}</Text>
    <GridItem colSpan={3}>
      <Divider color="neutral" />
    </GridItem>
  </>
);
