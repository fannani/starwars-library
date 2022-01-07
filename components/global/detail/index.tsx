import React from 'react';
import { Grid } from '@chakra-ui/react';

export { DetailItem } from './item';

const Detail = ({ children }) => (
  <Grid templateColumns="auto 1fr auto" columnGap={12} rowGap={5} mt={5} mr={5}>
    {children}
  </Grid>
);

export default Detail;
