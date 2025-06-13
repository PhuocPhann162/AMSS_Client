import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { sidebarOptions } from '../sidebar/sidebar-helper';
import { useState, useMemo } from 'react';
import { AInput } from '@/common/ui-common';

interface SearchResult {
  label: string;
  path: string;
}

export const HeaderSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const results: SearchResult[] = [];
    const query = searchQuery.toLowerCase();

    const processItem = (item: any) => {
      if (item.label?.toLowerCase().includes(query)) {
        if (item.path) {
          results.push({
            label: item.label,
            path: item.path,
          });
        }
      }

      if (item.children) {
        item.children.forEach(processItem);
      }
    };

    sidebarOptions.forEach(processItem);
    return results;
  }, [searchQuery]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    setSearchQuery('');
    setIsOpen(false);
  };

  return (
    <div className='relative w-64'>
      <div className='relative'>
        <AInput
          type='text'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder='Search...'
          prefix={<SearchOutlined />}
        />
      </div>

      {isOpen && searchResults.length > 0 && (
        <div className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg'>
          {searchResults.map((result, index) => (
            <button
              key={index}
              onClick={() => handleSelect(result)}
              className='w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
            >
              {result.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
