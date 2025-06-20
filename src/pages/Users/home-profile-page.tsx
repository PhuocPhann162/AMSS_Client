import { useUpdateAddressMutation } from '@/api';
import { AAvatar, AHomeCard } from '@/common/ui-common';
import { setUser } from '@/features/auth/store/auth-slice';
import { RoleName } from '@/interfaces';
import { InfoItem } from '@/pages/Users/components/info-item';
import { UpdateAddressModal } from '@/pages/Users/components/update-address-modal';
import { useAppDispatch } from '@/storage/redux/hooks/use-app-dispatch';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import Button from 'antd/es/button';
import { format } from 'date-fns';
import { useState } from 'react';
export const HomeProfilePage = () => {
  const userData = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [openUpdateAddressModal, setOpenUpdateAddressModal] = useState(false);

  const [updateAddress, updateAddressResult] = useUpdateAddressMutation();

  // Format the creation date if available
  const formattedDate = userData?.createdAt
    ? format(new Date(userData.createdAt), 'MMMM d, yyyy')
    : 'N/A';

  return (
    <>
      <div className='flex flex-col gap-6 p-6 pt-0'>
        <h1 className='text-2xl font-bold'>My Profile</h1>

        <AHomeCard>
          <div className='relative h-32 rounded-t-lg bg-gradient-to-r from-primary to-primary/80'>
            <div className='absolute -bottom-16 left-6'>
              <AAvatar
                src={userData?.avatar}
                alt={userData?.fullName || 'User'}
                size={128}
                rootClassName='border-white border-4'
              />
            </div>
          </div>

          <div className='flex flex-col gap-8 px-6 pb-6 pt-20'>
            <div className='flex flex-col gap-1'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                {userData?.fullName || 'User'}
              </h2>
              {!!userData?.role && (
                <p className='font-medium'>{RoleName[userData.role]}</p>
              )}
              <p className='text-gray-500 dark:text-gray-400'>
                @{userData?.userName || 'username'}
              </p>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <InfoItem
                icon={MailOutlined}
                label='Email'
                value={userData?.email}
              />
              <InfoItem
                icon={PhoneOutlined}
                label='Phone'
                value={
                  userData?.phoneNumber
                    ? `${userData.phoneCode || ''} ${userData.phoneNumber}`
                    : null
                }
              />
              <InfoItem
                icon={PushpinOutlined}
                label='Address'
                value={
                  userData?.streetAddress
                    ? `${userData.streetAddress}, ${userData.provinceName || ''}${userData.countryName ? ', ' + userData.countryName : ''}`
                    : null
                }
                action={
                  <Button
                    onClick={() => {
                      setOpenUpdateAddressModal(true);
                    }}
                  >
                    Edit
                  </Button>
                }
              />
              <InfoItem
                icon={GlobalOutlined}
                label='Country'
                value={userData?.countryName}
              />
              <InfoItem
                icon={CalendarOutlined}
                label='Member Since'
                value={formattedDate}
              />
              <InfoItem
                icon={CheckCircleOutlined}
                label='Status'
                value={userData?.isActive ? 'Active' : 'Inactive'}
              />
            </div>
          </div>
        </AHomeCard>
      </div>
      <UpdateAddressModal
        open={openUpdateAddressModal}
        onCancel={() => {
          setOpenUpdateAddressModal(false);
        }}
        okButtonProps={{ loading: updateAddressResult.isLoading }}
        onOk={async (data) => {
          try {
            await updateAddress(data);
            setOpenUpdateAddressModal(false);
            dispatch(
              setUser({
                ...userData,
                streetAddress: data.streetAddress,
              }),
            );
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </>
  );
};
