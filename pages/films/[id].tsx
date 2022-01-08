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
        Header: 'Name',
        accessor: 'name',
      },
    ],
    []
  );

  const onSearch = (text: string) => {
    setFilters({
      name: text,
    });
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
        </Detail>
      </Container>
      <Container>
        <Heading size="md" as="h3" px={8} py="3" fontWeight="bold">
          Characters in film
        </Heading>
        <HeaderPanel onSearch={onSearch} />
        <DataTableQuery
          pageSize={5}
          isLoading={isLoading || !isSuccess}
          columns={columns}
          filters={filters}
          data={data?.film?.characterConnection?.characters}
        />
      </Container>
    </>
  );
};

export default FilmDetailPage;
