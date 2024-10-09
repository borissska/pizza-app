import React from 'react';
import { useSelector } from 'react-redux';
import Ingridient from '../Ingridient';
import { TAIngr } from '../../../../shared/@types/ingridient_types';
import { addPizza } from '../../../../shared/redux/slices/cartSlice';
import { selectPizza, setSize, setType, clearIngr, setInactive } from '../../../../shared/redux/slices/modalSlice';
import { useAppDispatch } from '../../../../shared/redux/store';

const typeNames = ['тонкое', 'традиционное'];
const sizeNames = [26, 30, 40];
const size = ['small', 'medium', 'large'];

const FullPizza: React.FC = () => {
  const dispatch = useAppDispatch();
  const { apizza, active, thepizza } = useSelector(selectPizza);

  React.useEffect(() => {
    if (apizza) {
      dispatch(setSize(apizza.sizes[0]));
      dispatch(setType(apizza.types[0]));
      dispatch(clearIngr());
    }
  }, [apizza, active]);

  if (!apizza) {
    return;
  }

  const onClickAdd = () => {
    dispatch(setInactive(false));
    dispatch(addPizza(thepizza));
  };

  return (
    <div
      className={active ? 'modal modal--active' : 'modal'}
      onClick={() => dispatch(setInactive(false))}
    >
      <div
        className={active ? 'modal__content modal__content--active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal__content-leftrow'>
          <div className='modal__content-leftrow-mcircle'></div>
          <div className='modal__content-leftrow-lcircle'></div>
          <img
            className={size[thepizza.size]}
            src={apizza.imageUrl}
            alt='Ссылка на картинку недоступна!'
          />
        </div>
        <div className='modal__content-rightrow'>
          <div className='modal__content-rightrow-scroll custom-scrollbar'>
            <h2>{apizza.title}</h2>
            <p>
              {sizeNames[thepizza.size]} см, {typeNames[thepizza.type]} тесто
            </p>
            <p>{apizza.info}</p>
            <div className='modal__content-rightrow-selector'>
              <ul>
                {apizza.types.map((value: number) => (
                  <li
                    key={value}
                    className={thepizza.type === value ? 'active' : ''}
                    onClick={() => dispatch(setType(value))}
                  >
                    {typeNames[value]}
                  </li>
                ))}
              </ul>
              <ul>
                {apizza.sizes.map((value: number) => (
                  <li
                    key={value}
                    className={thepizza.size === value ? 'active' : ''}
                    onClick={() => dispatch(setSize(value))}
                  >
                    {sizeNames[value]}
                  </li>
                ))}
              </ul>
            </div>
            <div className='modal__content-rightrow-items'>
              {apizza.ingr.map(
                (obj: TAIngr, index: number) =>
                  obj.price[thepizza.size] !== 0 && (
                    <Ingridient
                      key={index}
                      ingr_name={obj.ingr_name}
                      price={obj.price[thepizza.size]}
                      ingr_url={obj.ingr_url}
                    />
                  ),
              )}
            </div>
          </div>
          <div className='modal__content-rightrow-button'>
            <button onClick={onClickAdd} className='button button--outline button--add'>
              <span>В корзину за {thepizza.price} р.</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
