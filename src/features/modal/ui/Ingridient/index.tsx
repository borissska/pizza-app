import React from 'react';
import { useSelector } from 'react-redux';
import { TTheIngr } from '../../../../shared/@types/ingridient_types';
import { selectPizza, deleteIngr, addIngr } from '../../../../shared/redux/slices/modalSlice';
import { useAppDispatch } from '../../../../shared/redux/store';

const Ingridient: React.FC<TTheIngr> = (data) => {
  const dispatch = useAppDispatch();
  const [activeIngr, setActive] = React.useState(false);
  const { active } = useSelector(selectPizza);

  React.useEffect(() => {
    setActive(false);
  }, [active]);

  const addIngridient = () => {
    setActive(!activeIngr);
    if (activeIngr) {
      dispatch(deleteIngr(data.ingr_name));
    } else {
      dispatch(addIngr(data));
    }
  };

  return (
    <div className='ingridients'>
      {data.price !== 0 && (
        <button className={activeIngr ? 'active' : ''} onClick={addIngridient}>
          <img className='ingridients__picture' src={data.ingr_url} alt={data.ingr_name}></img>
          <div className='ingridients__title'>{data.ingr_name}</div>
          <div className='ingridients__price'>{data.price} Р</div>
        </button>
      )}
    </div>
  );
};

export default Ingridient;
