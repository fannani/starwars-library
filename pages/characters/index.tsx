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
  useSettings();
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
        Header: 'Namse',
        accessor: 'name',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
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
              { value: 'all', caption: 'All' },
              { value: 'male', caption: 'Male' },
              { value: 'female', caption: 'Female' },
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
