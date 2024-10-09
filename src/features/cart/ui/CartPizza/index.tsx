import React from 'react';
import { TTheIngr } from '../../../../shared/@types/ingridient_types';
import { TThePizza } from '../../../../shared/@types/pizza_types';
import CrossIcon from '../../../../shared/assets/icons/CrossIcon';
import MinusIcon from '../../../../shared/assets/icons/MinusIcon';
import { removePizza, addPizza, removePizzas } from '../../../../shared/redux/slices/cartSlice';
import { useAppDispatch } from '../../../../shared/redux/store';

const typeNames = ['тонкое', 'традиционное'];
const sizeNames = [26, 30, 40];

const CartPizza: React.FC<TThePizza> = (pizza) => {
  const dispatch = useAppDispatch();

  const onClickMinus = () => {
    dispatch(removePizza(pizza));
  };

  const onClickPlus = () => {
    dispatch(addPizza(pizza));
  };

  return (
    <div className='cart__item'>
      <div className='cart__item-img'>
        <img className='pizza-block__image' src={pizza.imageUrl} alt='Pizza' />
      </div>
      <div className='cart__item-info'>
        <h3>{pizza.title}</h3>
        <p>
          {typeNames[pizza.type]}, {sizeNames[pizza.size]} см.
        </p>
        {pizza.ingr.length > 1 && (pizza.ingr.map((obj: TTheIngr) => <p>{obj.ingr_name}</p>))}
      </div>
      <div className='cart__item-count'>
        <div
          className='button button--outline button--circle'
          onClick={onClickMinus}
        >
          <MinusIcon fill='#000000' height='12px' width='12px'/>
        </div>
        <b>{pizza.count}</b>
        <div
          className='button button--outline button--circle cart__item-count-plus'
          onClick={onClickPlus}
        >
          <MinusIcon fill='#000000' height='12px' width='12px'/>
        </div>
      </div>
      <div className='cart__item-price'>
        <b>{pizza.price * pizza.count} ₽</b>
      </div>
      <div
        className='cart__item-remove'
        onClick={() => {
          dispatch(removePizzas(pizza));
        }}
      >
        <div className='button button--outline button--circle'>
          <CrossIcon fill='#00000030' height='11px' width='11px'/>
        </div>
      </div>
    </div>
  );
};

export default CartPizza;
