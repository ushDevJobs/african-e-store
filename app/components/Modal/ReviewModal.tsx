import React from 'react'
import ModalWrapper from './ModalWrapper'
import { EmptyStarRatingIcon, RatingIcon, TimesIcon } from '../SVGs/SVGicons'
import useResponsiveness from '../hooks/responsiveness-hook'

type Props = {
    visibility: boolean
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const ReviewModal = ({ visibility, setVisibility }: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: 'transparent' }}>
            <div className="w-full bg-white rounded-3xl p-3 max-h-[90vh] overflow-y-auto">
                <span onClick={() => setVisibility(false)} className="ml-auto cursor-pointer flex items-end justify-end mb-2"><TimesIcon /></span>
                <form className="px-12">
                    <h2 className='text-center text-base md:text-xl text-[#828282] font-normal leading-7 mb-6'>Your package has been delivered <br /> please drop a rating and review </h2>
                    {/* <div className=""> */}
                    <span className='flex items-center gap-6 mb-12 justify-center'>
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <span key={index} className='cursor-pointer'
                            >
                                {onDesktop && <EmptyStarRatingIcon />}
                                {onMobile && <RatingIcon />}
                            </span>
                        ))}
                        {/* {[1].map((_, index) => (
                            <span key={index}>
                                <RatingIcon />
                            </span>
                        ))} */}
                    </span>
                    {/* </div> */}

                    <div className='flex flex-col gap-8 mb-10'>
                        <h2 className='text-center text-base md:text-xl text-[#828282] font-normal '>Please leave a comment </h2>
                        <input className='bg-[#F7FAFA] py-3 outline-none px-5 rounded-md border border-[#ACACAC] w-full' type="text" placeholder='Enter comment here ' />
                    </div>
                </form>

            </div>
        </ModalWrapper>
    )
}

export default ReviewModal