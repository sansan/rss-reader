import { useEffect } from "react";
import useStoreon from 'storeon/react'


const Initialize = ({ children }) => {
  const { user, loading, dispatch } = useStoreon('user', 'loading');
  const isLoading = loading.includes('USER_INFO');

  useEffect(() => {
    if (!user && !isLoading) {
      dispatch('user/get');
    }
  }, []);

  return children;
};

export default Initialize;
