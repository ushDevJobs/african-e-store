import React, { useEffect, useState } from 'react'
import { useFetchReviews } from '../api/apiClients';
import { ReviewResponse } from '../components/models/IReview';
import { createCustomErrorMessages } from '../components/constants/catchError';
import { toast } from 'sonner';
import { FullPageLoader } from '../Loader/ComponentLoader';

type Props = {}

const FeedBack = (props: Props) => {
    const fetchReviews = useFetchReviews();

    const [reviews, setReviews] = useState<ReviewResponse[]>()
    const [isFetchingReviews, setIsFetchingReviews] = useState(true)

    async function handleFetchReviews() {
        setIsFetchingReviews(true)

        await fetchReviews()
            .then((response) => {
                console.log(response.data.data);
                setReviews(response.data.data)
            })
            .catch((error) => {
                console.log(error);
                const errorMessage = createCustomErrorMessages(error.response?.data);
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingReviews(false)
            })

    }

    useEffect(() => {
        handleFetchReviews()
    }, [])

    return (
        <>
            <section className='w-full h-full'>
                {
                    reviews && reviews?.length > 0 && (
                        <>
                            <h2 className='text-2xl font-medium mb-8 text-black'>All Feedbacks ({reviews?.length})</h2>
                            <div className="flex flex-col gap-10 overflow-y-auto max-h-[800px]">
                                {reviews?.map((review, index) => (
                                    <div className="flex justify-between max-w-full md:max-w-[800px] text-[#828282]" key={index}>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-10">
                                                <p className='whitespace-nowrap'>{review.user.fullname}</p>
                                                <p>date</p>
                                            </div>
                                            <p className='font-medium max-w-600px] text-start'>{review.review}</p>
                                        </div>
                                        <span className='text-sm font-medium'>Verified Purchase</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                }
                {!reviews && isFetchingReviews && (
                    <FullPageLoader />
                )}
                {reviews?.length == 0 && !isFetchingReviews && (
                    <p className="text-base text-center">
                        No review available
                    </p>
                )}
            </section>
        </>
    )
}

export default FeedBack