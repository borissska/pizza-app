import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <div className='pizza-block-wrapper'>
    <ContentLoader
      className='pizza-block'
      speed={2}
      width={280}
      height={500}
      viewBox='0 0 280 500'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      <circle cx='139' cy='130' r='130' />
      <rect x='0' y='285' rx='10' ry='10' width='280' height='32' />
      <rect x='0' y='337' rx='10' ry='10' width='280' height='88' />
      <rect x='0' y='450' rx='10' ry='10' width='91' height='35' />
      <rect x='128' y='445' rx='20' ry='20' width='152' height='45' />
    </ContentLoader>
  </div>
);

export default Skeleton;
