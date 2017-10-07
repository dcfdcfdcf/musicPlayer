import React from 'react'
import music_list from './../config/music_list'
import  './item.less'
import PubSub from 'pubsub-js'
import {Link} from 'react-router'

var Item = React.createClass({
	playMusicItem:function(item){
		//var target = ev.srcElement || ev.target;

		PubSub.publish("ItemClick",item);

		console.log(1)

	},	
	deleteMusicItem:function(item,ev){
		// ev.preventDefault();
		// PubSub.publish("DeleteClick",item);
	

	},
	render:function(){
		let item=this.props.data;
		return (
			<li className="row item bold" ref="itemLi" onClick={this.playMusicItem.bind(this,item)}>
				<p>	<Link to="/" >{this.props.title}----{this.props.artist}</Link></p>
				<p className="-col-auto delete" onClick={this.deleteMusicItem.bind(this,item)}></p>
			</li>			
		);
	},
});
export default Item