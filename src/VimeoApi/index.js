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
	
	if(channel){
		console.log(`channel is ${channel}`);
	}
	
	React.useEffect(() => {
		if(!allVideos && channel){
      (async () => {
        const incomingData = await fetchAllVideos(setAllVideos, channel);
      })(allVideos, channel);
		}
  });
	
	
	React.useEffect(() => {
		if(allVideos){
    	console.log(allVideos);
//				allVideos.map((video, index) => {
//					console.log(
//						`Video ${video.name}, ${video.link}
//						 has ${video.metadata.connections.texttracks.total} text tracks`
//					);
//				});	
		}
  },[allVideos]);
	
  return (
    <div>
      Content loading
    </div>
  );
}
	

export default VimeoApi;