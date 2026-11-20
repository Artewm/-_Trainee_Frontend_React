import './Search.css';

const Search = (props) => {
    const {
        value,
        onChange,
    } = props
    return(
        <div className="search">
            <input
                className="search__input"
                type="text"
                placeholder="Поиск по имени или телефону..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />  
        </div>      
    )
}

export default Search