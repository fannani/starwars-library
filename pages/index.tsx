import type { NextPage } from 'next';
import React from 'react';
import { AllPeopleQuery, useAllPeopleQuery } from 'graphql/generated/graphql';
import DataTableQuery from 'components/global/datatable';
import { Column } from 'react-table';
import { Container } from 'components/layout';
import HeaderPanel from 'components/global/panel/header';

const Home: NextPage = () => {
  const [filters, setFilters] = React.useState([]);

  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
    ],
    []
  );

  const onSearch = (text) => {
    setFilters({
      name: text,
    });
  };

  return (
    <Container>
      <HeaderPanel onSearch={onSearch} />
      <DataTableQuery
        columns={columns}
        filters={filters}
        queryFunction={useAllPeopleQuery}
        accessor={(data: AllPeopleQuery) => data?.allPeople?.people}
      />
    </Container>
  );
};

export default Home;
