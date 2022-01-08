import React, { useEffect, useCallback, useState } from 'react';
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

type DataTableQueryProps = {
  columns: Column[];
  accessor?: (data: any) => any;
  filters?: any;
  search?: any;
  queryFunction?: any;
  data?: any;
  isLoading?: boolean;
  pageSize?: number;
  onRowClick?: (data: any) => void;
};

type DataTableProps = {
  columns: Column[];
  data: any;
  pageSize?: number;
  onRowClick?: (data: any) => void;
};

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  pageSize = 10,
  onRowClick,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    previousPage,
    pageOptions,
    nextPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize,
      },
    },
    usePagination
  );

  const renderRow = useCallback(
    (row, index) => {
      prepareRow(row);
      return (
        <TableRow
          onClick={() => onRowClick && onRowClick(row.original)}
          {...row.getRowProps()}
        >
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
      {pageOptions.length > 1 && (
        <Pagination
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          pageIndex={pageIndex}
          pageCount={pageOptions.length}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
        />
      )}
    </>
  );
};

const searchData = (data: any[], filters: any[]) => {
  const arrayFilter = Object.entries(filters);
  const result = data.filter((value: any) => {
    for (const filter of arrayFilter) {
      if (value[filter[0]].toLowerCase().includes(filter[1])) return true;
    }
    return false;
  });
  return result;
};

const filterData = (data: any[], filters: any[]) => {
  const arrayFilter = Object.entries(filters);
  const result = data.filter((value: any) => {
    for (const filter of arrayFilter) {
      if (value[filter[0]] !== filter[1]) return false;
    }
    return true;
  });
  return result;
};

const DataTableQuery: React.FC<DataTableQueryProps> = ({
  columns,
  queryFunction = () => ({ data: null }),
  accessor = (data) => data,
  filters,
  search,
  isLoading = false,
  pageSize = 10,
  data: preloadData,
  onRowClick,
}) => {
  const toast = useToast();
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const {
    data,
    isLoading: queryLoading,
    isRefetching,
  } = queryFunction(
    {},
    {
      enabled: !preloadData,
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.log(`Fetching data error: ${error.message}`);
      },
    }
  );

  const updateFilteredData = () => {
    let savedData = accessor(preloadData ?? data);
    if (search) savedData = searchData(savedData, search);
    if (filters) savedData = filterData(savedData, filters);
    setFilteredData(savedData);
  };

  useEffect(() => {
    if (!isLoading && !queryLoading) {
      updateFilteredData();
    }
  }, [preloadData, data, isLoading]);

  useEffect(() => {
    if (preloadData || data) {
      updateFilteredData();
    }
  }, [search, filters]);

  if (((queryLoading || isRefetching) && !preloadData) || isLoading)
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
      onRowClick={onRowClick}
      data={filteredData}
      pageSize={pageSize}
      columns={columns}
    />
  );
};

export default DataTableQuery;
