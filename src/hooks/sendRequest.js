import { useState, useCallback } from "react";
const useSendRequest = (handleData) => {

    const [error, setError] = useState('');
    const sendRequest = useCallback(async (requestConfig) => {
        // console.log("sendRequest", requestConfig)
        try {
          
            let options = {
                method: requestConfig.method ? requestConfig.method : 'GET',
            }
            if (requestConfig.body) {
                options.body = JSON.stringify(requestConfig.body);
            }
            if (requestConfig.headers) {
                options.headers = requestConfig.headers;
            }


            const fetchResponse = await fetch(requestConfig.url, options);
            const data = await fetchResponse.json();

            handleData(data);
            console.log('here', data);
            
        }
        catch (error) {
            console.log('error', error);
            setError(error.message);
            
        }
    },[])

    return {  error, sendRequest }
}
export default useSendRequest;