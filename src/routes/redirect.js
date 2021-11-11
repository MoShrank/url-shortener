import "../style.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getUrl } from "../api";

const Redirect = () => {
  const params = useParams();

  useEffect(() => {
    getUrl(params.shortUrl).then((url) => {
      window.location.assign(url);
    });
  }, []);

  return (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  );
};

export default Redirect;
