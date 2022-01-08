import React from 'react';
import { Skeleton, Heading } from '@chakra-ui/react';
import DataTableQuery from 'components/global/datatable';
import Detail, { DetailItem } from 'components/global/detail';
import { HeaderPanel } from 'components/global/panel/header';
import { Container } from 'components/layout';
import { useFilmQuery, Person } from 'graphql/generated/graphql';
import { useRouter } from 'next/router';
import { Column } from 'react-table';
import { useSettings } from 'utils/settings';
import NumberCell from 'components/global/datatable/cells/number';

const FilmDetailPage = () => {
  const { setBreadcrumb } = useSettings({
    breadcrumb: [
      {
        caption: 'Films',
        href: '/films',
      },
    ],
  });
  const router = useRouter();
  const { id } = router.query;
  const [filters, setFilters] = React.useState<Partial<Person>>({});
  const [search, setSearch] = React.useState<Partial<Person>>({});
  const { data, isLoading, isSuccess } = useFilmQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
      onSuccess: (value) => {
        setBreadcrumb(1, {
          caption: value?.film?.title ?? '',
        });
      },
    }
  );

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
    <>
      <Container>
        <Detail>
          <DetailItem label="Title">
            <Skeleton isLoaded={!isLoading}>{data?.film?.title} </Skeleton>
          </DetailItem>
          <DetailItem label="Release date">
            <Skeleton isLoaded={!isLoading}>{data?.film?.releaseDate}</Skeleton>
          </DetailItem>
          <DetailItem label="Director">
            <Skeleton isLoaded={!isLoading}>{data?.film?.director} </Skeleton>
          </DetailItem>
          <DetailItem label="Producers">
            <Skeleton isLoaded={!isLoading}>{data?.film?.producers} </Skeleton>
          </DetailItem>
          <DetailItem label="Opening crawl">
            <Skeleton isLoaded={!isLoading}>
              {data?.film?.openingCrawl}{' '}
            </Skeleton>
          </DetailItem>
        </Detail>
      </Container>
      <Container>
        <Heading size="md" as="h3" px={8} py="3" fontWeight="bold">
          Characters in film
        </Heading>
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
          pageSize={5}
          isLoading={isLoading || !isSuccess}
          columns={columns}
          search={search}
          filters={filters}
          onRowClick={(data) => router.push(`/characters/${data.id}`)}
          data={data?.film?.characterConnection?.characters}
        />
      </Container>
    </>
  );
};

export default FilmDetailPage;
