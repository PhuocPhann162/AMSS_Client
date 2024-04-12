interface ModalProps {
  width?: string;
  children?: React.ReactNode;
  title?: string;
  isShow?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

export const Modal = ({ children, title, onConfirm }: ModalProps) => {
  return (
    <>
      <dialog id='fuco_modal' className='modal modal-top sm:modal-middle'>
        <div className='modal-box bg-white'>
          <div className='flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-8 h-8 text-warning'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
              />
            </svg>
            <h3 className='font-bold text-lg w-100'>Are you sure to {title}</h3>
          </div>

          <p className='py-4'>You won't be able to revert this!</p>
          <div className='modal-action'>
            <form method='dialog' className='flex items-center gap-4'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-primary text-white' onClick={onConfirm}>
                Confirm
              </button>
              <button
                className='btn btn-danger text-white'
                onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement)?.close()}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
