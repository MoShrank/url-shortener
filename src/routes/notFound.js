import "../style.css";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not_found_container">
      <h3>404 URL could not be found :(</h3>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default NotFound;
