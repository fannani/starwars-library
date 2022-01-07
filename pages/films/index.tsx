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
import HeaderPanel from 'components/global/panel/header';

const FilmsPage: NextPage = () => {
  const [filters, setFilters] = React.useState<Partial<Film>>({});

  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
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
      />
    </Container>
  );
};

export default FilmsPage;
