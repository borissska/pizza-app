import React, { useState } from 'react';
import { ESortProperty } from '../../../../shared/@types/enum_types';
import { TSort, setSort } from '../../../../shared/redux/slices/filterSlice';
import { useAppDispatch } from '../../../../shared/redux/store';

export const listSort: TSort[] = [
  { name: 'популярности', sortProperty: ESortProperty.RATING_ASC },
  { name: 'популярности-', sortProperty: ESortProperty.RATING_DESC },
  { name: 'цене', sortProperty: ESortProperty.PRICE_ASC },
  { name: 'цене-', sortProperty: ESortProperty.PRICE_DESC },
  { name: 'алфавиту', sortProperty: ESortProperty.TITLE_ASC },
  { name: 'алфавиту-', sortProperty: ESortProperty.TITLE_DESC },
];

type TSortProps = {
  sort: TSort;
};

const Sort: React.FC<TSortProps> = React.memo(({ sort }) => {
  const dispatch = useAppDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);

  const onClickListItem = (e: TSort) => {
    dispatch(setSort(e));
    setIsVisiblePopup(!isVisiblePopup);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const path = e.composedPath();
      if (sortRef.current && !path.includes(sortRef.current)) {
        setIsVisiblePopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className='sort' ref={sortRef}>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>{sort.name}</span>
      </div>
      {isVisiblePopup && (
        <div className='sort__popup'>
          <ul>
            {listSort.map((value) => (
              <li
                key={value.name}
                onClick={() => onClickListItem(value)}
                className={sort.name === value.name ? 'active' : ''}
              >
                {value.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
