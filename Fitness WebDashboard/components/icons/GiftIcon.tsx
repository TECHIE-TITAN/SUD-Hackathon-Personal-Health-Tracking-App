import React from 'react';

const GiftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25v-8.25M12 15v6M3 11.25h18M12 11.25a2.25 2.25 0 0 0-2.25 2.25v.01c0 .317.082.622.234.887l-.521 1.042a.75.75 0 0 0 .664 1.062h4.773a.75.75 0 0 0 .664-1.062l-.521-1.042a2.25 2.25 0 0 0 .234-.887v-.01A2.25 2.25 0 0 0 12 11.25ZM12 2.25a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 12 2.25ZM6.34 6.34a.75.75 0 0 0-1.06-1.06l-1.5 1.5a.75.75 0 1 0 1.06 1.06l1.5-1.5Zm12.38 0-1.5-1.5a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.06-1.06Z" />
  </svg>
);

export default GiftIcon;
