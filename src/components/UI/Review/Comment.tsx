// import { reviewModel } from '../../../Interfaces';
// import { formatDistanceToNow } from 'date-fns';
// import { useGetUserInfoAndRolesQuery } from '../../../Apis/userApi';
// import StarRating from './StarRating';

// export const Comment = ({ review }: { review: reviewModel }) => {
//   const { data } = useGetUserInfoAndRolesQuery(review.userId);

//   return (
//     <div key={review.id}>
//       <hr />
//       <div className='d-flex align-items-center justify-content-between py-1'>
//         <StarRating size={20} defaultRating={review.stars} color='#EF4444' fontSize={0} disabled />
//         <span className='text-muted'>
//           {review.createdAt &&
//             formatDistanceToNow(new Date(review.createdAt), {
//               addSuffix: true
//             })}
//         </span>
//       </div>
//       <div className='ms-1'>
//         <span className='fw-bold'>{data?.result.applicationUser.name}</span>
//         <p className='text-muted'>{review.comment}</p>
//       </div>
//     </div>
//   );
// };
