import React from 'react';
import { Text } from '@chakra-ui/react';

type Row = {
  index: number;
};

type State = {
  pageIndex: number;
  pageSize: number;
};

type NumberCellProps = {
  row: Row;
  state: State;
};

const NumberCell: React.FC<NumberCellProps> = ({ row, state }) => (
  <Text fontWeight={500} fontSize="sm">
    {state.pageIndex * state.pageSize + row.index + 1}
  </Text>
);

export default NumberCell;
