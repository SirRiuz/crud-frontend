
import React from "react";
import { deleteUser, getUsers, searchUsers } from "../services/user";
import Modal from "../components/modal";
import FormCreateUser from "../components/formCreateUser";
import ListUserItem from "../components/ListUserItem";
import { notification, Spin } from "antd";
import Appbar from "../components/appbar";
import FabButton from "../components/fabButton";


class Home extends React.Component{

	constructor(props){
		super(props)
		this.state ={
			data:[]
		}
	}

	componentDidMount(){
		getUsers((e) => {
			this.setState({ data:e.data.usersList })
		})
	}


	onDelete =(data) => {
		deleteUser({ id:data._id },() => {
			getUsers((e) => {
				this.setState({ data:e.data.usersList },() => {
					notification.success({
						message:(<p><strong>{data.userName}</strong> a sido eliminado</p>)
					})
				})
			})
		})
	}


	onCloseModal = () => {
		getUsers((e) => {
			this.setState({ data:e.data.usersList })
			this.setState({ show:false })
		})
	}

	
	onChange = (e) => {
		if(e.target.value !== ''){
			this.setState({ load:true })
			searchUsers({ query:e.target.value },(e) => {
				console.log(e)
				this.setState({ load:false,data:e.data.search })
			})
		} else{ 
			getUsers((e) => {
				this.setState({ data:e.data.usersList })
			})
		}
	}


	render(){
		var userList = (<p>No hay datos para mostrar</p>)

		if(this.state.data.length >0){
			userList = this.state.data.map((x,k) => (
				<ListUserItem
					key={k}
					data={x}
					onUpdateData={() => { this.onCloseModal() }}
					onDeleteItem={(data) => { this.onDelete(data) }}
				/>
			))
		}


		var bodyListUser = (
			<div className={'list-root-container'}>
				<Spin size="large" />
			</div>
		)

		if(!this.state.load){
			bodyListUser = (
				<div className={'list-root-container'}>
					<div className={'list-user-container'}>
						{ userList }
					</div>
					<Modal
						show={this.state.show}
						onClose={this.onCloseModal}
					>
						<FormCreateUser/>
					</Modal>
				</div>
			)
		}


		return(
			<div className={'user-list'}>
				<Appbar onChange={this.onChange} />
				<FabButton onClick={() => {
					this.setState({ show:true })
				}}/>
				{ bodyListUser }
			</div>
		)
	}
}


export default Home