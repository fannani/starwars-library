import { Box, Skeleton } from '@chakra-ui/react';
import Detail, { DetailItem } from 'components/global/detail';
import { useFilmQuery } from 'graphql/generated/graphql';
import { useRouter } from 'next/router';

const FilmDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useFilmQuery({
    id: id as string,
  });
  return (
    <>
      <Box
        m={5}
        px={3}
        pt={3}
        backgroundColor="white"
        direction="column"
        boxShadow="0px 12px 26px rgba(16, 30, 115, 0.06);"
      >
        <Detail>
          <DetailItem label="Title">
            <Skeleton isLoaded={!isLoading}>{data?.film?.title} </Skeleton>
          </DetailItem>
        </Detail>
      </Box>
    </>
  );
};

export default FilmDetail;
