import queryString from 'query-string';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Admin from './components/Admin';
import Header from './components/Header/index';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import { ADMIN_ROLE } from './constants/';
import CartFeature from './features/Cart';
import ProductFeature from './features/Product';
import Checkout from './features/Product/pages/Checkout';
import DetailPage from './features/Product/pages/DetailPage';
import { cartItemCountSelector } from './features/Cart/selectors';
import CartEmpty from './features/Cart/components/CartEmpty';

function App() {
  const cartItemsCount = useSelector(cartItemCountSelector);
  const currentUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!currentUser.id;
  const ROLE = currentUser.role;
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: 'salePrice',
      _order: params._order || 'asc',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  return (
    <div className="app">
      <Switch>
        {ROLE !== ADMIN_ROLE && (
          <>
            <Switch>
              <Redirect from="/home" to="/" exact />
              <Route path="/" exact>
                <Header queryParams={queryParams} />
                <ProductFeature queryParams={queryParams} />
              </Route>
              <Route path="/products/:productId">
                <Header />
                <DetailPage />
              </Route>
              {isLoggedIn ? (
                <>
                  <Route path="/cart">
                    <Header />
                    <CartFeature />
                  </Route>
                  {cartItemsCount > 0 ? (
                    <Route path="/checkout">
                      <Header />
                      <Checkout />
                    </Route>
                  ) : (
                    <Route path="/checkout">
                      <Header />
                      <CartEmpty />
                    </Route>
                  )}

                  <Route path="/account">
                    <Header />
                    <Profile />
                  </Route>
                </>
              ) : (
                <Route path="*" component={NotFound}></Route>
              )}

              <Route path="*" component={NotFound}></Route>
            </Switch>
          </>
        )}
        {ROLE === ADMIN_ROLE && (
          <Route path="/admin">
            <Admin />
          </Route>
        )}
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
