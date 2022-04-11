

import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import '../styles/search.css'


class SearchBar extends React.Component {  

	constructor(props){
		super(props)
		this.state = {}
	}

	render(){
		return(
			<div
				className={'search-container'}
				onChange={this.props.onChange}
			>
				<div className={'search'}>
					<div>
						<SearchOutlined style={{ fontSize:'24px',color:'#B7BDC6' }} />
					</div>
					<div style={{ width:'100%' }}>
						<input className={'search-input'} placeholder={'Buscar usuario'}/>
					</div>
				</div>
			</div>
		)
	}

}



export default SearchBar
