import React from 'react';
import { Skeleton } from '@chakra-ui/react';
import Detail, { DetailItem } from 'components/global/detail';
import { Container } from 'components/layout';
import { usePersonQuery } from 'graphql/generated/graphql';
import { useRouter } from 'next/router';
import { useSettings } from 'utils/settings';

const FilmDetailPage = () => {
  const { setBreadcrumb } = useSettings({
    breadcrumb: [
      {
        caption: 'Characters',
        href: '/characters',
      },
    ],
  });
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = usePersonQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
      onSuccess: (value) => {
        setBreadcrumb(1, {
          caption: value?.person?.name ?? '',
        });
      },
    }
  );

  return (
    <>
      <Container>
        <Detail>
          <DetailItem label="Name">
            <Skeleton isLoaded={!isLoading}>{data?.person?.name} </Skeleton>
          </DetailItem>
          <DetailItem label="Gender">
            <Skeleton isLoaded={!isLoading}>{data?.person?.gender}</Skeleton>
          </DetailItem>
          <DetailItem label="Birth year">
            <Skeleton isLoaded={!isLoading}>{data?.person?.birthYear}</Skeleton>
          </DetailItem>
          <DetailItem label="Hair color">
            <Skeleton isLoaded={!isLoading}>{data?.person?.hairColor}</Skeleton>
          </DetailItem>
          <DetailItem label="Height">
            <Skeleton isLoaded={!isLoading}>{data?.person?.height}</Skeleton>
          </DetailItem>
          <DetailItem label="Mass">
            <Skeleton isLoaded={!isLoading}>{data?.person?.mass}</Skeleton>
          </DetailItem>
          <DetailItem label="Species">
            <Skeleton isLoaded={!isLoading}>
              {data?.person?.species?.name}
            </Skeleton>
          </DetailItem>
        </Detail>
      </Container>
    </>
  );
};

export default FilmDetailPage;
