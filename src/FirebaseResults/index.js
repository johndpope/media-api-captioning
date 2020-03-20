import React from 'react';

function FirebaseResults({index, name, id}) {
	console.log('firebase results');
	
	return (
		 <li>
				{index}, {name}, {id}
			</li>
	);

}

export default FirebaseResults;