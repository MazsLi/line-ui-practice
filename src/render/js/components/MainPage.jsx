import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SideBar from './SideBar';
import ChatList from './ChatList';
import Chatroom from './Chatroom';
import GSPreloader from './GSPreloader';
import CloseIcon from '@material-ui/icons/Close';
import MaximizeIcon from '@material-ui/icons/WebAsset';
import MinimizeIcon from '@material-ui/icons/Remove';
import grey from '@material-ui/core/colors/grey';
const debug = require('debug')('component:MainPage');

const styles = {
	root: {
		width: 'inherit',
		height: 'inherit',
	},
    sidebar: {
		maxWidth: '8%'
	},
	content: {
		
	},
	topbar: {
		height: '4vh',
		borderBottom: '1px solid #DDDDDD',
		boxSizing: 'border-box',
	},
	topbarItems: {
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		right: 0,
		height: 'inherit',

	},
	topbarItem: {
		color: grey[400],
		fontSize: '1rem',
		marginRight: '.2rem',
		'&:hover': {
            color: grey[500],
        },
	},
	pageContainer: {
		display: 'flex',
		verticalAlign: 'top',
		height: '95vh',
	},
	pageLeft: {
		width: '44%',
		height: '100%',
		borderRight: '1px solid #DDDDDD'
	},
	pageRight: {
		width: '56%',
		height: '100%',
	}
}

class MainPage extends React.Component{

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount = () => {
		debug('componentWillMount...');
	}

	componentWillUnmount = () => {
		
	}

	componentDidMount = () => {
		debug('componentDidMount...');
	}

	onChange = () => {

	}

	switchPage = (which) => {

		let gsPreloader = new GSPreloader();

		setTimeout( () => {
			gsPreloader.toggle();
			// gsPreloader.pause();
		}, 15000)
		console.log(which)

	}

	render() {
		
		debug('render...');

		const { classes } = this.props;

		return (
			
			<Grid container className={classes.root}>
				<Grid item xs className={classes.sidebar}>
					<SideBar switchPage={this.switchPage}/>
				</Grid>
				<Grid item xs className={classes.content}>
					<div id='topbar' className={classes.topbar} >
						<div className={classes.topbarItems}>
							<MinimizeIcon className={classes.topbarItem}/>
							<MaximizeIcon className={classes.topbarItem}/>
							<CloseIcon className={classes.topbarItem}/>
						</div>
					</div>
					<div className={classes.pageContainer} >
						<div className={classes.pageLeft}>
							<ChatList/>
						</div>
						<div className={classes.pageRight}>
							<Chatroom current={this.state.current}/>
						</div>
					</div>
				</Grid>
			</Grid>
		 	
		)
	}
}

export default withStyles(styles)(MainPage);
