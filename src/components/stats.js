import { useState, useEffect } from "react";

import { getTopNUrlsByVisits } from "../api";

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const unsubscribe = getTopNUrlsByVisits(setStats);

    return unsubscribe;
  }, []);

  return (
    <ul>
      {stats.map((item) => (
        <li key={item.url}>
          {item.url}: {item.visitedCount}
        </li>
      ))}
    </ul>
  );
};

export default Stats;
