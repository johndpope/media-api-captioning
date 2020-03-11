import React from 'react';

// API details call
async function videoAPICall(api, videoChunk){
	let videoChunkList = videoChunk.toString();
	// Call API for video list using chunk of array
	const fetchUrl = `https://www.googleapis.com/youtube/v3/videos?key=${api}&id=${videoChunkList}&part=contentDetails,statistics&maxResults=50`
	let response = await fetch(fetchUrl),
			json = await response.json(),
			videoDetailList = json.items;
	return videoDetailList;
}


// Get list of all videos related to a channel
const fetchVideos = async(api, setVideos, channelId) => {
	console.log(channelId);
	// API request for intial videos (50)
  const fetchUrl=`https://www.googleapis.com/youtube/v3/search?key=${api}&channelId=${channelId}&part=id,snippet&maxResults=50`,
				response = await fetch(fetchUrl),
				json = await response.json();
	let nextPageToken = json.nextPageToken,
			videoArray = json.items,
			totalPages = Math.ceil(json.pageInfo.totalResults / 50);
	// API requests for additional videos (per 50)
	for (let step = 2; step <= totalPages; step++) {
		if(nextPageToken){ 
			 let newFetchUrl=`https://www.googleapis.com/youtube/v3/search?key=${api}&channelId=${channelId}&part=id,snippet&maxResults=50&pageToken=${nextPageToken}`,
					 newResponse = await fetch(newFetchUrl),
					 newJson = await newResponse.json();
			  // Add videos to array
				videoArray = [...videoArray, ...newJson.items];
				if(newJson.nextPageToken){
					 nextPageToken = newJson.nextPageToken;
				} else {
					nextPageToken = '';
				}
		 }
	}
	// Clean playlists out of video array
	let videoArrayClean = videoArray.filter(function(video) {
  	if(video.id.videoId){
			return video;
		}
	});
	// Add video array to state
	setVideos(videoArrayClean);
};


// use list of videos to request video details
const fetchVideoDetails = async(api, videos, setVideoDetails) => {
	// Break array into chunks (max 50 videos per request)
	function chunkArray(array, chunkSize){
		let finalArray = [];
		for(var i = 0; i < array.length; i += chunkSize){
			let tempArray = array.slice(i, chunkSize + i),
					idArray = [];
			tempArray.map((video, index) => {
				idArray.push(video.id.videoId);
			});
			// For each chunk, submit video details API call
			(async () => {
				let newVideos = await videoAPICall(api, idArray);
				finalArray = [...finalArray, ...newVideos];
				setVideoDetails(finalArray);
			})();
		}
	}
	// Break array into chunks and call API
	chunkArray(videos, 50);
}


function YoutubeApi({channel}){
  const [videos, setVideos] = React.useState();
	const [videoDetails, setVideoDetails] = React.useState();
	const [videoList, setVideoList] = React.useState();
	const api = process.env.REACT_APP_YOUTUBE_API_KEY;
	
	if(channel){
		console.log(`channel is ${channel}`);
	}
	
	// Fetch all videos
	React.useEffect(() => {
    if(!videos && channel){
      (async () => {
        const incomingData = await fetchVideos(api, setVideos, channel);
      })();
    }
  }, [channel]);	
	
	// Fetch video details
	React.useEffect(() => {
    if(videos){
      (async () => {
        const incomingData = await fetchVideoDetails(api, videos, setVideoDetails);
      })();
    }
  }, [videos]);	
	
	// If video details exist, loop through and list them out
	React.useEffect(() => {
		 if(videos && videoDetails && (videos.length === videoDetails.length)){
			 let videoDetailsList ='';
			 videoDetails.map((video, index) => {
				 videoDetailsList +=`
						<p>Index is: ${index} </p>
						<p>Video name is: ${videos[index].snippet.title}</p>
						<p>Video id is: ${video.id}</p>
						<p>Video caption is: ${video.contentDetails.caption}</p>
						<p>Video duration is: ${video.contentDetails.duration}</p>
				`;
			 });
			 setVideoList(videoDetailsList);
		 }
  }, [videos, videoDetails]);	
	
	// Console log out arrays for review
	console.log(videos);
	console.log(videoDetails);
	
	// If the video list exists, render it out
	if(videoList){
		 return(
			 <div dangerouslySetInnerHTML={{ __html: videoList }}>
			 </div>
		 );
	}
	
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
	

export default YoutubeApi;