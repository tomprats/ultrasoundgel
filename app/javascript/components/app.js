import {useEffect, useMemo, useReducer} from "react";
import {setApp} from "app/actions/app";
import Context from "app/context";
import Reducer from "app/reducer";
import {get as getApp} from "app/requests/app";
import Router from "components/router";
import Cache from "lib/cache";

const initialState = {
  app: {loading: true},
  cart: Cache.get("cart") || {shipping: {}},
  notifications: [],
  page: {},
  pages: [],
  user: null
};

export default function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state, dispatch]);

  useEffect(() => {
    getApp().then((data) => { dispatch(setApp(data)); });
  }, []);

  return (
    <Context.Provider value={value}>
      <Router />
    </Context.Provider>
  );
}
