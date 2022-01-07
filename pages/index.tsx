import type { NextPage } from 'next';
import React from 'react';
import { AllPeopleQuery, useAllPeopleQuery } from 'graphql/generated/graphql';
import DataTableQuery from 'components/global/datatable';
import { Column } from 'react-table';
import { Container } from 'components/layout';
import HeaderPanel from 'components/global/panel/header';

const Home: NextPage = () => {
  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
    ],
    []
  );

  return (
    <Container>
      <HeaderPanel />
      <DataTableQuery
        columns={columns}
        queryFunction={useAllPeopleQuery}
        accessor={(data: AllPeopleQuery) => data?.allPeople?.people}
      />
    </Container>
  );
};

export default Home;
