import React from 'react';
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

type SearchInputType = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
};

const SearchInput: React.FC<SearchInputType> = ({
  onChange,
  value,
  ...props
}) => (
  <Box>
    <InputGroup
      size="md"
      border="0px"
      borderRadius={20}
      maxW={300}
      {...props}
      boxShadow="0px 4px 16px rgba(16, 30, 115, 0.08)"
    >
      <InputLeftElement pointerEvents="none">
        <Icon as={FaSearch} color="gray" />
      </InputLeftElement>
      <Input
        placeholder="Search"
        border="0px"
        onChange={onChange}
        value={value}
      />
    </InputGroup>
  </Box>
);

export default SearchInput;
