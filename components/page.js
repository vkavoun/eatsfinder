import React, { useRef } from 'react';

export default function Page(props) {
  const { children } = props;

  return (
    <div className={'main-feed'}>
      {children}
      <style jsx>
        {`
          .main-feed {
            height: auto;
            width: 80%;
            position: relative;
            display: block;
            overflow-y: auto;
            scroll: vertical;
            scroll-behavior: smooth;
            margin: 0 auto 0 auto;
            padding-top: 1rem;
          }
        `}
      </style>
    </div>
  );
}
