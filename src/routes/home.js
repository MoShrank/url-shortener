import "../style.css";
import { useState } from "react";

import { checkIfUrlExists, createShortUrl, getShortUrl } from "../api";
import { validateUrl } from "../util";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let shortUrl = "";

    if (!validateUrl(url)) {
      setError("Url is invalid.");
      return;
    }

    if (await checkIfUrlExists(url)) {
      shortUrl = await getShortUrl(url);
    } else {
      shortUrl = await createShortUrl(url);
    }

    setError(null);
    setShortUrl(shortUrl);
  };

  const handleReset = () => {
    setUrl("");
    setShortUrl("");
    setError("");
  };

  /* TODO
    - styling + fancy animation
    - stats
  */

  return (
    <div className="home_container">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input type="submit" />
        </form>
      </div>

      {shortUrl && <div>{shortUrl}</div>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
