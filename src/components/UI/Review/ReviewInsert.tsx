// import React, { useState } from 'react';
// import { inputHelper, toastNotify } from '../../../Helper';
// import StarRating from '../../UI/StarRating';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../Storage/Redux/store';
// import { useAddReviewMutation } from '../../../Apis/reviewApi';
// import { MainLoader } from '../Common';

// const reviewData = {
//   comment: '',
//   stars: 0
// };

// export const ReviewInsert = ({ menuItemId }: { menuItemId: number }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [reviewInputs, setReviewInputs] = useState(reviewData);
//   const [rating, setRating] = useState(0);
//   const [createReview] = useAddReviewMutation();

//   const userId: string = useSelector((state: RootState) => state.userAuthStore.id);

//   const handleReviewInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const tempData = inputHelper(e, reviewInputs);
//     setReviewInputs(tempData);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!userId) {
//       window.location.replace('/login');
//       setIsLoading(false);
//       return;
//     }

//     const formData = new FormData();

//     formData.append('comment', reviewInputs.comment);
//     formData.append('stars', rating.toString());
//     formData.append('menuItemId', menuItemId.toString());
//     formData.append('userId', userId);

//     const response = await createReview(formData);
//     if (response) {
//       setIsLoading(false);
//       toastNotify('Thank you for your review!!!');
//       setReviewInputs({
//         comment: '',
//         stars: 1
//       });
//     } else {
//       toastNotify('An unexpected error occured', 'error');
//       setReviewInputs({
//         comment: '',
//         stars: 1
//       });
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <MainLoader />
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div className='mx-4 py-4'>
//             <span style={{ color: '#5D3D2E', fontFamily: 'cursive' }} className='fw-bold fs-5'>
//               Add your opinion
//             </span>
//             <div className='py-2'>
//               <StarRating size={24} defaultRating={1} onSetRating={setRating} color='#EF4444' fontSize={20} />
//             </div>
//             <div className='mt-2'>
//               <textarea
//                 className='w-100 form-control'
//                 rows={4}
//                 name='comment'
//                 value={reviewInputs.comment}
//                 onChange={handleReviewInput}
//                 placeholder='Was it good? Was it bad? Let us know!'
//               />
//             </div>
//             <button type='submit' className='btn btn-dark mt-4 mb-2'>
//               Submit Your Review
//             </button>
//           </div>
//         </form>
//       )}
//     </>
//   );
// };
