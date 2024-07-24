import React, {useState} from "react";
import { useTypes } from "../../hooks/usetypes";
import { getTypeIcon } from "../../utils/poke-helpers";
import "../styles/typeBar.css";

const TypeBar = ({ toggleTypes }) => {
  const types = useTypes();
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    toggleTypes(type);
  };

  return (
    <div className="types-Bar">
      {types.map((type) => (
        <span
          key={type.name}
          className={`Img-type ${type.name}`}
          onClick={() => handleTypeClick(type.name)}
        >
          {selectedType === type.name && (
            <span className="typeName">{type.name}</span>
          )}
          <img src={getTypeIcon(type.name)} alt={type.name} />
        </span>
      ))}
    </div>
  );
};

export default TypeBar;
