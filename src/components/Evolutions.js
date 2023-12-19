import React from "react";
import { Link } from "react-router-dom";

function Evolutions({ evolutions }) {
  if (evolutions.length === 0) {
    return null;
  }

  return (
    <div>
      <h3>Evolutions:</h3>
      <div className="d-flex">
        {evolutions.map((evo, index) => (
          <div key={index} className="m-2">
            <Link to={`/pokemon/${evo.id}`}>
              <img
                src={evo.sprite}
                alt={evo.name}
                className="img-fluid"
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Evolutions;
