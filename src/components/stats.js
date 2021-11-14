import "../style.css";

import { useState, useEffect } from "react";

import { getTopNUrlsByVisits } from "../api";

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const unsubscribe = getTopNUrlsByVisits(setStats);

    return unsubscribe;
  }, []);

  return (
    <div className="stats_container">
      <h3>Most popular urls:</h3>
      <ul>
        {stats.map((item) => (
          <li key={item.url}>
            <a target="_blank" rel="noopener noreferrer" href={item.url}>
              {item.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
