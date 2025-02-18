import React from 'react';

const SearchBox = (props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={props.searchValue}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Type to search...'
			></input>
		</div>
	);
};

export default SearchBox;
