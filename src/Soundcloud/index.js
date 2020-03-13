import React from 'react';
import Form from "../Form";
import SoundcloudApi from "../SoundcloudApi";

function Soundcloud(){
  const [inputValue, setInputValue] = React.useState("18258349");
	const [channel, setChannel] = React.useState("");

	// Handle submit
  function handleSubmit(event) {
    event.preventDefault();
		setChannel(inputValue);
  }
	
	//Soundcloud
	return(
		<div>
		  <h1>Soundcloud</h1>
		
      <Form
        onSubmit={handleSubmit}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
		
		  <SoundcloudApi 
				channel={channel}
			/>
					
		</div>
		
	)
}

export default Soundcloud;