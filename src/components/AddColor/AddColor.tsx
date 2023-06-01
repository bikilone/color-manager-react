import './AddColor.scss';
export default function AddColor({newColor, handleAddColor, handleOnInputChange, errorMessage}) {
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
            placeholder="Hex Value"
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