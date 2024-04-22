import { useNavigate } from "react-router-dom";

import ErrorImg from "../../assets/error.gif";
import "./Error.css";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1>404</h1>
      <h2>Page not found</h2>
      <img src={ErrorImg} alt="" />
      <button className="btn-return" onClick={() => navigate("/")}>
        RETURN TO HOME
      </button>
    </div>
  );
}

export default Error;
