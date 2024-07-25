import React from "react";
import "../styles/modal.css";
import { typeData } from "../../utils/collectionTypes";

const DataRow = ({ category, value, types }) => {
  const typeColor = types[1] ? typeData[types[1].name].color : "#fff";

  return (
    <tr>
      <td className="category">{category}</td>
      {255 && (
        <td className="range-slide">
          <div
            className="range-container"
            style={{
              "--max-color": typeColor,
              "--value-color": typeData[types[0].name].color,
              "--percentage": (value / 255) * 100 + "%",
            }}
          >
            <div className="range-fill"></div>
          </div>
        </td>
      )}
      <td className="stats-number">
        {value}
      </td>
    </tr>
  );
};

export default DataRow;
