import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://66bb5ce96a4ab5edd6383355.mockapi.io/pizzas/' + id,
        );
        setPizza(data);
      } catch (e) {
        alert(e);
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='Ссылка на картинку недоступна!' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
