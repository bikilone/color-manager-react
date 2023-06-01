import { useEffect, useState } from "react";
import Color from "./types/Color";
import { getColorsFromLocalStorage, isValidHexColor, setColorsToLocalStorage } from "./services/utilities";
import AddColor from "./components/AddColor/AddColor";
import FilterColor from './components/FilterColor/FilterColor'
import ColorList from "./components/ColorList/ColorList";
import "./App.scss"; 

function ColorManager() {
  const [colors, setColors] = useState(getColorsFromLocalStorage);
  const [newColor, setNewColor] = useState({name: "", hexValue: ""} as Color);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    setColorsToLocalStorage(colors);
  }, [colors]);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColor({...newColor, [e.target.name]: e.target.value});
  };

  const handleAddColor = () => {
    const isValidHex = isValidHexColor(newColor.hexValue);
    if (!isValidHex){
      setErrorMessage('Not a valid hex color')
      return
  }

    if (newColor.name && newColor.hexValue ) {
      setColors([...colors, newColor]);
      setNewColor({name: "", hexValue: ""});
      setErrorMessage('')
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
      <AddColor handleAddColor={handleAddColor} newColor={newColor} handleOnInputChange={handleOnInputChange} errorMessage={errorMessage}/>
      <FilterColor searchTerm={searchTerm} handleOnSearchTermChange={handleOnSearchTermChange} />
      <ColorList filteredColors={filteredColors} handleDeleteColor={handleDeleteColor} />
    </div>
  );
}

export default ColorManager;
