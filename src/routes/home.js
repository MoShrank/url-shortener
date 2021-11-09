import "../style.css";
import { useState } from "react";

import { checkIfUrlExists, createShortUrl, getShortUrl } from "../api";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let shortUrl = "";

    if (await checkIfUrlExists(url)) {
      shortUrl = await getShortUrl(url);
    } else {
      shortUrl = await createShortUrl(url);
    }

    setShortUrl(shortUrl);
  };

  const handleReset = () => {
    setUrl("");
    setShortUrl("");
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
    </div>
  );
};

export default Home;
