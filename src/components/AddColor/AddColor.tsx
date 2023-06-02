import React from 'react';
import './AddColor.scss';
import Color from '../../types/Color';
interface componentProps  {
  newColor: Color, 
  handleAddColor: () => void, 
  handleOnInputChange: (e:React.ChangeEvent<HTMLInputElement>) => void, 
  errorMessage: string
}
export default function AddColor({newColor, handleAddColor, handleOnInputChange, errorMessage}: componentProps) {
    return (
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
        </div>
        <div className="input-container">
          <input
            type="text"
            name="hexValue"
            placeholder="Hex Value (starting with #)"
            value={newColor.hexValue}
            onChange={handleOnInputChange}
            className={errorMessage && 'has-error-message'}
          />
          {
            errorMessage && <span className='error-message'>{errorMessage}</span>
          }
        </div>
        <button className="add-button" onClick={handleAddColor}>
          Add
        </button>
      </div>
    )
}