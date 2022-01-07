import React from 'react';
import { Text } from '@chakra-ui/react';

const NumberCell = ({ row, state }: any) => (
  <Text fontWeight={500} fontSize="sm">
    {state.pageIndex * state.pageSize + row.index + 1}
  </Text>
);

export default NumberCell;
