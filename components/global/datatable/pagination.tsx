import React from 'react';
import { Button, ButtonGroup, IconButton, Center } from '@chakra-ui/react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Pagination = ({
  gotoPage,
  previousPage,
  nextPage,
  pageIndex,
  pageCount,
  canNextPage,
  canPreviousPage,
}: any) => {
  const pages: React.ReactNode[] = [];

  for (let i = 0; i < pageCount; i += 1) {
    pages.push(
      <Button
        key={i + 1}
        color={pageIndex === i ? 'white' : 'gray.500'}
        colorScheme={pageIndex === i ? 'blue' : 'white'}
        onClick={() => gotoPage(i)}
      >
        {i + 1}
      </Button>
    );
  }
  return (
    <Center my={3}>
      <ButtonGroup
        boxShadow="0px 6px 12px rgba(160, 164, 168, 0.16)"
        size="sm"
        isAttached
      >
        <IconButton
          key={0}
          colorScheme="white"
          aria-label="prev"
          color="gray.500"
          isDisabled={!canPreviousPage}
          isActive={canPreviousPage}
          _active={{
            color: 'blue.500',
          }}
          onClick={() => previousPage()}
          icon={<FaChevronLeft />}
        />
        {pages}
        <IconButton
          aria-label="next"
          isDisabled={!canNextPage}
          isActive={canNextPage}
          colorScheme="white"
          color="gray.500"
          _active={{
            color: 'blue.500',
          }}
          key={pages.length + 1}
          onClick={() => nextPage()}
          icon={<FaChevronRight />}
        />
      </ButtonGroup>
    </Center>
  );
};

export default Pagination;
