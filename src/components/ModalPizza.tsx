import React from 'react';
import { useSelector } from 'react-redux';
import { selectPizza, setInactive } from '../redux/slices/modalSlice';
import { useAppDispatch } from '../redux/store';

const FullPizza: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pizza, active } = useSelector(selectPizza);
  console.log('Работаем!');

  if (!pizza) {
    return;
  }

  return (
    <div
      className={active ? 'modal modal--active' : 'modal'}
      onClick={() => {dispatch(setInactive(false)); console.log(active)}}
    >
      <div className={active ? 'modal__content modal__content--active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
        <img src={pizza.imageUrl} alt='Ссылка на картинку недоступна!' />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price[0]} ₽</h4>
      </div>
    </div>
  );
};

export default FullPizza;
