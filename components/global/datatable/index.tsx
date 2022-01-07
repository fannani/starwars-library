import React, { useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/global/table';
import {
  Stack,
  Skeleton,
  useToast,
  Box,
  Flex,
  Text,
  Icon,
} from '@chakra-ui/react';
import { useTable, Column, usePagination } from 'react-table';
import { AiOutlineInbox } from 'react-icons/ai';
import Pagination from './pagination';

type DataTableProps = {
  columns: Column[];
  accessor: (data: any) => any;
  filters?: any;
  queryFunction?: any;
};

type RenderedDataTableProps = {
  columns: Column[];
  data: any;
  fetchData: (page: number) => void;
  pageCount: number;
};

const DataTable = ({
  columns,
  data,
  fetchData,
  pageCount,
}: RenderedDataTableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount,
    },
    usePagination
  );
  useEffect(() => {
    fetchData(pageIndex + 1);
  }, [fetchData, pageIndex, pageSize]);

  const renderRow = useCallback(
    (row, index) => {
      prepareRow(row);
      return (
        <TableRow {...row.getRowProps()}>
          {row.cells.map((cell: any) => (
            <TableCell key={index} {...cell.getCellProps()}>
              {cell.render('Cell')}
            </TableCell>
          ))}
        </TableRow>
      );
    },
    [prepareRow]
  );

  return (
    <>
      <Box overflowX="auto">
        <Table {...getTableProps()} overflowX="scroll">
          <TableHead>
            {headerGroups.map((headerGroup: any, index: number) => (
              <TableRow key={index} {...headerGroup.getHeaderGroupProps()} head>
                {headerGroup.headers.map((column: any, index: number) => (
                  <TableHeader
                    {...column.getHeaderProps()}
                    width={column.width}
                    key={index}
                  >
                    {column.render('Header')}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>{page.map(renderRow)}</TableBody>
        </Table>
        {data.length <= 0 && (
          <Flex direction="column" p={5} w="100%" align="center">
            <Icon as={AiOutlineInbox} boxSize={8} color="gray.300" />
            <Text color="gray.300" mt={1} fontSize={18}>
              No Data
            </Text>
          </Flex>
        )}
      </Box>
      {pageCount > 1 && (
        <Pagination
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          pageIndex={pageIndex}
          pageCount={pageCount}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
        />
      )}
    </>
  );
};

const DataTableQuery = ({
  columns,
  queryFunction,
  accessor,
}: DataTableProps) => {
  const toast = useToast();
  const perPage = 5;
  const { data, isLoading } = queryFunction(
    {},
    {
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const fetchData = () => {};

  if (isLoading)
    return (
      <Stack p={5} spacing={5}>
        <Skeleton h={5} />
        <Skeleton h={5} />
        <Skeleton h={5} />
        <Skeleton h={5} />
      </Stack>
    );

  return (
    <DataTable
      data={data ? accessor(data) : []}
      columns={columns}
      pageCount={data ? data?.totalCount / perPage : 1}
      fetchData={fetchData}
    />
  );
};

export default DataTableQuery;
