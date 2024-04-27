import { locationModel, pointModel } from '~/interfaces';

interface UpdateLandModalProps {
  area?: number;
  location?: locationModel;
  points: pointModel[];
  onCancel?: () => void;
}

export const UpdateLandModal = ({ area, location, points, onCancel }: UpdateLandModalProps) => {
  return (
    <>
      <dialog id='create_farm_modal' className='modal modal-top sm:modal-top w-3/5 mx-auto mt-6 border rounded-lg'>
        <div className='modal-box bg-white'>
          <div className=''>
            <h3 className='font-bold text-lg w-100 tracking-wide'>Create Farm</h3>
          </div>
          <div className='divider divide-neutral-400'></div>
          <form method='post'>
            <div className='flex items-center justify-between gap-4'>
              <label className='text-sm flex-shrink-0 w-1/5 text-right'>Name</label>
              <div className='flex-grow w-full'>
                <input
                  type='text'
                  placeholder='Type name here'
                  className='input input-bordered input-warning input-md w-full max-w-lg bg-white'
                  name='name'
                  value={userInputs.name}
                  onChange={handleUserInput}
                  required
                />
              </div>
            </div>
            <div className='flex items-center justify-between gap-4 mt-2'>
              <label className='text-sm flex-shrink-0 w-1/5 text-right'>Place type</label>
              <div className='flex-grow'>
                <select
                  className='select select-bordered select-warning w-full max-w-lg bg-white'
                  name='placeType'
                  value={userInputs.placeType}
                  onChange={handleUserInput}
                  required
                >
                  <option disabled value=''>
                    Select Place Type
                  </option>
                  <option key={SD_PlaceType.FARM} value={SD_PlaceType.FARM}>
                    Farm
                  </option>
                  <option key={SD_PlaceType.FIELD} value={SD_PlaceType.FIELD}>
                    Field
                  </option>
                </select>
              </div>
            </div>
            {userInputs.placeType === 'Farm' && (
              <>
                <div className='flex items-center justify-between gap-4 mt-2'>
                  <label className='text-sm flex-shrink-0 w-1/5 text-right'>Owner name</label>
                  <div className='flex-grow w-full'>
                    <input
                      type='text'
                      placeholder='Type owner name here'
                      className='input input-bordered input-warning input-md w-full max-w-lg bg-white'
                      name='ownerName'
                      value={userInputs.ownerName}
                      onChange={handleUserInput}
                      required
                    />
                  </div>
                </div>
                <div className='flex items-center gap-4 py-4'>
                  <label className='text-sm flex-shrink-0 w-1/5 text-right'>Color</label>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='color'
                        value='#5D3D2E'
                        onChange={handleUserInput}
                        className='radio radio-accent'
                        checked={userInputs.color === '#5D3D2E'}
                      />
                      <label className='label'>Brown</label>
                    </div>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='color'
                        value='#4bc552'
                        onChange={handleUserInput}
                        className='radio radio-success form-control'
                        checked={userInputs.color === '#4bc552'}
                      />
                      <label className='label'>Green</label>
                    </div>
                  </div>
                </div>
              </>
            )}{' '}
            {userInputs.placeType == 'Field' && (
              <>
                <div className='flex items-center gap-4 py-4'>
                  <label className='text-sm flex-shrink-0 w-1/5 text-right'>Color</label>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='color'
                        value='#ffb100'
                        onChange={handleUserInput}
                        className='radio radio-warning'
                        checked={userInputs.color === '#ffb100'}
                        required
                      />
                      <label className='label'>Yellow</label>
                    </div>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='color'
                        value='#00aeff'
                        onChange={handleUserInput}
                        className='radio radio-info form-control'
                        checked={userInputs.color === '#00aeff'}
                        required
                      />
                      <label className='label'>Blue</label>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-between gap-4 mt-2'>
                  <label className='text-sm flex-shrink-0 w-1/5 text-right'>Farm</label>
                  <div className='flex-grow'>
                    <select
                      className='select select-bordered select-warning w-full max-w-lg bg-white'
                      name='farmId'
                      value={userInputs.farmId}
                      onChange={handleUserInput}
                      required
                    >
                      <option disabled value=''>
                        Select Existing Farm
                      </option>
                      {data &&
                        data?.apiResponse?.result.map((farm: farmModel) => (
                          <option key={farm.id} value={farm.id}>
                            {farm.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </>
            )}
            <div className='flex items-center justify-between gap-4 mt-2'>
              <label className='text-sm flex-shrink-0 w-1/5 text-right'>Grow Location</label>
              <div className='flex-grow w-full'>
                <input
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered input-warning input-md w-full max-w-lg bg-white'
                  name='growLocation'
                  defaultValue={location?.address}
                  onChange={handleUserInput}
                  required
                />
              </div>
            </div>
            <div className='divider divide-neutral-400'></div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <h3 className='font-bold text-lg'>Total Area: </h3>
                <h3 className='text-lg'>{area?.toFixed(2)} m²</h3>
                <h5 className='text-sm'>({turf.convertArea(area!, 'meters', 'acres').toFixed(2)} acres) </h5>
              </div>
              <div className='modal-action flex justify-end'>
                {/* if there is a button in form, it will close the modal */}
                <button type='submit' className='btn btn-primary text-white'>
                  Save
                </button>
                <button
                  type='button'
                  className='btn btn-danger text-white'
                  onClick={() => {
                    (document.getElementById('create_farm_modal') as HTMLDialogElement)?.close();
                    if (onCancel) {
                      setUserInputs({
                        name: '',
                        ownerName: '',
                        placeType: '',
                        growLocation: '',
                        color: '',
                        farmId: ''
                      });
                      onCancel();
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
