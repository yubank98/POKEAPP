import React from "react";
import { useTypes } from "../../hooks/usetypes";
import { getTypeIcon } from "../../utils/poke-helpers";
import { typeData } from "../../utils/collectionTypes";
import chroma from "chroma-js";
import "../styles/typeBar.css";

const TypeBar = ({ toggleTypes }) => {
  const types = useTypes();

  return (
    <div className="types-Bar">
      {types.map((type) => (
        <span
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