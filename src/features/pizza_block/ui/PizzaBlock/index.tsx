import React from 'react';
import { TAPizza } from '../../../../shared/@types/pizza_types';
import { setActive } from '../../../../shared/redux/slices/modalSlice';
import { useAppDispatch } from '../../../../shared/redux/store';

const PizzaBlock: React.FC<TAPizza> = (apizza) => {
  const dispatch = useAppDispatch();

  const onClickPizza = () => {
    dispatch(setActive(apizza));
  };

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block' onClick={onClickPizza}>
        <img className='pizza-block__image' src={apizza.imageUrl} alt='Pizza' />
        <div className='pizza-block__data'>
          <h4 className='pizza-block__title'>{apizza.title}</h4>
          <p className='pizza-block__info'>{apizza.info}</p>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {apizza.price[0]} ₽</div>
          <button className='button button--outline button--add'>
            <span>Выбрать</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
