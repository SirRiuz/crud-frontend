

import React from "react";
import { createUser, updateUser } from "../services/user";
import { Form, Input, Button, Alert, Spin } from 'antd';
import '../styles/form-create.css'


class FormCreateUser extends React.Component{

	constructor(props){
		super(props)
		this.state = {}
	}


	onSubmit = (e) => {
		e.preventDefault()
		this.setState({ load:true })
		createUser({
			userName:document.getElementById('userName').value,
			firstName:document.getElementById('firstName').value,
			lastName:document.getElementById('lastName').value,
			password:document.getElementById('password').value,
			avatar:document.getElementById('avatar').files[0]
		},(e) => {
			if(e !== null){
				this.setState({ created:true,load:false })
			} else{
				this.setState({ error:true,load:false })
			}
		})
	}


	update = () => {
		this.setState({ load:true })
		updateUser({
			id:this.props.data.inputs.id,
			userName:document.getElementById('userName').value,
			firstName:document.getElementById('firstName').value,
			lastName:document.getElementById('lastName').value,
			password:document.getElementById('password').value
		},(e) => {
			if(e != null){
				this.setState({ updated:true,load:false })
			} else{
				this.setState({ error:true,load:false })
			}
		})
	}


	render(){
		var updateAlert = null
		var title =  (this.props.mode === 'create' || this.props.mode === undefined) ? <h1>Crear usuario</h1>:<h1>Actualizar datos</h1>
		var avater = (this.props.mode === 'create' || this.props.mode === undefined) ? (
			<Form.Item>
				<Input id={'avatar'} type={'file'} accept={'image/*'}/>
			</Form.Item>
		):null
		var fields = {
			firstName:'',
			lastName:'',
			password:'',
			userName:''
		}
		var buttonTitle = ((this.props.mode === 'create' || this.props.mode === undefined) ? 'Crear usuario':'Actualizar datos')

		if(this.state.updated){
			updateAlert = (
				<Alert
					description="Los datos se han actualizado"
					type="success"
					showIcon
				/>
			)
		}

		if(this.props.mode === 'update'){
			fields = {
				firstName:this.props.data.inputs.firstName,
				lastName:this.props.data.inputs.lastName,
				password:this.props.data.inputs.password,
				userName:this.props.data.inputs.userName
			}
		}


		if(this.state.created){
			return (
				<Alert
					description="El usuario a sido creado satisfactoriamente "
					type="success"
					showIcon
				/>
			)
		}

		if(this.state.error){
			return (<h1>Error al crear el usuario</h1>)
		}

		
		if(this.state.load){
			return (<Spin size="large" />)
		}

		return(
			<div className={'form-user'}>
				{ title }
				<Form
					layout={'vertical'}
					onSubmitCapture={
						(this.props.mode === 'create' || this.props.mode === undefined) ? this.onSubmit:this.update
					}
					validateMessages
					validateTrigger	
				>
					<Form.Item
						required
						rules={[{ required: true, message: 'Please input your Username!' }]}
					>
						<Input
							id={'userName'}
							placeholder={'User name'}
							defaultValue={fields.userName}
							required
						/>
					</Form.Item>

					<Form.Item
						required
						rules={[{ required: true, message: 'Please input your Username!' }]}
					>
						<Input
							id={'firstName'}
							placeholder={'First name'}
							defaultValue={fields.firstName}
							required
						/>
					</Form.Item>

					<Form.Item
						required
						rules={[{ required: true, message: 'Please input your Username!' }]}
					>
						<Input
							id={'lastName'}
							placeholder={'Last name'}
							defaultValue={fields.lastName}
							required
						/>
					</Form.Item>

					<Form.Item
						required
						rules={[{ required: true, message: 'Please input your Username!' }]}
					>
						<Input
							id={'password'}
							placeholder={'Password'} 
							defaultValue={fields.password}
							required
						/>
					</Form.Item>


					{ avater }

					<Form.Item>
						<Button type="primary" htmlType="submit">
							{ buttonTitle }
						</Button>
					</Form.Item>
				</Form>
				{ updateAlert }
			</div>
		)
	}

}


export default FormCreateUser