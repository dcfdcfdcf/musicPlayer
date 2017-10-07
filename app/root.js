import React from 'react'
import Header from "./components/header"
import PlayerPage from "./components/playerPage"
import music_list from './config/music_list'
import MusicList from "./components/list"
import {  Router, IndexRoute, Link, Route, browserHistory, hashHistory} from 'react-router'



let Root = React.createClass({
	getInitialState:function(){
		return {
			song:music_list[0]
		};
	},
	componentWillMount:function(){
		console.log('R componentWillMount:')
	},	
	componentDidMount:function(){
		console.log('R componentDidMount:')

	},
	componentWillUnMount:function(){


		console.log('R WillUnMount:')
	},
	componentWillReceiveProps:function(){
		console.log('R WillReceiveProps')

	},		
	componentWillUpdate:function(){
		console.log('R willupdate')

	},	
	componentDidUpdate:function(){

		console.log('R componentDidUpdate')
	},	

	changeSong:function(num){//形参，player组件传过来的

		this.setState({
			song:music_list[num]
		});
		
		
			
	},
	render:function(){
		return (
			<div>
				<Header></Header>

            	{React.cloneElement(this.props.children,this.state)}
				

			</div>
		);
		
	},	
});

let App = React.createClass({
	render:function(){
		return (
			<Router history={hashHistory}>
			  <Route path="/" component={Root}>
				    <IndexRoute component={PlayerPage}/>
				    <Route path="/list" component={MusicList}/>
			  </Route>
			</Router>


		)
	},
});

export default App;