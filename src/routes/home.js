import "../style.css";
import { useState } from "react";

const Home = () => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    /* TODO
        - create short url
        - update stats
    */
  };

  /* TODO
    - styling + fancy animation
    - stats
  */

  return (
    <div className="home_container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Home;
