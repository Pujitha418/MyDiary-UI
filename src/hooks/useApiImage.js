import axios from "axios";
import { useState, useCallback, useEffect } from "react";

function useApiImage(url, token, defaultValue) {
  const [data, setData]  = useState(defaultValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      var common_axios = axios.create({
        url
      });

      // Set default headers to common_axios ( as Instance )
      common_axios.defaults.headers.common['Authorization'] = token;
      //common_axios.defaults.headers.common['Access-Control-Allow-Origin'] = "http://localhost:3000";
      common_axios.defaults.headers.common['Access-Control-Allow-Methods'] = "GET";
      common_axios.defaults.headers.common['Access-Control-Allow-Headers'] = "Content-Type, Authorization";

      // Check your Header
      console.log('headers - ',common_axios.defaults.headers);

      const res = await common_axios.get(url);
      console.log('res-', res);
      setData("data:image/png;base64," + res.data);
      setError(null);
    } catch (error) {
      setError(error);
      setData(null);
    }
    setLoading(false);
  }, [url, token]);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return {
    data,
    error,
    loading
  };
}

export default useApiImage;