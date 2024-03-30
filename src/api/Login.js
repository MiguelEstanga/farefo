
import axios from "axios";

const useFetchWithCredentials = ({
  url,
  method,
  body,
  headers,
}) => {
  const [response, setResponse] = useState(null);
  const
  useEffect(() => {
    axios
      .request({
        url,
        method,
        headers,
        data: body,
        withCredentials: true,
      })
      .then((res) => {
        setResponse(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [url, method, body, headers]);

  return response;
};

export default useFetchWithCredentials;
