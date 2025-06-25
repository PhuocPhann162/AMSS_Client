import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  pageParent: string;
  pageName: string;
}
const Breadcrumb = ({ pageParent, pageName }: BreadcrumbProps) => {
  return (
    <div className='mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <h2 className='text-[1.625rem] font-semibold text-black dark:text-white'>
        {pageName}
      </h2>
      <nav>
        <ol className='flex items-center gap-2'>
          {pageParent !== '' && (
            <li>
              <Link className='font-medium' to='/'>
                {pageParent} /
              </Link>
            </li>
          )}
          <li className='font-medium text-primary'>{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
