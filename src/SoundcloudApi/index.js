import React from 'react';

	var SC = require('soundcloud');
	SC.initialize({
		client_id: process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID, 
	});


const fetchTrackTotal = async (setTrackTotal) => {
	SC.resolve('https://soundcloud.com/harvard').then(function(user){ 
		setTrackTotal(user.track_count);
	});
};

const fetchAllTracks = async (setAllTracks, trackTotal, channel) => {
	var page_size = 200; 
	let totalPages = Math.ceil(trackTotal / page_size);
	let trackArray;
	console.log(totalPages);
	SC.get(`/users/${channel}/tracks`, { 
		limit: page_size,
		linked_partitioning: 1
	}).then(function(tracks){
		trackArray = tracks
		console.log(trackArray);
		var newUrl = tracks.next_href;
		console.log(newUrl)
		let newUrlRelative = newUrl.replace("https://api.soundcloud.com", "");
		console.log(newUrlRelative);
				
//		for (let step = 2; step <= 5; step++) {

//			SC.get(newUrlRelative, { 
//					limit: 200,
//					linked_partitioning: 1
//				}).then(function(newtracks){
//					console.log(newtracks.collection);
//				  console.log(newtracks.next_href);
//			})
		
				SC.get(newUrlRelative).then(function(newtracks){
					console.log(newtracks);
					var newnewtracks = newtracks.next_href;
				})

//		}
	})
};

function SoundcloudApi({channel}){
	const [trackTotal, setTrackTotal] = React.useState();
	const [allTracks, setAllTracks] = React.useState();
	
	if(channel){
		console.log(`channel is ${channel}`);
	}
	
	//

	
	React.useEffect(() => {
		if(!trackTotal){
      (async () => {
        const incomingData = await fetchTrackTotal(setTrackTotal);
      })(trackTotal);
		}
  });
	
	React.useEffect(() => {
		if(trackTotal && channel){ 
      (async () => {
        const incomingData = await fetchAllTracks(setAllTracks, trackTotal, channel); 
      })();
		}
  },[trackTotal, channel]);
	// Otherwise, render out default screen
  return (
    <div>
      Content loading
    </div>
  );
}
	

export default SoundcloudApi;