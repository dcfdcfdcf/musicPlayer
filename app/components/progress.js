import React from 'react'
import './progress.less'

let Progress = React.createClass({
	getInitialState:function(){
		return {}
	},
	getDefaultProps:function(){
		return{}
	},
	propTypes:{
		
	},
	changeBar:function(ev){
		var progressBar = this.refs.progressBar;
		var xMax = progressBar.clientWidth;
		var x = ev.clientX - progressBar.getBoundingClientRect().left;
		var scale = x/xMax;
		console.log(scale);
		this.props.onProChange && this.props.onProChange(scale)//子向父传参scale也是通过Props

	},
	render:function(){
		var width = {
			width:this.props.progress+"%"
		}
		return (
			<div className="components-progress" ref="progressBar" onClick={this.changeBar}>

				<div className="progress" style={width}></div>
			</div>
		);
	},
});
export default Progress;