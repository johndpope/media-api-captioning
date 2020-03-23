import React from 'react';
import ApiResults from "../ApiResults";
import Moment from 'react-moment';
import momentjs from "moment";
import FirebaseApi from "../FirebaseApi";

	// test all 100 videos
	const fetchAllVideos = async (setAllVideos, setVideoCount, setChannelName, setChannelUrl, channel) => {
		
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
			let channelUrl = body.data[0].user.link;
			
			if(totalPages > 1) {
				// loop through
				for (let step = 2; step <= totalPages; step++) {
					client.request({
						method: 'GET',
						path: `/users/${channel}/videos?per_page=100&page=${step}`
					}, function (error, body, status_code, headers) {
						 allVideos = [...allVideos, ...body.data] 
						if(allVideos.length === videoCount){
							 setAllVideos(allVideos);
						}
					})
				}

				setVideoCount(videoCount);
				setChannelName(channelName);
				setChannelUrl(channelUrl);
			}
		})
	};

	// Format video id
	function formatId(videoId){
		let newVideoId = videoId.replace("/videos/", "");
		return newVideoId;
	}

	// Format text alternatives
	function formatTextAlternative(textAlternative){
		if(textAlternative === 1){
			return 'yes';
		} else if (textAlternative === 0){
			return 'no';
		} else {
			return 'broken';
		}
	}

  // Format date 
	function formatDate(date){
		let newDate = momentjs(date).format('YYYY-MM-DD HH:mm');
		return newDate;
	}

function VimeoApi({channel}){
	const [videoCount, setVideoCount] = React.useState();
	const [captionedVideoCount, setCaptionedVideoCount] = React.useState();
	const [videoDuration, setVideoDuration] = React.useState();
	const [captionedVideoDuration, setCaptionedVideoDuration] = React.useState();
	const [channelName, setChannelName] = React.useState();
	const [channelUrl, setChannelUrl] = React.useState();
	const [allVideos, setAllVideos] = React.useState();
	
	
	// Fetch all videos
	React.useEffect(() => {
		if(!allVideos && channel){
      (async () => {
        const incomingData = await fetchAllVideos(setAllVideos, setVideoCount, setChannelName, setChannelUrl, channel);
      })();
		}
  }, [channel]);
	
	// Fetch all videos
	React.useEffect(() => {
		if(allVideos){
			let captionedVideos = [],
					videoTime = 0,
					captionedVideoTime = 0;
			
      allVideos.map((video, index) => {
//				console.log(video);
				// If video has captions
				videoTime = videoTime + video.duration;
				if(video.metadata.connections.texttracks.total === 1){
				 // Add to captioned video array
				 captionedVideos.push(formatId(video.uri));
			   // calculate captioned video duration
			   captionedVideoTime = captionedVideoTime + video.duration;
				}
			})
			// Set channel metrics
			setCaptionedVideoCount(captionedVideos.length);
			setVideoDuration(videoTime);
			setCaptionedVideoDuration(captionedVideoTime);
		}
  }, [allVideos]);
	
	// If the video list exists, render it out
	if(allVideos){
		 return(
			 <section>
			 
			 
			  <FirebaseApi 
			    platform={'youtube'}
			 		channelNamez={channelName} 
			 		channelIdz={channel}
			 		channelUrl={channelUrl}
			 		videoCount={videoCount}
			 		captionedVideoCount={captionedVideoCount}
			 		videoDuration={videoDuration}
			 		captionedVideoDuration={captionedVideoDuration}
			 		allVideos={allVideos}
			  />
			 
			 
			 
				 <h2>{channelName}</h2>
			   <div>Channel id: {channel}</div>
			   <div>Channel URL: {channelUrl}</div>
			 	 <div>Channel media count: {videoCount}</div>
			   <div>Channel captioned media count: {captionedVideoCount}</div>
			   <div>Channel media duration: {videoDuration}</div>
			   <div>Channel captioned media duration: {captionedVideoDuration}</div>
			 
				 <table>
					 <caption>API Media Results</caption>
					 <thead>
						 <tr>
							 <th>Index</th>
							 <th>Name</th>
							 <th>ID</th>
			 				 <th>Publish Date</th>
			 				 <th>Duration</th>
							 <th>Text Alternative</th>
						   <th>Plays</th>
			 				 <th>URL</th>
					   </tr>
					 </thead>
			     <tbody>
			     {allVideos.map((video, index) => (
               <ApiResults
			 						key={index} 
									index={index + 1}
									name={video.name} 
									id={formatId(video.uri)}
									publishDate={formatDate(video.release_time)}
									duration={video.duration}
									textAlternative={formatTextAlternative(video.metadata.connections.texttracks.total)}
									plays={video.stats.plays}
									url={video.link}
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
	

export default VimeoApi;