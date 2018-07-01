import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Data from './data';
import List from '@material-ui/core/List';
import { ListItem, ListItemIcon, Avatar } from '@material-ui/core';
import { grey, lightGreen } from '@material-ui/core/colors';

const styles = ({
    
    root: {
        height: 'inherit'
    },
    titleBar: {
        height: '6%',
        borderBottom: '1px solid #DDDDDD'
    },
    title: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontSize: '.8rem',
        marginLeft: '10px'
    },
    chatWindow: {
        height: '74%',
        overflowY: 'auto'
    },
    toolbar: {
        height: '5%',
        borderTop: '1px solid #DDDDDD',
        borderBottom: '1px solid #DDDDDD'
    },
    input: {
        boxSizing: 'border-box',
        height: '15%',
        outline: 0,
        padding: '10px',
        overflowY: 'auto'
    },
    list: {
        height: '100%',
        padding: 0,
    },

    listItemIconHidden: {
        visibility: 'hidden',
    },
    avatar: {
        width: '100%'
    },

    listItem: {
        padding: '5px 0 5px 10px',
        minHeight: '60px'
    },
    msgText: {
        width: '70%',
        padding: '10px',
        borderRadius: '10px',
        background: grey[300]
    },
    msgTextRight: {
        width: '70%',
        padding: '10px',
        borderRadius: '10px',
        background: lightGreen[400]
    }
})

class Chatroom extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: Data.getChatDataByID('id7')||{},
        }
    }

    componentDidMount() {
       
    }

    createMsgList() {

        const { classes } = this.props;
        const data = this.state.data;
        if(!data) return <List className={classes.list}/>

        const msgAry = data.msgAry.reverse();
        let msgCompAry = [];

        msgAry.map( (msgObj) => {

            let photoSrc = (msgObj.isMe)? require('Assets/men2.png'): data.photoSrc;
            let msgComp = (
                <div className={ (msgObj.isMe)? classes.msgTextRight: classes.msgText } >{msgObj.msg}</div>
            ) 
            let avatarComp = (
                <ListItemIcon className={ (msgObj.isMe)? classes.listItemIconHidden: classes.listItemIcon }>
                    <Avatar> <img className={classes.avatar} src={photoSrc}/> </Avatar>
                </ListItemIcon>
            )

            msgCompAry.push(
                <ListItem key={msgObj.time} 
                    className={ classes.listItem }>
                    {avatarComp}
                    {msgComp}
                </ListItem>
            )
            
        })

        return (
            <List className={classes.list}>
                {msgCompAry}
            </List>
        )
        
    }

    render() {

        const { classes } = this.props;
        let data = this.state.data;

        return (
            <div className={classes.root}>
                <div className={classes.titleBar} >
                    <div className={classes.title} >
                        {data.name||'undefined'}
                    </div>
                </div>
                <div className={classes.chatWindow}>
                    {this.createMsgList()}
                </div>
                <div className={classes.toolbar}>
                    
                </div>
                <div contentEditable='true' className={classes.input}>
                    
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Chatroom);