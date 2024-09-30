import './scss/app.scss';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import React from 'react';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ 
  './pages/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */
  './pages/NotFound'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */
  './pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route
          path='cart'
          element={
            <React.Suspense fallback={<>Идет загрузка!</>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path='pizza/:id'
          element={
            <React.Suspense fallback={<>Идет загрузка!</>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path='*'
          element={
            <React.Suspense fallback={<>Идет загрузка!</>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
