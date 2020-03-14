import React from 'react';
import ApiResults from "../ApiResults";

// Get track total
const fetchTrackTotal = async (setTrackTotal, setChannelName, channel, ) => {
	const fetchUrl=`http://api.soundcloud.com/users/${channel}?client_id=${ process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID}`,
					response = await fetch(fetchUrl),
					json = await response.json();
		console.log(json.track_count);
		console.log(json);
		setTrackTotal(json.track_count);
	  setChannelName(json.username);
};

// Fetch all of the tracks
const fetchAllTracks = async (setAllTracks, trackTotal, channel) => {
	var page_size = 200; 
	let offset = 0;
	let totalPages = Math.ceil(trackTotal / page_size); //3828 // 20
	let trackArray = [];
	for (let step = 0; step <= totalPages; step++) {
		offset = step * 200;
		const fetchUrl=`http://api.soundcloud.com/users/${channel}/tracks.json?client_id=${ process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID}&offset=${offset}&limit=${page_size}`,
				response = await fetch(fetchUrl),
				json = await response.json();
				trackArray = [...trackArray, ...json];
	}
	// Add video array to state
	setAllTracks(trackArray);
};


function SoundcloudApi({channel}){
	const [trackTotal, setTrackTotal] = React.useState();
	const [allTracks, setAllTracks] = React.useState();
	const [trackList, setTrackList] = React.useState();
	const [channelName, setChannelName] = React.useState();

	
	// Get track total
	React.useEffect(() => {
		if(!trackTotal){
      (async () => {
        const incomingData = await fetchTrackTotal(setTrackTotal, setChannelName, channel);
      })(trackTotal);
		}
  });
	
	// If track todal, get track data
	React.useEffect(() => {
		if(trackTotal && channel){ 
      (async () => {
        const incomingData = await fetchAllTracks(setAllTracks, trackTotal, channel); 
      })();
		}
  },[trackTotal, channel]);


	// If the track list exists, render it out
	if(allTracks){
		console.log(allTracks.length);
		console.log(allTracks);
	 	return(
			 <section>
				 <h2>{channelName}</h2>
			   <div>Channel id: {channel}</div>
			 	 <div>Channel media count: {trackTotal}</div>
			   <div>Channel media duration: {'x'}</div>
			   <div>Channel captioned elements: x</div>
			   <div>Channel captioned duration: xxxx</div>
				 <table>
					 <caption>API Media Results</caption>
					 <thead>
						 <tr>
							 <th>Index</th>
							 <th>Title</th>
							 <th>ID</th>
			 				 <th>Publish Date</th>
			 				 <th>Duration</th>
							 <th>Text Alternative</th>
						   <th>Plays</th>
			 				 <th>URL</th>
					   </tr>
					 </thead>
			     <tbody>
			     {allTracks.map((track, index) => (
               <ApiResults
			 						key={index} 
									index={index + 1}
									name={track.title} 
									id={track.id}
									publishDate={track.created_at} 
									duration={track.duration}
									textAlternative={'x'}
									plays={track.playback_count}
									url={track.permalink_url}
								/>
            ))}
				   </tbody>
				 </table>
			 </section>
	 	);
	}
	
	// Check to see if a channel exists
	if(!channel){
		 return(
			<div>
				Add channel
			</div>
		 );
	}
	
	// Otherwise, render out default screen
  return (
    <div>
      Content loading
    </div>
  );
}
	

export default SoundcloudApi;