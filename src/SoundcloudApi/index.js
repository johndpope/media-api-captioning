import React from 'react';

// Get track total
const fetchTrackTotal = async (setTrackTotal, channel) => {
	const fetchUrl=`http://api.soundcloud.com/users/${channel}?client_id=${ process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID}`,
					response = await fetch(fetchUrl),
					json = await response.json();
		console.log(json.track_count);
		setTrackTotal(json.track_count);
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
	
	if(channel){
		console.log(`channel is ${channel}`);
	}
	
	// Get track total
	React.useEffect(() => {
		if(!trackTotal){
      (async () => {
        const incomingData = await fetchTrackTotal(setTrackTotal, channel);
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
	
	// If tracks, loop through and list them out
	React.useEffect(() => {
		 if(allTracks){
			 let trackList ='';
			 allTracks.map((track, index) => {
				 trackList +=`
						<p>Index is: ${index} </p>
						<p>Track name is: ${track.title}</p>
						<p>Track id is: ${track.id}</p>
						<p>Track caption is: unknown</p>
						<p>Track duration is: ${track.duration}</p>
				`;
			 });
			 setTrackList(trackList);
		 }
  }, [allTracks]);	

	// If the track list exists, render it out
	if(trackList){
		console.log(allTracks.length);
		console.log(allTracks);
	 	return(
		 	<div dangerouslySetInnerHTML={{ __html: trackList }}>
		 	</div>
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