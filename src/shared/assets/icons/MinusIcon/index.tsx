import React from 'react';

type TMinusIcon = {
    width: string;
    height: string;
    fill: string;
  }

const MinusIcon: React.FC<TMinusIcon> = (data) => {
  return (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={data.width}
        height={data.height}
        viewBox='0 0 24 24'
        fill={data.fill}
      >
        <path
          d='M6 12L18 12'
          stroke='#000000'
          stroke-width='3'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </div>
  );
};

export default MinusIcon;
