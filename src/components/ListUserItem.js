

import React from "react";
import SETTINGS from "../settings";
import '../styles/home-list.css'
import Avatar from "./avatar";
import Modal from '../components/modal'
import { DeleteOutlined } from "@ant-design/icons";
import { Modal as AlertDialog } from 'antd';
import FormCreateUser from "./formCreateUser";



class ListUserItem extends React.Component {

	constructor(props){
		super(props)
		this.state = {}
	}


	onClose = () => {
		this.setState({ show:false })
		if(this.props.onUpdateData !== undefined){
			this.props.onUpdateData()
		}
	}

	onDelete = () => {
		AlertDialog.confirm({
			icon:null,
			okText:'Eliminar',
			cancelText:'Cancelar',
			title:<strong>¿Eliminar este usuario?</strong>,
			content:'Si eliminas este usuario no lo podras recuperar',
			onOk:() => {
				if(this.props.onDeleteItem !== undefined){
					this.props.onDeleteItem(this.props.data)
				}
			}
		})		
	}

	onCloseModal = () => {
		this.setState({ showModal:false },() => {
			if(this.props.onUpdateData !== undefined){
				this.props.onUpdateData()
			}
		})
	}


	render(){

		var avatar = <Avatar text={this.props.data.userName}/>
		if(this.props.data.profileImage !== 'null'){
			avatar = (
				<Avatar
					origin={`${SETTINGS.API_URL}media/${this.props.data.profileImage}`}
				/>
			)
		}



		return(
			<div className={'user-list-item'}>

				<div
					className={'user-list-data'}
					onClick={() => { this.setState({ showModal:true }) }}
				>
					{ avatar }
					<div className={'user-data'}>
						<div><strong>{this.props.data.userName}</strong></div>
						<div>
							<span>{this.props.data.firstName} {this.props.data.lastName}</span>
						</div>
					</div>
				</div>

				<div
					className={'delete-button'}
					onClick={this.onDelete}
				>
					<DeleteOutlined
						style={{fontSize:'18px',color:'#1E2329' }}
					/>
				</div>

				<Modal
					show={this.state.showModal}
					onClose={this.onCloseModal}
				>
					<FormCreateUser
						mode={'update'}
						data={{
							inputs:{
								id:this.props.data._id,
								userName:this.props.data.userName,
								firstName:this.props.data.firstName,
								lastName:this.props.data.lastName,
								password:this.props.data.password
							}
						}}
					/>
				</Modal>


			</div>
		)
	}
}


export default ListUserItem