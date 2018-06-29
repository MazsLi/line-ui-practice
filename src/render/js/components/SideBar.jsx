import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CropIcon from '@material-ui/icons/Crop';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import grey from '@material-ui/core/colors/grey';
import TimelineMax from "gsap/TimelineMax";

const styles = {
    root: {
        width: '100%',
        height: '100%',
        padding: '10px 0 0 0',
        background: '#2d3548',
        boxSizing: 'border-box',
    },
    listItem: {
        padding: '1rem 0px .8rem 0px',
    },
    endListItem: {
        padding: '10px 0px 5px 0px',
    },
    endListItems: {
        width: 'inherit',
        position: 'absolute',
        bottom: '10px',
    },
    iconItem: {
        margin: '0 auto',
        color: grey[200],
        '&:hover': {
            color: grey[400],
        },
    },
    iconItemClick: {
        margin: '0 auto',
        color: grey[200],
    }
    
}

class SideBar extends React.Component {
    
    constructor(props) {
        
        super(props);

        this.state = {
            currentItem: null,
            itemAry: ['person', 'chat', 'add', 'post', 'today'],
            endItemAry: ['cut', 'keep', 'setting'],
        }
    }

    getIcon = (classes, which) => {

        let icon = (<ErrorOutlineIcon/>);
        let isEndItem = false;
        
        switch(which) {
            case 'person':
                icon = (<PersonIcon/>);
                break;
            case 'chat':
                icon = (<ChatBubbleIcon/>);
                break;
            case 'add':
                icon = (<PersonAddIcon/>);
                break;
            case 'post':
                icon = (<AccessTimeIcon/>);
                break;
            case 'today':
                icon = (<AssignmentIcon/>);
                break;

            case 'cut':
                icon = (<CropIcon/>);
                isEndItem = true;
                break;
            case 'keep':
                icon = (<ArrowDownwardIcon/>);
                isEndItem = true;
                break;
            case 'setting':
                icon = (<MoreHorizIcon/>);
                isEndItem = true;
                break;
        }
        
        return (
            <ListItem key={which} button 
                id={which}
                className={ (isEndItem)? classes.endListItem :classes.listItem} 
                onClick={this.handleItemClick.bind(this, which)}>
                <ListItemIcon className={ (this.state.currentItem==which)? classes.iconItemClick: classes.iconItem}>
                    {icon}
                </ListItemIcon>
            </ListItem>
        )
    }

    handleItemClick = (which) => {

        this.props.switchPage(which);

        this.setState({
            currentItem: which
        })

        let item = `#${which}`;
        
        let tl = new TimelineMax();
        tl.to( item, .3, {
            scale: 1.3
        })
        .to( item, .2, {
           scale: .8
        })
        .to( item, .1, {
           scale: 1
        });

    }

    render () {

        const { classes } = this.props;
        
        // Main func icon
        let itemAry = this.state.itemAry.map( (item) => {
            
            return this.getIcon(classes, item);
        })
        
        // End func icon
        let endItemAry = this.state.endItemAry.map( (item) => {
            
            return this.getIcon(classes, item);
            
        })

        return (
            
            <List className={classes.root}>
                {itemAry}
                <div className={classes.endListItems}>
                    {endItemAry}
                </div>
            </List>
            
        )
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SideBar);