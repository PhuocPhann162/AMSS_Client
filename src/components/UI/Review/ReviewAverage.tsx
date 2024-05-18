// import { useGetAverageReviewQuery } from '../../../Apis/reviewApi';
// import StarRating from '../../UI/StarRating';

// export const ReviewAverage = ({ menuItemId }: { menuItemId: number }) => {
//   const { data, isLoading } = useGetAverageReviewQuery(menuItemId);

//   return (
//     <>
//       {!isLoading && data?.result ? (
//         <div className='mx-4 py-4'>
//           <span style={{ color: '#5D3D2E', fontFamily: 'cursive' }} className='fw-bold fs-5'>
//             Overall Rating
//           </span>
//           <div className='d-flex align-items-center mt-4'>
//             <div className='fs-4 px-2'>{data?.result.averageRating.toFixed(1)}</div>
//             <StarRating defaultRating={Math.ceil(data?.result.averageRating)} fontSize={0} size={24} disabled />
//           </div>
//           <span className='px-2 text-muted'>({data?.result.totalRating} rating)</span>
//           <div className='d-grid gap-1 mt-2'>
//             <div className='d-flex px-2'>
//               <div className=''>
//                 <StarRating defaultRating={5} fontSize={0} size={16} disabled />
//               </div>
//               <div className='text-muted' style={{ fontSize: '16px' }}>
//                 {data?.result.noFiveStars} rating <i className='bi bi-person-heart'></i>
//               </div>
//             </div>
//             <div className='d-flex px-2'>
//               <div className=''>
//                 <StarRating defaultRating={4} fontSize={0} size={16} disabled />
//               </div>
//               <div className='text-muted' style={{ fontSize: '16px' }}>
//                 {data?.result.noFourStars} rating <i className='bi bi-person-heart'></i>
//               </div>
//             </div>
//             <div className='d-flex px-2'>
//               <div className=''>
//                 <StarRating defaultRating={3} fontSize={0} size={16} disabled />
//               </div>
//               <div className='text-muted' style={{ fontSize: '16px' }}>
//                 {data?.result.noThreeStars} rating <i className='bi bi-person-heart'></i>
//               </div>
//             </div>
//             <div className='d-flex px-2'>
//               <div className=''>
//                 <StarRating defaultRating={2} fontSize={0} size={16} disabled />
//               </div>
//               <div className='text-muted' style={{ fontSize: '16px' }}>
//                 {data?.result.noTwoStars} rating <i className='bi bi-person-heart'></i>
//               </div>
//             </div>
//             <div className='d-flex px-2'>
//               <div className=''>
//                 <StarRating defaultRating={1} fontSize={0} size={16} disabled />
//               </div>
//               <div className='text-muted' style={{ fontSize: '16px' }}>
//                 {data?.result.noOneStar} rating <i className='bi bi-person-heart'></i>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };
