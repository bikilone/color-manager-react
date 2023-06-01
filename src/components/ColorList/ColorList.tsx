import './ColorList.scss'
export default function ColorList({filteredColors, handleDeleteColor}) {
    return (
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
                  <span className="color-hex">{color.hexValue}</span>
                  <span className="color-name">{color.name}</span>
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
    )
}