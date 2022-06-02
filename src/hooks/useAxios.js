import { useState, useEffect } from 'react';

const useAxios = (config) => {
  const { axiosInstance, method, url, requestConfig } = config;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    const signal = ctrl.signal;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal,
        });
        setResponse(res);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => ctrl.abort();
  }, []);

  return [response, error, loading];
};

export default useAxios;
