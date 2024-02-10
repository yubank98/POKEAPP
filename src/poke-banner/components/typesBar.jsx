import React from "react";
import { useTypes } from "../../hooks/usetypes";
import { getTypeIcon } from "../../utils/poke-helpers";
import "../styles/typeBar.css";

const TypeBar = ({ toggleTypes }) => {
  const types = useTypes();

  return (
    <div className="types-Bar">
      {types.map((type) => (
        <span
          key={type.name}
          className={`Img-type ${type.name}`}
          onClick={() => toggleTypes(type.name)}
        >
          <img src={getTypeIcon(type.name)} alt={type.name} />
        </span>
      ))}
    </div>
  );
};

export default TypeBar;