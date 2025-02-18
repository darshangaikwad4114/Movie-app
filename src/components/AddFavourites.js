import React from 'react';

const AddFavourites = () => {
	return (
		<>
			<span className='mr-2'>Add to Favourites</span>
			<svg
				width='1em'
				height='1em'
				viewBox='0 0 16 16'
				className='bi bi-heart-fill'
				fill='currentColor'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					d='M8 1C6.346 1 5 2.346 5 4c0 1.654 1.346 3 3 3s3-1.346 3-3c0-1.654-1.346-3-3-3zM4.5 4c0-1.93 1.57-3.5 3.5-3.5S11.5 2.07 11.5 4c0 1.93-1.57 3.5-3.5 3.5S4.5 5.93 4.5 4z'
				/>
			</svg>
		</>
	);
};

export default AddFavourites;
