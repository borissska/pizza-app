import React from 'react';
import styles from './Search.module.scss';
// @ts-ignore
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../../../shared/redux/slices/filterSlice';
import { useAppDispatch } from '../../../../shared/redux/store';

const Search: React.FC = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 150),
    [],
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns='http://www.w3.org/2000/svg'
        height='512'
        viewBox='0 0 512 512'
        width='512'
      >
        <path d='M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z' />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChangeInput(e)}
        className={styles.input}
        placeholder='Поиск пиццы ...'
      />

      {value && (
        <svg
          onClick={() => onClickClear()}
          className={styles.clearIcon}
          height='14px'
          version='1.1'
          viewBox='0 0 14 14'
          width='14px'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z'
            id='Shape'
          />
        </svg>
      )}
    </div>
  );
};

export default Search;
