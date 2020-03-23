import React from 'react';
import * as firebase from 'firebase';
import FirebaseResults from "../FirebaseResults";

const config = {
  apiKey: "AIzaSyDsBbX7hSeRk86Z3O4jHSWzGTrt_tuR7NI",
  authDomain: "multimedia-captions.firebaseapp.com",
  databaseURL: "https://multimedia-captions.firebaseio.com",
  projectId: "multimedia-captions",
  storageBucket: "multimedia-captions.appspot.com",
  messagingSenderId: "26386713297",
  appId: "1:26386713297:web:1ae0531ead63450cdc93f0"
};
firebase.initializeApp(config);


function FirebaseApi({platform, channelNamez, channelIdz, channelUrl, videoCount, captionedVideoCount, videoDuration, captionedVideoDuration, allVideos }){
	
	console.log(platform);
	console.log(channelNamez);
	console.log(channelIdz);
	console.log(channelUrl);
	console.log(videoCount);
	console.log(captionedVideoCount);
	console.log(videoDuration);
	console.log(captionedVideoDuration);
	console.log(allVideos);


	// Variables
	let database = firebase.database().ref('vimeo/channels');

	let channelArray = [];
	
	function createChannelIdArray(){
		database.on('value', function(results) {
			channelArray = [];
			let allChannels = results.val();
			for(var channel in allChannels) {
				let channelId = allChannels[channel].channelId;
				channelArray.push(channelId);
				 console.log('checking channel ids');
			}
		})
	};
	
	
	React.useEffect(() => {
		if(database){
			if(!channelArray.includes(channelIdz)){
				createChannelIdArray();
				firebase.database().ref(`vimeo/channels`).push({
					channelName: channelNamez,
					channelId: channelIdz,
					channelUrl: channelUrl,
					videoCount: videoCount,
					captionedVideoCount: captionedVideoCount,
					videoDuration: videoDuration,
					captionedVideoDuration: captionedVideoDuration,
					channelVideos: allVideos
				});
			}
		}
	});

//	// WRITE TO DATABASE
//	function writeChannelData(platform, channelNamez, channelIdz, channelUrl, videoCount, captionedVideoCount, videoDuration, captionedVideoDuration, allVideos, channelArray) {
//		if(!channelArray.includes(channelIdz)){
//			firebase.database().ref(`vimeo/channels`).push({
//				channelName: channelNamez,
//				channelId: channelIdz,
//				channelUrl: channelUrl,
//				videoCount: videoCount,
//				captionedVideoCount: captionedVideoCount,
//				videoDuration: videoDuration,
//				captionedVideoDuration: captionedVideoDuration,
//				channelVideos: allVideos
//			});
//		}
//	};
	
	
	
//	createChannelIdArray();
	
//	writeChannelData(platform, channelNamez, channelIdz, channelUrl, videoCount, captionedVideoCount, videoDuration, captionedVideoDuration, allVideos, channelArray);

	
	// Otherwise, render out default screen
  return (
    <div>
      Content loading
    </div>
  );
}

export default FirebaseApi;