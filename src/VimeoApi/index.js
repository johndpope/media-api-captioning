import React from 'react';


	// test all 100 videos
	const fetchAllVideos = async (setAllVideos, setVideoCount, setChannelName, channel) => {
		
		let client_id = process.env.REACT_APP_VIMEO_CLIENT_ID;
		let client_secret = process.env.REACT_APP_VIMEO_CLIENT_SECRET;
		let access_token = process.env.REACT_APP_VIMEO_ACCESS_TOKEN;
		let Vimeo = require('vimeo').Vimeo;
	let client = new Vimeo(`${client_id}`, `${client_secret}`, `${access_token}`);
		client.request({
			method: 'GET',
//				path: '/users/harvardartmuseums/videos' // all videos 
			path: `/users/${channel}/videos?per_page=100` 
		}, function (error, body, status_code, headers) {
			let totalPages = Math.ceil(body.total / 100);
			console.log(body);
			let allVideos = body.data;
			let videoCount = body.total;
			let channelName = body.data[0].user.name;
			
			if(totalPages > 1) {
				// loop through
				for (let step = 2; step <= totalPages; step++) {
					console.log(step);
					client.request({
						method: 'GET',
						path: `/users/${channel}/videos?per_page=100&page=${step}`
					}, function (error, body, status_code, headers) {
						 allVideos = [...allVideos, ...body.data] 
						 console.log(allVideos.length);
						 setAllVideos(allVideos);
					})
				}
				setVideoCount(videoCount);
				setChannelName(channelName);
			}
		})
	};


function VimeoApi({channel}){
	const [videoCount, setVideoCount] = React.useState();
	const [channelName, setChannelName] = React.useState();
	const [allVideos, setAllVideos] = React.useState();
	const [videoList, setVideoList] = React.useState();
	
	
	if(channel){
		console.log(`channel is ${channel}`);
	}
	
	// Fetch all videos
	React.useEffect(() => {
		if(!allVideos && channel){
      (async () => {
        const incomingData = await fetchAllVideos(setAllVideos, setVideoCount, setChannelName, channel);
      })(allVideos, channel);
		}
  });
	
	
	// If videos exist, loop through and list them out
	React.useEffect(() => {
		if(allVideos){
			console.log(videoCount);
    	console.log(allVideos);
			let videoDetailsList ='';
			 allVideos.map((video, index) => {
				 videoDetailsList +=`
						<tr>
							<td>${index + 1}</td>
							<td>${video.name}</td>
              <td>${video.link}</td>
              <td>${video.release_time}</td>
              <td>${video.duration}</td>
							<td>${video.metadata.connections.texttracks.total}</td>
              <td>${video.stats.plays}</td>
							<td>${video.link}</td>
						</tr>
				`;
			 });
			 setVideoList(videoDetailsList);
		}
  },[allVideos]);
	
	// If the video list exists, render it out
	if(videoList){
		 return(
			 <section>
				 <h2>{channelName}</h2>
			   <div>Channel id: {channel}</div>
			 	 <div>Channel media count: {videoCount} </div>
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
					 <tbody dangerouslySetInnerHTML={{ __html: videoList }}>
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
	

export default VimeoApi;