import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from '~/components/UI';

export const Permission = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleSubmit = () => {
    navigate('/app/user/allUsers');
  };

  return (
    <div>
      <Breadcrumb pageParent='All Users' pageName='Permission' />

      <form method='post' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1 w-2/3 translate-x-44'>
          <label className='bg-white input input-bordered flex items-center gap-2'>
            Name
            <input type='text' className='grow' placeholder='Daisy' />
          </label>
          <label className='bg-white input input-bordered flex items-center gap-2'>
            Email
            <input type='text' className='grow' placeholder='daisy@site.com' />
          </label>
          <label className='bg-white input input-bordered flex items-center gap-2'>
            <input type='text' className='grow' placeholder='Search' />
            <kbd className='kbd kbd-sm'>⌘</kbd>
            <kbd className='kbd kbd-sm'>K</kbd>
          </label>
          <label className='bg-white input input-bordered flex items-center gap-2'>
            <input type='text' className='grow' placeholder='Search' />
            <span className='badge badge-info'>Optional</span>
          </label>
          <div className='flex items-center justify-end gap-2 mt-4'>
            <button type='submit' className='btn btn-primary'>
              Update Role
            </button>
            <button className='btn' onClick={() => navigate('/app/user/allUsers')}>
              Back to list
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
