import React from 'react';
import { Text, GridItem, Divider } from '@chakra-ui/react';

type DetailItemProps = {
  label: string;
};

export const DetailItem: React.FC<DetailItemProps> = ({ children, label }) => (
  <>
    <GridItem>
      <Text px={5} fontWeight="bold">
        {label}
      </Text>
    </GridItem>
    <GridItem ml="5">{children}</GridItem>
    <GridItem colSpan={[1, 2]}>
      <Divider color="neutral" />
    </GridItem>
  </>
);
