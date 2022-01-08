import React from 'react';
import { Grid, Box } from '@chakra-ui/react';

export { DetailItem } from './item';

const Detail: React.FC = ({ children }) => (
  <Box p={3}>
    <Grid
      templateColumns={['1fr', 'auto 1fr']}
      columnGap={12}
      rowGap={5}
      mt={5}
      mr={5}
    >
      {children}
    </Grid>
  </Box>
);

export default Detail;
