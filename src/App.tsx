import { useEffect, useState } from "react";
import "./App.scss"; 
import Color from "./types/Color";
import { getColorsFromLocalStorage, setColorsToLocalStorage } from "./services/utilities";
import AddColor from "./components/AddColor/AddColor";
import FilterColor from './components/FilterColor/FilterColor'
import ColorList from "./components/ColorList/ColorList";

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
      <AddColor handleAddColor={handleAddColor} newColor={newColor} handleOnInputChange={handleOnInputChange}/>
      <FilterColor searchTerm={searchTerm} handleOnSearchTermChange={handleOnSearchTermChange} />
      <ColorList filteredColors={filteredColors} handleDeleteColor={handleDeleteColor} />
    </div>
  );
}

export default ColorManager;
