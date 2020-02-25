import { useEffect } from "react";
import { useStore } from "../../store/store";
import { default as HttpClient } from "../../store/HttpClient";

const Initialize = ({ children }) => {
  const { state, dispatch } = useStore();
  const { user, loading } = state;
  const { GET_USER } = loading;
  const baseUrl = "/rest/v1";
  useEffect(() => {
    console.log({ GET_USER });
  }, [GET_USER]);

  window.store = state;

  useEffect(() => {
    if (!user && !GET_USER) {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "GET_USER", value: true }
      });
      HttpClient.get(`${baseUrl}/auth/userinfo`).then(({ id, email }) => {
        if (id) {
          dispatch({ type: "SET_USER", payload: { id, email } });
        }
        dispatch({
          type: "SET_LOADING",
          payload: { key: "GET_USER", value: false }
        });
      });
    }
  }, []);

  return children;
};

export default Initialize;
