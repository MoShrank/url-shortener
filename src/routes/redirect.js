import "../style.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getUrl } from "../api";

const Redirect = () => {
  const params = useParams();

  useEffect(() => {
    const redirectToUrl = async () => {
      try {
        const url = await getUrl(params.shortUrl);
        window.location.assign(url);
      } catch (_) {
        window.location.assign("/404");
      }
    };

    redirectToUrl();
  }, []);

  return (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  );
};

export default Redirect;
