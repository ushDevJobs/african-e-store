import React from 'react';
import styles from '../categories/Categories.module.scss'

export const StoreStoreRatingSkeletonLoader: React.FC = () => {
    return (
        <div className='-mt-10 animate-pulse'>
            <div className="skeleton h-40 mb-10 rounded-xl" style={{ marginTop: "40px" }}></div>
        </div>
    );
};
export const StoreInputSkeletonLoader: React.FC = () => {
    return (
        <div className='-mt-10 animate-pulse'>
            <div className="skeleton h-10 w-1/2 mb-10 rounded-xl" style={{ marginTop: "40px" }}></div>
        </div>
    );
};
export const StoreTabsSkeletonLoader: React.FC = () => {
    return (
        <div className='-mt-10 animate-pulse'>
            <div className="skeleton h-10 w-1/2 mb-10 rounded-xl" style={{ marginTop: "20px" }}></div>
        </div>
    );
};

export const StoreSettingsBarSkeletonLoader: React.FC = () => {
    return (
        <div className="hidden md:flex flex-col space-y-5">
            <div className="skeleton h-6 w-[100%]"></div>
            <div className="skeleton h-6 w-[100%]"></div>
            <div className="skeleton h-6 w-[100%]"></div>
            <div className="skeleton h-6 w-[100%]"></div>
            <div className="skeleton h-6 w-[100%]"></div>
            <div className="skeleton h-6 w-[100%]"></div>
            <div className="skeleton h-6 w-[100%]"></div>
            <div className="skeleton h-6 w-[100%]"></div>
            <div className="skeleton h-6 w-[100%]"></div>
            <div className="skeleton h-6 w-[100%]"></div>
        </div>
    );
};

export const StoreCategoriesSkeletonLoader: React.FC = () => {
    return (
        <div className={`-mt-10 animate-pulse`}>
            <div className="flex flex-col gap-y-10 md:grid md:grid-cols-2 lg:grid-cols-3 w-full">
                <div className="flex flex-col space-y-5">
                    <div className="hidden skeleton h-6 w-1/2"></div>
                    <div className="flex flex-col space-y-5">
                        <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[250px] rounded-xl"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="hidden skeleton h-6 w-1/2"></div>
                    <div className="flex flex-col space-y-5">
                        <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[250px] rounded-xl"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="hidden skeleton h-6 w-1/2"></div>
                    <div className="flex flex-col space-y-5">
                        <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[250px] rounded-xl"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="hidden skeleton h-6 w-1/2"></div>
                    <div className="flex flex-col space-y-5">
                        <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[250px] rounded-xl"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="hidden skeleton h-6 w-1/2"></div>
                    <div className="flex flex-col space-y-5">
                        <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[250px] rounded-xl"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="hidden skeleton h-6 w-1/2"></div>
                    <div className="flex flex-col space-y-5">
                        <div className="skeleton h-[300px] md:h-[200px] w-[100%] md:w-[250px] lg:w-[250px] rounded-xl"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
