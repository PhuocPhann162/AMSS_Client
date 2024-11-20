import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { useDeleteFieldMutation, useGetAllFieldsQuery } from '~/api/fieldApi';
import { MarkerIcon, SortIcon } from '~/components/Icon';
import { MainLoader } from '~/components/Page/common';

import { getStatusColor, inputHelper, toastNotify } from '~/helper';
import { fieldModel, pageOptions } from '~/interfaces';
import { SD_FieldStatus } from '~/utils/SD';
import { PopupCrop } from '../Crop';

export const FieldStatusList = () => {
  // Start State
  const [fieldList, setfieldList] = useState<fieldModel[]>([]);

  const [filters, setFilters] = useState({
    searchString: '',
    status: ''
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: '',
    status: ''
  });
  const [pageOptions, setPageOptions] = useState<pageOptions>({
    pageNumber: 1,
    pageSize: 5
  });
  const [totalRecords, setTotalRecords] = useState(0);
  // End State

  const [debouncedFilter] = useDebounce(filters, 500);

  const { data, isLoading } = useGetAllFieldsQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize
    })
  });

  const [deleteField] = useDeleteFieldMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, filters);
    setFilters(tempData);
  };

  const handleDelete = async (id: number) => {
    try {
      toast.promise(
        deleteField(id),
        {
          pending: 'Processing your request...',
          success: 'Field deleted successfully 👌',

          error: 'An unexpected error occured 🤯'
        },
        {
          theme: 'colored'
        }
      );
      (document.getElementById('fuco_modal') as HTMLDialogElement)?.close();
    } catch (error: any) {
      toastNotify(error.message, 'error');
    }
  };

  useEffect(() => {
    if (data) {
      setfieldList(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  useEffect(() => {
    setApiFilters(filters);
  }, [debouncedFilter]);

  return (
    <div>
      {isLoading && <MainLoader />}

      {!isLoading && (
        <>
          <div className='container px-4 mx-auto'>
            <div className='mt-6 md:flex md:items-center md:justify-between'>
              <div>
                <h1 className='font-bold text-black-2 text-xl'>Fields</h1>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>This is list of latest field.</p>
              </div>

              <div className='relative flex items-center mt-4 md:mt-0'>
                <Link to='/app/land/field/allFields' className='text-primary underline hover:text-green-400'>
                  View All
                </Link>
              </div>
            </div>

            <div className='flex flex-col mt-6 shadow-default'>
              <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 '>
                  <div className='overflow-hidden md:rounded-lg'>
                    <table className='min-w-full'>
                      <thead className='bg-status-white-light text-status-white-dark '>
                        <tr className='font-bold'>
                          <th scope='col' className='py-3.5 px-4 text-sm text-left rtl:text-right '>
                            <button className='flex items-center gap-x-3 focus:outline-none'>
                              <span>Name</span>

                              <SortIcon />
                            </button>
                          </th>
                          <th scope='col' className='px-4 py-3.5 text-sm text-left rtl:text-right'>
                            Farm Name
                          </th>
                          <th scope='col' className='px-8 py-3.5 text-sm text-left rtl:text-right'>
                            Total Area
                          </th>
                          <th scope='col' className='px-4 py-3.5 text-sm text-left rtl:text-right'>
                            Status
                          </th>
                          <th scope='col' className='px-4 py-3.5 text-sm text-left rtl:text-right'>
                            Location
                          </th>
                          <th scope='col' className='px-4 py-3.5 text-sm text-left rtl:text-right'>
                            Planted Crop
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white'>
                        {fieldList &&
                          fieldList.map((field: fieldModel) => (
                            <tr key={field.id}>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>{field.name}</h2>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>{field.farm?.name}</h2>
                                </div>
                              </td>
                              <td className='px-8 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>{field.area!.toFixed(2)} m²</h2>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                <span
                                  className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-sm text-status-${getStatusColor(field.status! as SD_FieldStatus)}-dark leading-none bg-status-${getStatusColor(field.status! as SD_FieldStatus)}-light rounded-lg`}
                                >
                                  {field.status!}
                                </span>
                              </td>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>
                                    <Link
                                      to={`/app/map?lat=${field.location!.lat}&lng=${field.location!.lng}`}
                                      className='font-medium flex items-center underline underline-offset-4 text-green-500 gap-1 hover:decoration-2 hover:text-green-400'
                                    >
                                      <MarkerIcon />
                                      See in map
                                    </Link>
                                  </h2>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                <PopupCrop fieldId={field.id!} />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
