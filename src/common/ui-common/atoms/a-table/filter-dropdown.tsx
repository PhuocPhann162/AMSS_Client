import { FilterDropdownProps } from 'antd/es/table/interface';
import { AInput } from '../a-input';
import { Empty, Tree, TreeDataNode, TreeProps } from 'antd';
import { AButton } from '../a-button';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useDebounce, useOnScreen } from '@/hooks';

export type FilterOpstion = {
  title: string;
  key: string | number;
};

type AFilterDropdownProps = FilterDropdownProps & {
  optionsFilter: FilterOpstion[];
};

export const AFilterDropdown = (props: AFilterDropdownProps) => {
  const {
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    optionsFilter,
  } = props;

  const [treeData, setTreeData] = useState<TreeDataNode[]>();
  const [searchText, setSearchText] = useState<string>('');

  const keySearch: string = useDebounce(searchText, 300);
  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    const checkedKeys = Array.isArray(checkedKeysValue) ? checkedKeysValue : [];
    const filteredKeys = checkedKeys.filter((key) => key !== 'all');
    setSelectedKeys(filteredKeys as string[] | number[]);
  };

  const ref = useRef<HTMLDivElement>(null);
  const isVisible: boolean = useOnScreen(ref);

  useEffect(() => {
    if (!isVisible) setSearchText('');
  }, [isVisible]);

  useEffect(() => {
    const filteredOptions = optionsFilter.filter(
      (x) =>
        x.title.toLowerCase().includes(keySearch.toLowerCase()) ||
        selectedKeys.includes(x.key),
    );

    const dataNode: TreeDataNode[] =
      filteredOptions.length > 0
        ? [
            {
              key: 'all',
              title: 'All',
              switcherIcon: <></>,
              children: filteredOptions,
            },
          ]
        : [];
    setTreeData(dataNode);
    //TO DO: enhance selectedKeys
  }, [keySearch, optionsFilter]);

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    confirm({ closeDropdown: false });
  };
  return (
    <div className='m-2' ref={ref}>
      <AInput
        prefix={<SearchOutlined />}
        placeholder='Search in filters'
        value={searchText}
        allowClear
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className='-mx-2 my-2 border border-gray-100'></div>
      <div className='max-h-72 overflow-y-auto'>
        {treeData && treeData?.length > 0 ? (
          <Tree
            checkable
            selectable={false}
            treeData={treeData}
            expandedKeys={['all']}
            onCheck={onCheck}
            checkedKeys={selectedKeys}
            blockNode
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
      <div className='-mx-2 my-2 border border-gray-100'></div>
      <div className='flex justify-between px-2'>
        <AButton
          type='link'
          onClick={() => clearFilters && handleReset(clearFilters)}
          disabled={selectedKeys.length === 0}
        >
          Reset
        </AButton>
        <AButton
          type='primary'
          onClick={() => {
            confirm();
            setSearchText('');
          }}
        >
          Apply
        </AButton>
      </div>
    </div>
  );
};
