import "../style.css";
import { useState } from "react";

import { checkIfUrlExists, createShortUrl, getShortUrl } from "../api";
import { validateUrl } from "../util";

import Stats from "../components/stats";
import { transformUrl } from "../util";

const ShortenerForm = ({ url, setUrl, error, handleSubmit }) => {
  return (
    <div className="url_form_container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={error}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input value="SHORTEN" type="submit" />
      </form>
    </div>
  );
};

const Home = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [displayShortUrl, setDisplayShortUrl] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let shortUrl = "";

    if (!validateUrl(url)) {
      setError("url is invalid!");
      setUrl("");
      return;
    }

    if (await checkIfUrlExists(url)) {
      shortUrl = await getShortUrl(url);
    } else {
      shortUrl = await createShortUrl(url);
    }

    setError(null);
    transformUrl(url, `https://url.moritz.dev/${shortUrl}`, setUrl, () =>
      setDisplayShortUrl(true)
    );
  };

  const handleReset = () => {
    setUrl("");
    setError("");
    setDisplayShortUrl(false);
  };

  return (
    <div className="home_container">
      {displayShortUrl ? (
        <div className="shortened_url_container">
          <a
            className="short_url_text"
            target="_blank"
            rel="noopener noreferrer"
            href={url}
          >
            {url}
          </a>
          <button onClick={handleReset}>RESET</button>
        </div>
      ) : (
        <ShortenerForm
          url={url}
          setUrl={setUrl}
          error={error}
          handleSubmit={handleSubmit}
        />
      )}
      <Stats />
    </div>
  );
};

export default Home;
