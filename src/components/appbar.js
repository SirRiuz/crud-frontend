

import React from "react";
import '../styles/appbar.css'
import SearchBar from "./searchBar";



class Appbar extends React.Component{


	constructor(props){
		super(props)
		this.state = {}
	}

	render(){
		return(
			<div className={'app-bar'}>
				<div></div>
				<div>
					<SearchBar
						onChange={(d) => { this.props.onChange(d) }}
					/>
				</div>
				<div>
				</div>
			</div>
		)
	}

}


export default Appbar