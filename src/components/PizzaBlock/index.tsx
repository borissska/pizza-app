import React from 'react';
import { useSelector } from 'react-redux';
import { addPizza, selectCartPizza } from '../../redux/slices/cartSlice';
import { TAPizza, TThePizza } from '../../redux/slices/pizzasSlice';
import { useAppDispatch } from '../../redux/store';
import { setActive } from '../../redux/slices/modalSlice';

const typeNames = ['тонкое', 'традиционное'];
const sizeNames = [26, 30, 40];

const PizzaBlock: React.FC<TAPizza> = (apizza) => {
  const [activeSize, setActiveSize] = React.useState(apizza.sizes[0]);
  const [activeType, setActiveType] = React.useState(apizza.types[0]);

  const dispatch = useAppDispatch();
  const cartPizza = useSelector(selectCartPizza(apizza.id, activeSize, activeType, apizza.additives_ingr));
  const addedCount = cartPizza ? cartPizza.count : 0;
  const pricePizza = apizza.price[activeSize]

  const onClickAdd = () => {
    const thepizza: TThePizza = {
      id: apizza.id,
      title: apizza.title,
      info: apizza.info,
      imageUrl: apizza.imageUrl,
      additives_ingr: apizza.additives_ingr,
      additives_price: apizza.additives_price,
      price: pricePizza,
      type: activeType,
      size: activeSize,
      count: 0,
    };

    dispatch(addPizza(thepizza));
  };

  const onClickPizza = () => {
    dispatch(setActive(apizza))
  }

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <div className='pizza-block__modal' onClick={onClickPizza}>
          <img className='pizza-block__image' src={apizza.imageUrl} alt='Pizza' />
          <h4 className='pizza-block__title'>{apizza.title}</h4>
        </div>
        <div className='pizza-block__selector'>
          <ul>
            {apizza.types.map((value) => (
              <li
                key={value}
                className={activeType === value ? 'active' : ''}
                onClick={() => setActiveType(value)}
              >
                {typeNames[value]}
              </li>
            ))}
          </ul>
          <ul>
            {apizza.sizes.map((value) => (
              <li
                key={value}
                className={activeSize === value ? 'active' : ''}
                onClick={() => setActiveSize(value)}
              >
                {sizeNames[value]} см.
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {apizza.price[activeSize]} ₽</div>
          <button onClick={onClickAdd} className='button button--outline button--add'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{cartPizza ? cartPizza.count : 0}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
