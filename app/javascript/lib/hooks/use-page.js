import {useContext, useEffect} from "react";
import {Context} from "app";
import {setPage} from "app/actions/page";

export default function usePage(page) {
  const dispatch = useContext(Context)[1];

  useEffect(() => {
    dispatch(setPage({...page}));

    return () => dispatch(setPage({}));
  }, []);
}
