import React from 'react'
import music_list from './../config/music_list'
import './list.less'
import PubSub from 'pubsub-js'

import Item from './item'
// let musicList = music_list;
const MusicList = React.createClass({
	componentWillMount:function(){
		// PubSub.subscribe("DeleteClick",function(msg,item){
		// 	var index = music_list.indexOf(item);
		// 	music_list.splice(index,1);
		// });
		console.log("LIst guazai")
	},
	componentDidunmount:function(){
		console.log("LIst xzai")
	},
	render:function(){
		return (
			<ul className="components_MusicList">
				{
					music_list.map(function(value,index){
						return( 
							<Item
								key={index} 
								data = {value}
								title={value.title} 
								artist={value.artist}
								ref="musicLi"
							>
							</Item>
						)
					})						

				}
			</ul>
		);
	},
});
export default MusicList;