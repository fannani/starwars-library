import type { NextPage } from 'next';
import React from 'react';
import {
  AllFilmsQuery,
  Film,
  useAllFilmsQuery,
} from 'graphql/generated/graphql';
import DataTableQuery from 'components/global/datatable';
import { Column } from 'react-table';
import { Container } from 'components/layout';
import { HeaderPanel } from 'components/global/panel/header';
import NumberCell from 'components/global/datatable/cells/number';
import { IconButton } from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';
import { useRouter } from 'next/router';

const FilmsPage: NextPage = () => {
  const [filters, setFilters] = React.useState<Partial<Film>>({});
  const router = useRouter();

  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: 'No.',
        accessor: 'no',
        width: '10px',
        Cell: NumberCell,
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Director',
        accessor: 'director',
      },
      {
        Header: 'Release date',
        accessor: 'releaseDate',
      },
    ],
    []
  );

  const onSearch = (text: string) => {
    setFilters({
      title: text,
    });
  };

  return (
    <Container>
      <HeaderPanel onSearch={onSearch} />
      <DataTableQuery
        columns={columns}
        filters={filters}
        queryFunction={useAllFilmsQuery}
        accessor={(data: AllFilmsQuery) => data?.allFilms?.films}
        onRowClick={(data) => router.push(`/films/${data.id}`)}
      />
    </Container>
  );
};

export default FilmsPage;
