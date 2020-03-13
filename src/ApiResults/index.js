import React from 'react';

function ApiResults({index, name, id, publishDate, duration, textAlternative, plays, url}) {
	console.log('apiresults');
	
	return (
		 <tr>
				<td>{index}</td>
				<td>{name}</td>
				<td>{id}</td>
				<td>{publishDate}</td>
				<td>{duration}</td>
				<td>{textAlternative}</td>
				<td>{plays}</td>
				<td>{url}</td>
			</tr>
	);

}

export default ApiResults;