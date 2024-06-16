import React from 'react'
import styles from './Stores.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { FavoriteIcon, FilledLoveIcon, SearchIcon, UkIcon } from '../components/SVGs/SVGicons'
import { CategoriesHeader } from '../components/CategoriesHeader'

type Props = {}

const StorePage = (props: Props) => {
    const isFavorite = true
    return (
        <div className={styles.main}>
            <CategoriesHeader mainText='Explore different stores on Rayvvin ' subText='Search for any store of your choice, rayvvin ensures the authenticity of vendors ' />

            <div className={styles.contents}>
                <div className={styles.fieldContainer}>
                    <SearchIcon />
                    <input type="text" placeholder='Search name of store ' />
                </div>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <Image fill src={images.cashew} alt='product image' />
                            {isFavorite ? <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FilledLoveIcon /></span>
                                : <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FavoriteIcon /></span>}
                        </div>
                      <div className="flex flex-col gap-2">
                            <h4 className='text-[#828282] text-base'>Chuka stores </h4>
                            <p className='text-[#828282] text-sm'>Specializes in everything fashion style and beauty and...</p>
                            <span className='flex items-center gap-2'><UkIcon /> Uk</span>
                      </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <Image fill src={images.cashew} alt='product image' />
                            {isFavorite ? <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FilledLoveIcon /></span>
                                : <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FavoriteIcon /></span>}
                        </div>
                      <div className="flex flex-col gap-2">
                            <h4 className='text-[#828282] text-base'>Chuka stores </h4>
                            <p className='text-[#828282] text-sm'>Specializes in everything fashion style and beauty and...</p>
                            <span className='flex items-center gap-2'><UkIcon /> Uk</span>
                      </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <Image fill src={images.cashew} alt='product image' />
                            {isFavorite ? <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FilledLoveIcon /></span>
                                : <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FavoriteIcon /></span>}
                        </div>
                      <div className="flex flex-col gap-2">
                            <h4 className='text-[#828282] text-base'>Chuka stores </h4>
                            <p className='text-[#828282] text-sm'>Specializes in everything fashion style and beauty and...</p>
                            <span className='flex items-center gap-2'><UkIcon /> Uk</span>
                      </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <Image fill src={images.cashew} alt='product image' />
                            {isFavorite ? <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FilledLoveIcon /></span>
                                : <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FavoriteIcon /></span>}
                        </div>
                      <div className="flex flex-col gap-2">
                            <h4 className='text-[#828282] text-base'>Chuka stores </h4>
                            <p className='text-[#828282] text-sm'>Specializes in everything fashion style and beauty and...</p>
                            <span className='flex items-center gap-2'><UkIcon /> Uk</span>
                      </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <Image fill src={images.cashew} alt='product image' />
                            {isFavorite ? <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FilledLoveIcon /></span>
                                : <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FavoriteIcon /></span>}
                        </div>
                      <div className="flex flex-col gap-2">
                            <h4 className='text-[#828282] text-base'>Chuka stores </h4>
                            <p className='text-[#828282] text-sm'>Specializes in everything fashion style and beauty and...</p>
                            <span className='flex items-center gap-2'><UkIcon /> Uk</span>
                      </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <Image fill src={images.cashew} alt='product image' />
                            {isFavorite ? <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FilledLoveIcon /></span>
                                : <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FavoriteIcon /></span>}
                        </div>
                      <div className="flex flex-col gap-2">
                            <h4 className='text-[#828282] text-base'>Chuka stores </h4>
                            <p className='text-[#828282] text-sm'>Specializes in everything fashion style and beauty and...</p>
                            <span className='flex items-center gap-2'><UkIcon /> Uk</span>
                      </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <Image fill src={images.cashew} alt='product image' />
                            {isFavorite ? <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FilledLoveIcon /></span>
                                : <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FavoriteIcon /></span>}
                        </div>
                      <div className="flex flex-col gap-2">
                            <h4 className='text-[#828282] text-base'>Chuka stores </h4>
                            <p className='text-[#828282] text-sm'>Specializes in everything fashion style and beauty and...</p>
                            <span className='flex items-center gap-2'><UkIcon /> Uk</span>
                      </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StorePage