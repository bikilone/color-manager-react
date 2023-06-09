import './FilterColor.scss'

interface componentProps  {
  handleOnSearchTermChange: (e:React.ChangeEvent<HTMLInputElement>) => void, 
  searchTerm: string
}

export default function AddColor({searchTerm, handleOnSearchTermChange }:componentProps) {
    return (
        <div className="filter-container">
        <h2>Filter Colors</h2>
        <input
          type="text"
          placeholder="Search by name or hex value"
          value={searchTerm}
          onChange={handleOnSearchTermChange}
        />
      </div>
    )
}