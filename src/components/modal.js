

import React from "react";
import '../styles/modal.css'


class Modal extends React.Component{

	constructor(props){
		super(props)
		this.state = {}
	}

	
	onClose = () => {
		this.setState({ close:true },() => {
			if(this.props.onClose !== undefined){
				this.setState({ close:false })
				this.props.onClose()
			}
		})
	}


	render(){
		document.body.style.overflow = 'scroll'
		document.body.style.overflowX = 'hidden'
		
		if(this.state.close){ return null }

		if(this.props.show){
			document.body.style.overflow = 'hidden'
			return(
				<div>
					<div className={'screen'} onClick={this.onClose}></div>
					<div className={'modal'}>{this.props.children}</div>
				</div>
			)
		}
	}
}


export default Modal


