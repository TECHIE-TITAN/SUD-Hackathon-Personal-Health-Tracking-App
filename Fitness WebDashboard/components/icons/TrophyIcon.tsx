
import React from 'react';

const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 0 0 9 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 15.75c0-4.305-3.582-7.75-8.25-7.75S3 11.445 3 15.75m16.5 0v2.25A2.25 2.25 0 0 1 17.25 21h-10.5A2.25 2.25 0 0 1 4.5 18V15.75m16.5 0c0-4.305-3.582-7.75-8.25-7.75S3 11.445 3 15.75m16.5 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11.25v2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25v2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25v2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 15.75h.75a2.25 2.25 0 0 0 2.25-2.25V9a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 9v4.5A2.25 2.25 0 0 0 4.5 15.75h.75" />
    </svg>
);

export default TrophyIcon;
