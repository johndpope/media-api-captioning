import React from "react";

export default function Form(props) {
  return (
      <form onSubmit={props.onSubmit}>
				<input
					type="text"
					value={props.value}
					onChange={props.onChange}
				/>
        <button type="submit">
          Search Channel
        </button>
      </form>
  );
}