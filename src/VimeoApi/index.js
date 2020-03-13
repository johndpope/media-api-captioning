import React from 'react';


	// test all 100 videos
	const fetchAllVideos = async (setAllVideos, channel) => {
		
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
			
			if(totalPages > 1) {
				console.log('Has more than one page');
				
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
//						if(step == totalPages){
//							 setAllVideos(allVideos);
//						}
					})
				}
				console.log(allVideos.length);
			}
		})
	};


function VimeoApi({channel}){
	const [allVideos, setAllVideos] = React.useState();
	const [videoList, setVideoList] = React.useState();
	
	
	if(channel){
		console.log(`channel is ${channel}`);
	}
	
	// Fetch all videos
	React.useEffect(() => {
		if(!allVideos && channel){
      (async () => {
        const incomingData = await fetchAllVideos(setAllVideos, channel);
      })(allVideos, channel);
		}
  });
	
	
	// If videos exist, loop through and list them out
	React.useEffect(() => {
		if(allVideos){
    	console.log(allVideos);
			let videoDetailsList ='';
			 allVideos.map((video, index) => {
				 videoDetailsList +=`
						<p>Index is: ${index} </p>
						<p>Video name is: ${video.name}</p>
						<p>Video id is: ${video.link}</p>
						<p>Video caption is: ${video.metadata.connections.texttracks.total}</p>
				`;
			 });
			 setVideoList(videoDetailsList);
		}
  },[allVideos]);
	
	// If the video list exists, render it out
	if(videoList){
		 return(
			 <div dangerouslySetInnerHTML={{ __html: videoList }}>
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
	

export default VimeoApi;