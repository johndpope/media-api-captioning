import React from 'react';
import Form from "../Form";
import YoutubeApi from "../YoutubeApi";

function Youtube(){
	
  const [inputValue, setInputValue] = React.useState("UCzDBIpzRuHhZspX2udJ2npg");
	const [channel, setChannel] = React.useState("");
	
	// Handle submit
  function handleSubmit(event) {
    event.preventDefault();
		setChannel(inputValue);
  }
	
	//Youtube
	return(
		<div>
		  <h1>Youtube</h1>
		
      <Form
        onSubmit={handleSubmit}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
		
		  <YoutubeApi 
				channel={channel}
			/>
		
		</div>
	)
}

export default Youtube;