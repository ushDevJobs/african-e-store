import React, { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { EmptyStarRatingIcon, RatingIcon, TimesIcon } from '../SVGs/SVGicons'
import useResponsiveness from '../hooks/responsiveness-hook'
import { PurchaseHistoryResponse, PurchaseOrderDetails } from '../models/IUserOrder'
import { useAddReview } from '@/app/api/apiClients'
import { toast } from 'sonner'
import { createCustomErrorMessages } from '../constants/catchError'

type Props = {
    visibility: boolean
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
    // selectedHistory: PurchaseHistoryResponse | undefined
    selectedHistory: PurchaseOrderDetails | undefined
    handleFetchHistories({ clearPreviousHistories }: {
        clearPreviousHistories?: boolean | undefined;
    }): Promise<void>
}
export interface ReviewRequest {
    rating: number;
    review: string;
}

const ReviewModal = ({ visibility, setVisibility, selectedHistory, handleFetchHistories }: Props) => {

    const addReview = useAddReview();

    const [rating, setRating] = useState<number>(0); // Initial rating is 0
    const [review, setReview] = useState<string>(''); // Initial review is empty
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleRatingClick = (value: number): void => {
        setRating(value); // Set the rating when a star is clicked
    };

    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setReview(e.target.value); // Update review as the user types
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // Prevent form submission

        // Validate the form
        if (rating === 0 || review.trim() === '') {
            toast.error('Please provide both a rating and a review.');
            return;
        }

        setIsLoading(true);

        const reviewData: ReviewRequest = {
            rating,
            review,
        };
        await addReview(selectedHistory?.id as string, reviewData)
            .then((response) => {

                // Log response 
                // console.log(response);

                toast.success('Review submitted successfully.');

                // Fetch updated histories
                handleFetchHistories({ clearPreviousHistories: true });

                // Close the modal
                setVisibility(false);

                // Clear the rating and review
                setRating(0);
                setReview('');
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage)

            })
            .finally(() => {

                // Close laoder 
                setIsLoading(false);
            })
    };

    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: 'transparent' }}>
            <div className="w-full bg-white rounded-3xl px-7 py-10 max-h-[90vh] overflow-y-auto">
                <span onClick={() => setVisibility(false)} className="ml-auto cursor-pointer flex items-end justify-end mb-2"><TimesIcon /></span>
                <form className="px-12" onSubmit={(e) => handleSubmit(e)}>
                    <h2 className='text-center text-base md:text-xl text-[#828282] font-normal leading-7 mb-6'>Your package has been delivered <br /> please drop a rating and review </h2>

                    <span className='flex items-center gap-6 mb-12 justify-center'>
                        {[1, 2, 3, 4, 5].map((star, index) => (
                            <span key={index} className='cursor-pointer'
                                onClick={() => handleRatingClick(star)}
                                style={{ cursor: 'pointer', color: star <= rating ? '#FF9800' : 'gray', fontSize: '30px' }}
                            >
                                ★
                            </span>
                        ))}
                    </span>

                    <div className='flex flex-col gap-8 mb-10'>
                        <h2 className='text-center text-base md:text-xl text-[#828282] font-normal '>Please leave a comment </h2>
                        <textarea
                            value={review}
                            onChange={handleReviewChange}
                            className='bg-[#F7FAFA] resize-none py-3 outline-none h-[100px] px-5 rounded-md border border-[#ACACAC] w-full' placeholder='Enter comment here ' />
                    </div>
                    <button type='submit' className='bg-[#2C7865] w-full text-white text-sm font-medium rounded-3xl py-4 px-8 disabled:pointer-events-none disabled:opacity-50' disabled={isLoading}>Submit Review</button>
                </form>
            </div>
        </ModalWrapper>
    )
}

export default ReviewModal