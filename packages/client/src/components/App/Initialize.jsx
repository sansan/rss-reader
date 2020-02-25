import { useEffect } from "react";
import { useStore } from "../../store/store";
import { default as HttpClient } from "../../store/HttpClient";

const Initialize = ({ children }) => {
  const { state, dispatch } = useStore();
  const user = state.user;
  const baseUrl = "/rest/v1";
  window.store = state;

  useEffect(() => {
    if (!user) {
      HttpClient.get(`${baseUrl}/auth/userinfo`).then(({ id, email }) => {
        if (id) {
          dispatch({ type: "SET_USER", payload: { id, email } });
        }
      });
    }
  }, []);

  return children;
};

export default Initialize;
