import React from 'react';
import { BoxProps, chakra } from '@chakra-ui/react';

export function Table(props: BoxProps) {
  return <chakra.table {...props} width="full" />;
}

export function TableHead(props: BoxProps) {
  return <chakra.thead {...props} />;
}

interface TableRowProps extends BoxProps {
  head?: boolean;
  isDragging?: boolean;
}

export const TableRow: React.FC<TableRowProps> = React.memo(
  React.forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ head = false, isDragging, ...props }, ref) => {
      return (
        <chakra.tr
          ref={ref}
          borderColor="rgba(16, 30, 115, 0.04)"
          borderBottomWidth={head ? 0 : 10}
          marginBottom={head ? 10 : 0}
          backgroundColor="white"
          opacity={isDragging ? 0.5 : 1}
          {...props}
        />
      );
    }
  )
);

export function TableHeader(props: BoxProps) {
  return (
    <chakra.th
      px="6"
      py="3"
      backgroundColor="white"
      textAlign="left"
      marginBottom={10}
      fontSize="xs"
      color="gray.500"
      textTransform="uppercase"
      letterSpacing="wider"
      lineHeight="1rem"
      fontWeight="medium"
      {...props}
    />
  );
}

export function TableBody(props: BoxProps) {
  return <chakra.tbody {...props} />;
}

export const TableCell = React.memo((props: BoxProps) => (
  <chakra.td
    px="6"
    py="4"
    lineHeight="1.25rem"
    whiteSpace="nowrap"
    {...props}
  />
));

export default Table;
