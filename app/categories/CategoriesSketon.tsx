import React from 'react';
import styles from './Categories.module.scss'

const CategoriesSkeletonLoader: React.FC = () => {
    return (
        <div className={`${styles.main} -mt-10 animate-pulse`}>
            <div className="skeleton h-36 mb-10 rounded-xl" style={{ marginTop: "40px" }}></div>
            <div className="skeleton mb-10 ml-auto h-6 w-[70%] md:hidden"></div>

            <div className="w-full flex flex-col md:flex-row">
                <div className="hidden md:flex flex-col space-y-5 basis-[30%]">
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
                <div className="flex flex-col gap-y-10 md:grid md:grid-cols-2 lg:grid-cols-3 basis-[70%]">
                    <div className="flex flex-col space-y-5">
                        <div className="hidden skeleton h-6 w-1/2"></div>
                        <div className="flex flex-col space-y-5">
                            <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[240px] rounded-xl"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <div className="hidden skeleton h-6 w-1/2"></div>
                        <div className="flex flex-col space-y-5">
                            <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[240px] rounded-xl"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <div className="hidden skeleton h-6 w-1/2"></div>
                        <div className="flex flex-col space-y-5">
                            <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[240px] rounded-xl"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <div className="hidden skeleton h-6 w-1/2"></div>
                        <div className="flex flex-col space-y-5">
                            <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[240px] rounded-xl"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <div className="hidden skeleton h-6 w-1/2"></div>
                        <div className="flex flex-col space-y-5">
                            <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[240px] rounded-xl"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <div className="hidden skeleton h-6 w-1/2"></div>
                        <div className="flex flex-col space-y-5">
                            <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[240px] rounded-xl"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                            <div className="skeleton h-6 w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesSkeletonLoader;