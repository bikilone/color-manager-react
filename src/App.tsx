import { useEffect, useState } from "react";
import "./App.scss"; 
import Color from "./types/Color";
import { getColorsFromLocalStorage, setColorsToLocalStorage } from "./services/utilities";

function ColorManager() {
  const [colors, setColors] = useState(getColorsFromLocalStorage);
  const [newColor, setNewColor] = useState({name: "", hexValue: ""} as Color);

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
        <h2>Color list</h2>
        <ul>
          {colors.length ? (
            colors.map(({name, hexValue}) => {
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
