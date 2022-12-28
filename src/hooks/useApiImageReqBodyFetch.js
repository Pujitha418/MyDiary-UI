import { useState, useEffect, useCallback } from "react";

function useApiImageReqBody(url, token, requestBody, defaultValue) {
  const [data, setData]  = useState(defaultValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    console.log("inside useApiImageReqBody");
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    console.log("myHeaders-",myHeaders);
    var raw = JSON.stringify(requestBody);
    console.log("raw-", raw);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      //redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.text())
      .then(result => {
        console.log(result);
        setData("data:image/png;base64," + result);
      })
      .catch(error => setError(error));
    setLoading(false);
  }, [url, token, requestBody]);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return {
    data,
    error,
    loading
  };
}

export default useApiImageReqBody;