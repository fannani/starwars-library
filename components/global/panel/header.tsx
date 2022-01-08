import SearchInput from 'components/global/input/search';
import { Box, Button, Flex, Select, Wrap } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';

type Filter = {
  name: string;
  captionKey?: string;
  valueKey?: string;
  options?: any[];
};

type HeaderPanelProps = {
  onSearch?: (value: string) => void;
  filters?: Filter[];
  rightChild?: React.ReactNode;
  onFilter?: (filters: any) => void;
  hideSearch?: boolean;
};

export enum FieldType {
  TEXT = 'text',
}

export const HeaderPanel = ({
  onSearch,
  onFilter,
  rightChild = null,
  filters: filterOptions = [],
  hideSearch = false,
}: HeaderPanelProps) => {
  const [filters, setFilters] = useState<any>({});
  const [val, setVal] = useState('');

  useDebounce(
    () => {
      if (onSearch) onSearch(val);
    },
    500,
    [val]
  );

  const defaultValues = useMemo(
    () =>
      filterOptions.reduce(
        (map, value) => ({ ...map, [value.name]: 'all' }),
        {}
      ),
    [filterOptions]
  );

  const onReset = () => {
    setFilters(defaultValues);
    setVal('');
  };

  useEffect(() => {
    if (onFilter) {
      onFilter(filters);
    }
  }, [filters]);

  return (
    <>
      <Box>
        <Flex direction="row" justify="space-between" m={5} flexWrap="wrap">
          <Box mb={3} mr={3} w="100%">
            <Wrap direction="row" spacing={4}>
              {!hideSearch && (
                <SearchInput
                  value={val}
                  onChange={(e) => {
                    setVal(e.target.value);
                  }}
                />
              )}
              {filterOptions.length > 0 && (
                <>
                  <Flex
                    size="md"
                    border="0px"
                    borderRadius={20}
                    alignItems="center"
                    justifyContent="center"
                    px="2"
                    boxShadow="0px 4px 16px rgba(16, 30, 115, 0.08)"
                  >
                    {filterOptions.map((value, i: number) => (
                      <Select
                        key={i}
                        variant="unstyled"
                        color="gray"
                        w="100"
                        ml={2}
                        value={filters[filterOptions[i].name]}
                        iconSize="lg"
                        _disabled={{ color: 'black' }}
                        onChange={(e) => {
                          if (e.target.value) {
                            setFilters({
                              ...filters,
                              [filterOptions[i].name]: e.target.value,
                            });
                          }
                        }}
                      >
                        {filterOptions[i]?.options?.map((value, key) => (
                          <option
                            key={key}
                            value={value[filterOptions[i].valueKey ?? 'value']}
                          >
                            {value[filterOptions[i].captionKey ?? 'caption']}
                          </option>
                        ))}
                      </Select>
                    ))}
                  </Flex>
                  <Button
                    colorScheme="blue"
                    color="gray"
                    variant="outline"
                    onClick={onReset}
                  >
                    Reset
                  </Button>
                </>
              )}
            </Wrap>
          </Box>
          <Flex>{rightChild}</Flex>
        </Flex>
      </Box>
    </>
  );
};
