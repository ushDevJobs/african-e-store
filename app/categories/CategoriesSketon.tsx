import React from 'react';
import styles from './Categories.module.scss'

const CategoriesSkeletonLoader: React.FC = () => {
    return (
        <div className={`${styles.main} -mt-10 animate-pulse`}>
            <div className="skeleton h-36 mb-10 rounded-xl" style={{ marginTop: "40px" }}></div>
            <div className="skeleton mb-10 ml-auto h-6 w-[70%] md:hidden"></div>

            <div className="w-full flex flex-col md:flex-row">
                <div className="hidden md:flex flex-col space-y-5 basis-2/5">
                    <div className="skeleton h-6 w-[70%]"></div>
                    <div className="skeleton h-6 w-[70%]"></div>
                    <div className="skeleton h-6 w-[70%]"></div>
                    <div className="skeleton h-6 w-[70%]"></div>
                    <div className="skeleton h-6 w-[70%]"></div>
                    <div className="skeleton h-6 w-[70%]"></div>
                    <div className="skeleton h-6 w-[70%]"></div>
                    <div className="skeleton h-6 w-[70%]"></div>
                    <div className="skeleton h-6 w-[70%]"></div>
                    <div className="skeleton h-6 w-[70%]"></div>
                </div>
                <div className="flex flex-col space-y-5 basis-2/3">
                    <div className="skeleton h-6 w-full"></div>
                    <div className="skeleton h-6 w-full"></div>
                    <div className="skeleton h-6 w-full"></div>
                    <div className="skeleton h-6 w-full"></div>
                    <div className="skeleton h-6 w-full"></div>
                    <div className="skeleton h-6 w-full"></div>
                    <div className="skeleton h-6 w-full"></div>
                    <div className="skeleton h-6 w-full"></div>
                    <div className="skeleton h-6 w-full"></div>
                    <div className="skeleton h-6 w-full"></div>
                </div>
            </div>

            {/* <div className="skeleton h-9 w-1/4 mb-4"></div>
            <div className="skeleton h-6 w-1/2 mb-4"></div>

            <div className="skeleton h-10 w-1/4 mb-4"></div>
            <div className="space-y-6 flex flex-col" style={{ marginTop: "40px" }}>
              
                <div className="flex flex-row gap-[95px]">
                    <div className="skeleton h-6 w-1/4"></div>
                    <div className="skeleton h-6 w-1/4"></div>
                </div>
                <div className="flex flex-row gap-[95px]">
                    <div className="skeleton h-6 w-1/4"></div>
                    <div className="skeleton h-6 w-1/4"></div>
                </div>
            </div> */}
        </div>
    );
};

export default CategoriesSkeletonLoader;