

import { UserAddOutlined } from "@ant-design/icons";
import React from "react";
import '../styles/fabButton.css'



class FabButton extends React.Component {

	constructor(props){
		super(props)
		this.state = { }
	}


	render(){
		return(
			<div className={'fab-container'} onClick={this.props.onClick}>
				<UserAddOutlined style={{ fontSize:'19px' }}/>
			</div>
		)
	}

}


export default FabButton