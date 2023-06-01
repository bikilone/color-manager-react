import './AddColor.scss';
export default function AddColor({newColor, handleAddColor, handleOnInputChange}) {
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
    )
}