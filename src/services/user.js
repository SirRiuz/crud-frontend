

import SETTINGS from "../settings";



/* 
	Este archivo contiene todas las funciones que 
	realizan llamadas al servidor
*/



function getUsers(callback) {
	fetch(SETTINGS.API_URL+'graphql/',{
		method:'POST',
		headers:{ 'Content-Type': 'application/json' },
		body:JSON.stringify({
			query:`query { 
				usersList {
					_id,userName,
					firstName,
					lastName,
					password,
					profileImage
				}
			}
			`
		})
	})
	.then(res => res.json())
	.then(res => { callback(res) })
	.catch(err => { callback(null) })
	.catch(err => { callback(null) })
}

function uploadAvatar(data,callback){

	if(data.avatar === undefined){
		callback(null)
		return null
	}

	var requestData = new FormData()
	requestData.append('uploaded_file',data.avatar)

	fetch(SETTINGS.API_URL+'api/v1/upload/',{
		method:'POST',body:requestData
	})
	.then(res => res.json())
	.then(res => { callback(res) })
	.catch(err => { callback(null) })
	.catch(err => { callback(null) })

}

function createUser(data,callback) {
	uploadAvatar({ avatar:data.avatar },(d) => {
		var avatarOrigin = null
		if(d != null){ avatarOrigin = d['file-name'] }
		
		fetch(SETTINGS.API_URL+'graphql/',{
			headers:{ 'Content-Type': 'application/json' },
			body:JSON.stringify({
				query:`mutation {
					createUser(
						userName:"${data.userName.toLowerCase()}",
						firstName:"${data.firstName.toLowerCase()}",
						lastName:"${data.lastName.toLowerCase()}",
						password:"${data.password.toLowerCase()}",
						profileImage:"${avatarOrigin}"
					)
				}
				`
			}),
			method:'POST'
		})
		.then(res => res.json())
		.then(res => { callback(res) })
		.catch(err => { callback(null) })
		.catch(err => { callback(null) })

	})
	
}


function deleteUser(data,callback){
	fetch(SETTINGS.API_URL+'graphql/',{
		headers:{ 'Content-Type': 'application/json' },
		body:JSON.stringify({
			query:` mutation{ deleteUser(id:"${data.id}") } `
		}),
		method:'POST'
	})
	.then(res => res.json())
	.then(res => { callback(res) })
	.catch(err => { callback(null) })
	.catch(err => { callback(null) })
}


function searchUsers(data,callback){
	fetch(SETTINGS.API_URL+'graphql/',{
		headers:{ 'Content-Type': 'application/json' },
		body:JSON.stringify({
			query:`query{
				search(query:"${data.query}"){
					_id,userName,
					firstName,
					lastName,
					password,
					profileImage
				}
			} `
		}),
		method:'POST'
	})
	.then(res => res.json())
	.then(res => { callback(res) })
	.catch(err => { callback(null) })
	.catch(err => { callback(null) })
}


function updateUser(data,callback){
	console.log(data)
	fetch(SETTINGS.API_URL+'graphql/',{
		headers:{ 'Content-Type': 'application/json' },
		body:JSON.stringify({
			query:`mutation{
				updateData(
				  userId:"${data.id}"
				  userName:"${data.userName}"
				  firstName:"${data.firstName}"
				  lastName:"${data.lastName}"
				  password:"${data.password}"
				  profileImage:"null"
				)
			  }`
		}),
		method:'POST'
	})
	.then(res => res.json())
	.then(res => { callback(res) })
	.catch(err => { callback(null) })
	.catch(err => { callback(null) })
}




export { 
	createUser,
	getUsers,
	uploadAvatar,
	deleteUser,
	searchUsers,
	updateUser
}

