import React from 'react';
import { listSort } from '../components/Sort';
import { Pagination, Skeleton, PizzaBlock, Sort, Categories } from '../components';
import { useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
  selectSearchValue,
} from '../redux/slices/filterSlice.ts';
import { fetchPizzas, selectPizza, TFetchPizzasArgs } from '../redux/slices/pizzasSlice.ts';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizza);
  const searchValue = useSelector(selectSearchValue);

  const sortType = sort.sortProperty;
  const items = pizzas.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  const onClickCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index))
  }, []);

  const onChangePage = React.useCallback((index: number) => {
    dispatch(setCurrentPage(index));
  }, []);

  const getPizzas = async () => {
    const categoryIf = categoryId > 0 ? `category=${categoryId}` : '';
    const sortIf = sortType.endsWith('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        categoryIf,
        sortIf,
        search,
        currentPage,
        sortType,
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = listSort.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({
        searchValue: String(params.searchValue),
        categoryId: Number(params.categoryId),
        currentPage: Number(params.currentPage),
        sort: sort || listSort[0]
      }));
      
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId,
        currentPage: currentPage,
      });

      navigate(`?${queryString}`);
    }

    if (!window.location.search) {
      dispatch(fetchPizzas({} as TFetchPizzasArgs));
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
    console.log('search')

  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories category={categoryId} onClickCategory={onClickCategory} />
        <Sort sort={sort}/>
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Ошибка!</h2>
          <p>Ведутся работы!</p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : items}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
