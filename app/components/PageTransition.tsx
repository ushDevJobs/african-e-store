import { useState, useEffect } from 'react';

interface PageTransitionProps {
    previousPage: string | null;
    currentPage: string | null;
    direction: 'forward' | 'backward';
}

function PageTransition({ previousPage, currentPage, direction }: PageTransitionProps) {
    const arrowIcon = direction === 'forward' ? '<' : '>';

    const pageTransitionInfo = previousPage && currentPage ? (
        <p>
            {previousPage}
            {arrowIcon}
            {currentPage}
        </p>
    ) : null;

    return (
        <div>
            {pageTransitionInfo}
        </div>
    );
}

export default PageTransition;
