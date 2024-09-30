import React from 'react';

type CategoriesProps = {
  category: number;
  onClickCategory: (index: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ category, onClickCategory }) => {
  return (
    <div className='categories'>
      <ul>
        {categories.map((_, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={category === index ? 'active' : ''}
          >
            {categories[index]}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
