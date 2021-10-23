import {useContext} from "react";
import Context from "app/context";

export default function useAppContext() {
  return useContext(Context);
}
