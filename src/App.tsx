import { useEffect, useState } from "react";
import "./App.scss"; 
import Color from "./types/Color";
import { getColorsFromLocalStorage, setColorsToLocalStorage } from "./services/utilities";

function ColorManager() {
  const [colors, setColors] = useState(getColorsFromLocalStorage);
  const [newColor, setNewColor] = useState({name: "", hexValue: ""} as Color);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setColorsToLocalStorage(colors);
  }, [colors]);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColor({...newColor, [e.target.name]: e.target.value});
  };

  const handleAddColor = () => {
    if (newColor.name && newColor.hexValue) {
      setColors([...colors, newColor]);
      setNewColor({name: "", hexValue: ""});
    }
  };

  const handleDeleteColor = (index:number) => {
    const updatedColors = [...colors]
    updatedColors.splice(index, 1);
    setColors(updatedColors)
  }

  const handleOnSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const filteredColors = colors.filter(({name, hexValue}) => {
    const nameMatch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const hexValueMatch = hexValue.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || hexValueMatch;
  })

  return (
    <div className="container color-manager-container">
      <h1>Color Manager</h1>

      <div className="add-color-container">
        <h2>Add Color</h2>
        <div className="input-container">
          <input
            type="text"
            name="name"
            placeholder="Color Name"
            value={newColor.name}
            onChange={handleOnInputChange}
          />
          <input
            type="text"
            name="hexValue"
            placeholder="Hex Value"
            value={newColor.hexValue}
            onChange={handleOnInputChange}
          />
        </div>
        <button className="add-button" onClick={handleAddColor}>
          Add
        </button>
      </div>

      <div className="filter-container">
        <h2>Filter Colors</h2>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleOnSearchTermChange}
        />
      </div>

      <div className="color-list-container">
        <h2>Color List</h2>
        {filteredColors.length === 0 ? (
          <p>No colors found.</p>
        ) : (
          <ul className="color-item-list">
            {filteredColors.map((color, index) => (
              <li key={index} className="color-item">
                <div
                  style={{ backgroundColor: color.hexValue }}
                  className="color-box"
                ></div>
                <div className="color-details">
                  <span className="color-name">{color.name}</span>
                  <span className="color-hex">{color.hexValue}</span>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteColor(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ColorManager;
