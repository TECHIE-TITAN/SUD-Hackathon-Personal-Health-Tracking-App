import React from 'react';

const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.195.025.39.05.588.08m-5.858 2.106c.195.025.39.05.588.08m5.858-2.106a2.25 2.25 0 1 1 0 2.186m0-2.186m0 2.186 4.486 2.491m-4.486-7.162 4.486-2.491m-4.486 7.162V7.838m0 6.326v-6.326m0 0a2.25 2.25 0 1 0 0-2.186m0 2.186c-.195-.025-.39-.05-.588-.08m5.858-2.106c-.195-.025-.39-.05-.588-.08m-5.858 2.106a2.25 2.25 0 1 1 0-2.186m0 2.186m0 0 4.486 2.491" />
  </svg>
);

export default ShareIcon;