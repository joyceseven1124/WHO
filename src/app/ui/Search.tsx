'use client';
import { MEDIA_QUERY_MD } from '@/src/app/style';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
  border: 1px solid #4d4d4d;
  border-radius: 4px;
  padding: 8px 12px;
  width: 100%;
  justify-self: center;
  margin: auto;
  color: black;
  ${MEDIA_QUERY_MD} {
    max-width: 600px;
    padding: 8px 20px;
  }
`;

const SearchInput = styled.input`
  width: calc(100% - 52px);
  outline: none;
`;

const SearchButton = styled.button`
  color: #4d4d4d;
  position: relative;
  cursor: pointer;
  &:hover {
    color: black;
    &:before {
      position: absolute;
      content: 'Waiting';
      background-color: white;
    }
  }
`;

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`/?${params.toString()}`);
  }, 300);

  return (
    <SearchBar>
      <label htmlFor="search">
        <MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
      </label>
      <SearchInput
        placeholder="Who to search for"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <SearchButton>Search</SearchButton>
    </SearchBar>
  );
}
