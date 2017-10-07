import React from 'react'
import Progress from "./progress"
import './player.less'
import music_list from './../config/music_list'
import { Link } from 'react-router';
import PubSub from 'pubsub-js'


let count = 0;//模式切换
let num = 0;//当前歌曲ID
let duration = "";//定义歌曲的总长度
let len = music_list.length;
let repeatTypes = ["random","once","cycle"];
let PlayerPage = React.createClass({
	getInitialState:function(){
		return {
			progress:0,
			curTime:0,
			volume:0,
			isPlay:true,
			curMusicItem:music_list[num],
			repeatType:"random",
			musicList:music_list,
			modelCount:0,

		};
	},
	componentWillMount:function(){
		var _this = this;
		console.log("player  jguazai")
			
	},
	componentDidMount:function(){
	
		var _this = this;
		console.log("player  nguazai")
		$('#player').jPlayer({
			ready:function(){
				_this.playMusic(_this.state.curMusicItem)
			},
			supplied: "mp3",
			wmode: "window",	
			useStateClassSkin: true,
		})			
		PubSub.subscribe("ItemClick",function(msg,item){
			console.log("hhhhhh:"+item);
			_this.playMusic(item);

			_this.setState({
				curMusicItem:item,
			});

		});		

		PubSub.subscribe("DeleteClick",function(msg,item){
			// var index = this.findMusicIndex(item);
			// var mul = this.state.musicList.splice(index,1)
			// this.setState({
			// 	musicList:mul
			// })
		});
		$("#player").bind($.jPlayer.event.ended,function(){

			_this.playWhenEnd();

		});			
		$('#player').bind($.jPlayer.event.timeupdate,function(data){
			duration = data.jPlayer.status.duration;
			console.log("bofangzhong")
			_this.setState({
				progress:Math.round(data.jPlayer.status.currentPercentAbsolute),
				curTime: Math.floor(data.jPlayer.status.currentTime/60)+":"+Math.floor(data.jPlayer.status.currentTime%60),
				volume:data.jPlayer.options.volume*100,//音量0-1
			});
		})
	},	
	componentWillUnmount:function(){
		console.log("player  xiezai")
		$('#player').unbind($.jPlayer.event.timeupdate)
		$('#player').unbind($.jPlayer.event.ended)
		//PubSub.unsubscribe("ItemClick");

	},
	ProChange:function(data){

		$('#player').jPlayer("play",duration*data);//从哪里开始播放

	},
	VolChange:function(data){
		$('#player').jPlayer("volume",data);//调节音量函数,接受progress传过来的音量
	},
	playMusic:function(num){
		console.log(num.file);
		$("#player").jPlayer("setMedia", {
		     mp3: num.file
	    }).jPlayer("play");


		console.log(num.file)	
	},
	findMusicIndex:function(item){
		return music_list.indexOf(item)
	},
	playWhenEnd:function(){
		if (this.state.repeatType === 'random') {
			let index = this.findMusicIndex(this.state.curMusicItem);
			let randomIndex = Math.floor(Math.random()*(this.state.musicList.length - 1));
			while(randomIndex === index) {
				randomIndex = Math.floor(Math.random()*(this.state.musicList.length - 1));
			}
			this.playMusic(this.state.musicList[randomIndex]);
			this.setState({curMusicItem:this.state.musicList[randomIndex]});
		} else if (this.state.repeatType === 'once') {
			this.playMusic(this.state.curMusicItem);
		} else {
			this.next();
		}		
	},	
	prev:function(){
		num = num<=0?0:num-1;
		this.setState({curMusicItem:music_list[num]});
		this.playMusic(music_list[num])

	},
	next:function(){
		console.log("ne");
		num = num>=len-1?len-1:num+1;
		this.setState({curMusicItem:music_list[num]});
		this.playMusic(music_list[num])
	},
	play:function(){
		if(this.state.isPlay){
			$('#player').jPlayer("pause",this.state.curTime);
		}else{
			$('#player').jPlayer("play",this.state.curTime);
		}
		this.setState({
			isPlay : !this.state.isPlay,
		});		
	},
	modelChange:function(){
		count++;
		this.setState({repeatType:repeatTypes[count%3]})
	},
	render:function(){
		return (
		    <div className="components_player">
		       {/*<h1 className="caption"><a href="javascript:;">我的私人音乐坊 &gt;</a></h1> */} 
		        <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
		        <div className="mt20 row">
		        	<div className="controll-wrapper">
		        		<h2 className="music-title">{this.state.curMusicItem.title}</h2>
		        		<h3 className="music-artist mt10">{this.state.curMusicItem.artist}</h3>
		        		<div className="row mt20">
		        			<div className="left-time -col-auto">{this.state.curTime}</div>
		        			<div className="volume-container">
		        				<i title="volmun-controller" className="icon-volume rt" style={{top: 5, left: -5}}></i>
		        				<div className="volume-wrapper">
									<Progress onProChange={this.VolChange} progress={this.state.volume}></Progress>
		        				</div>
		        			</div>
		        		</div>
		        		<div style={{height: 10, lineHeight: '10px'}}>
						<Progress onProChange={this.ProChange} progress={this.state.progress}></Progress>

		        		</div>
		        		<div className="mt35 row">
		        			<div>
		            			<i className="icon prev" onClick={this.prev}></i>
		            			<i className={this.state.isPlay?'icon ml20 play':'icon ml20 pause'} onClick={this.play} ></i>
		            			<i className="icon next ml20" onClick={this.next}></i>
		        			</div>
		        			<div className="-col-auto">
		        				<i className={"icon repeat-"+this.state.repeatType} onClick={this.modelChange}></i>
		        			</div>
		        		</div>
		        	</div>
		        	<div className="-col-auto cover">
		        		<img src={this.state.curMusicItem.cover}/>
		        	</div>
		        </div>
		    </div>
		);
	
	},			
});

export default PlayerPage;