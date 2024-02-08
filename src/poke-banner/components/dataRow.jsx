import React from 'react';
import '../styles/modal.css';

const DataRow = ({ category, value, max, type }) => {
    return (
        <tr>
            <td className='category'>{ category }</td>
            <td className="stats-number">{ value }</td>
            {
                max &&
                <td className="range-slide">
                    <div className= {`range-slide-fill ${type}`}  style={{ "--percentage": (value / max) * 100 + '%'}}></div>
                </td>
            }
        </tr>
    );
};

export default DataRow;