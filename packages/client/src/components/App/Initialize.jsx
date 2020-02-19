import { useEffect } from "react";
//import { getUser } from "../../store/ducks/user/operations";
import { useStore } from "../../store/store";

const Initialize = ({ children }) => {
  //const [{ user }] = useStore();
  const { state, dispatch } = useStore();
  console.log(state);
  window.store = state;
  const user = null;
  useEffect(() => {
    if (!user) {
      //getUser(dispatch);
    }
  }, []);

  return children;
};

export default Initialize;
