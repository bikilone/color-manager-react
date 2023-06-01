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

  const handleOnSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const filteredColors = colors.filter(({name, hexValue}) => {
    const nameMatch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const hexValueMatch = hexValue.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || hexValueMatch;
  })

  return (
    <div>
      <h1>Color Manager</h1>
      <div>
        <h2>Add Color</h2>
        <input id="color-name" name="name" onChange={handleOnInputChange} value={newColor.name} placeholder="Color name:"/>
        <input id="hex" onChange={handleOnInputChange} name="hexValue"  value={newColor.hexValue} placeholder="Hex:"/>
      </div>
      <div>
        <button onClick={handleAddColor}>Submit color</button>
      </div>
      <div>
      <input onChange={handleOnSearchTermChange}  value={searchTerm} placeholder="Search for colors..."/>
        <h2>Color list</h2>
        <ul>
          {filteredColors.length ? (
            filteredColors.map(({name, hexValue}) => {
              return (
                <li key={hexValue}>
                  <span style={{ backgroundColor: hexValue }}>
                    {name} #{hexValue}
                  </span>
                </li>
              );
            }))
            :(
              <p>No colors found</p>
            ) 
          }
        </ul>
      </div>
    </div>
  );
}

export default ColorManager;
