import React from 'react'
import { SearchBarStyled, SearchBarBoxStyled, SearchBarIconStyled } from '../styled/style'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const SearchBar = ({ onChange, value }) => {
    return (
        <SearchBarBoxStyled>
            <SearchBarIconStyled icon={faSearch} />
            <SearchBarStyled value={value} onChange={onChange} placeholder="Search list by Title">
            </SearchBarStyled>
        </SearchBarBoxStyled>
    )
}

export default SearchBar
