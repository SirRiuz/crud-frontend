

import React from "react";
import '../styles/avatar.css'



class Avatar extends React.Component {

	constructor(props){
		super(props)
		this.state = {}
	}

	render(){

		var avatarBody = (this.props.origin == null) ?  (
			<strong>{(this.props.text.split('')[0]).toUpperCase()}</strong>
		):null
		
		var styles = (this.props.origin) ? {
			backgroundColor:'red',
			backgroundImage:`url(${this.props.origin})`,
			backgroundPosition:'center',
			backgroundSize:'cover'
		}:{}
		

		return(
			<div
				className={'avatar'}
				style={{ ...styles }}
			>
				{ avatarBody }
			</div>
		)
	}

}


export default Avatar