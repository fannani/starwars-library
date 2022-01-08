import type { NextPage } from 'next';
import React from 'react';
import {
  useAllPeopleQuery,
  AllPeopleQuery,
  Person,
} from 'graphql/generated/graphql';
import DataTableQuery from 'components/global/datatable';
import { Column } from 'react-table';
import { Container } from 'components/layout';
import { HeaderPanel } from 'components/global/panel/header';
import NumberCell from 'components/global/datatable/cells/number';

import { useRouter } from 'next/router';
import { useSettings } from 'utils/settings';

const CharactersPage: NextPage = () => {
  useSettings({
    breadcrumb: [
      {
        caption: 'Characters',
      },
    ],
  });
  const [filters, setFilters] = React.useState<Partial<Person>>({});
  const [search, setSearch] = React.useState<Partial<Person>>({});
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
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Birth Year',
        accessor: 'birthYear',
      },
      {
        Header: 'Species',
        accessor: 'species.name',
      },
    ],
    []
  );

  const onSearch = (text: string) => {
    setSearch({
      name: text,
    });
  };
  const onFilter = (filter: Partial<Person>) => {
    setFilters(filter);
  };

  return (
    <Container>
      <HeaderPanel
        onSearch={onSearch}
        onFilter={onFilter}
        filters={[
          {
            name: 'gender',
            options: [
              { value: 'all', caption: 'All Gender' },
              { value: 'male', caption: 'Male' },
              { value: 'female', caption: 'Female' },
              { value: 'n/a', caption: 'n/a' },
            ],
          },
          {
            name: 'skinColor',
            options: [
              { value: 'all', caption: 'All Skin' },
              { value: 'green', caption: 'Green' },
              { value: 'fair', caption: 'Fair' },
              { value: 'light', caption: 'Light' },
            ],
          },
        ]}
      />
      <DataTableQuery
        columns={columns}
        filters={filters}
        search={search}
        queryFunction={useAllPeopleQuery}
        accessor={(data: AllPeopleQuery) => data?.allPeople?.people}
        onRowClick={(data) => router.push(`/characters/${data.id}`)}
      />
    </Container>
  );
};

export default CharactersPage;
