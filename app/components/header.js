import React from 'react'
import './header.less'



let Header = React.createClass({
	render:function(){
		return (
			<div className="components-header row">
				<img src="static/images/logo.png" width="40" className="-col-auto"/>
				<h4 className="caption">React Music Player</h4>
			</div>
		);
		
	},	
});

export default Header;