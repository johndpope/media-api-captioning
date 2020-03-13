import React from 'react';
import Form from "../Form";
import VimeoApi from "../VimeoApi";

function Vimeo(){
	
  const [inputValue, setInputValue] = React.useState("8632531");
	const [channel, setChannel] = React.useState("");
	
	
	// Handle submit
  function handleSubmit(event) {
    event.preventDefault();
		setChannel(inputValue);
  }
	
	
	//Vimeo
	return(
		<div>
		  <h1>Vimeo</h1>
		
      <Form
        onSubmit={handleSubmit}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
		
		  <VimeoApi 
				channel={channel}
			/>
					
		</div>
	)
}

export default Vimeo;