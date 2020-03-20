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


function FirebaseApi(){
	 
// State
const [channelNameValue, setChannelNameValue] = React.useState(""),
			[channelName, setChannelName] = React.useState(""),
			[channelIdValue, setChannelIdValue] = React.useState(""),
			[channelId, setChannelId] = React.useState(""),
			[allChannels, setAllChannels] = React.useState("");
	    
	
// Variables
let database = firebase.database().ref('youtube/channels');

	// Submit Function
	function handleSubmit(event) {
		event.preventDefault();
		setChannelName(channelNameValue);
		setChannelId(channelIdValue);
	}

	// List all database channels
	React.useEffect(() => {
		if(database){
			database.on('value', function(results) {
				let channelArray = [];
				let allChannels = results.val();
				for(var channel in allChannels) {
					channelArray.push(allChannels[channel]);
				}  
				setAllChannels(channelArray);
			});
		}
  }, [channelName]);
	
	console.log(allChannels);


	//Firebase
	if(allChannels){
		return(
			<div>
				<h1>Firebase</h1>
				<section>

				<form onSubmit={handleSubmit}>
					<label>Channel Name:</label>
					<input
						type="text"
						value={channelNameValue}
						onChange={e => setChannelNameValue(e.target.value)}
					/>
					<label>Channel Id:</label>
					<input
						type="text"
						value={channelIdValue}
						onChange={e => setChannelIdValue(e.target.value)}
					/>
					<button type="submit">
						Submit
					</button>
				</form>

				</section>
				<section>
					 <ul>
						 {allChannels.map((channel, index) => (
               <FirebaseResults
			 						key={index} 
									index={index + 1}
									name={channel.channelName} 
									id={channel.channelId}
								/>
						))}
					</ul>
				</section>

			</div>
		)
	}


	// Check to see if a channel exists
	if(database){
		 return(
			<div>
				no data
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

export default FirebaseApi;