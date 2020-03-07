import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import grey from '@material-ui/core/colors/grey';
import PersonIcon from '@material-ui/icons/Person';
import Data from './data';

const styles = theme => ({
    input: {
        fontSize: 12,
        height: '100%',
        width: '100%'
    },
    inputAdornment: {
        maxHeight: 'none'
    },
    searchIcon: {
        fontSize: 16,
        margin: '2px 5px 0 5px',
        color: grey[600]
    },
    menuIcon: {
        fontSize: 16,
        color: grey[600],
        marginRight: '10px'
    },
    searchBar: {
        height: '6%',
    },

    chatList: {
        height: '94%'
    },
    list: {
        padding: '10px 0 0 0',
    },
    listItem: {
        padding: '0 0 0 10px',
        height: '60px'
    },
    listItemSelect: {
        padding: '0 0 0 10px',
        height: '60px',
        background: grey[300]
    },
    listItemText: {
        fontSize: 12
    }, 
    avatar: {
        width: '100%'
    },

    root: {
        height: 'inherit'
    },
    
})

class ChatList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: Data.getData()||[],
            currentID: 'id7',
        }
    }

    componentDidMount() {
        
    }

    createListItem(itemAry = []) {
        
        let compAry = [], classes = this.props.classes;

        itemAry.map( (personObj, index) => {
            compAry.push(
                <ListItem 
                    onMouseEnter={this.itemHover.bind(this, personObj.name, false)}
                    onMouseLeave={this.itemHover.bind(this, personObj.name, true)}
                    name={personObj.name}
                    className={ (this.state.currentID==personObj.id)? classes.listItemSelect: classes.listItem} 
                    key={index}>
                    <ListItemAvatar>
                        <Avatar>
                            { (personObj.photoSrc)? <img className={classes.avatar} src={personObj.photoSrc}/>: <PersonIcon/> }
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        className={classes.listItemText}
                        primary={ personObj.name||'No Name' }
                        secondary={ personObj.msgAry[0].msg||'' }
                    />
                    {/* <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction> */}
                </ListItem>
            )
        })

        return compAry;
    }

    itemHover(key, out) {
        let item = $(document).find("[name="+key+"]")[0];
        
        let tl = new TimelineMax();
        
        if(out) {
            tl.to( item, .2, {
                scale: .95
            })
            .to( item, .3, {
                scale: 1
            })
        }else{
            tl.to( item, .5, {
                scale: 1.05
            })
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.searchBar} >
                    <Input
                        className={classes.input}
                        id="input-with-icon"
                        startAdornment={
                            <InputAdornment className={classes.inputAdornment} position="start">
                                <SearchIcon className={classes.searchIcon}/>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment className={classes.inputAdornment} position="end">
                                <MenuIcon className={classes.menuIcon}/>
                            </InputAdornment>
                        }
                        placeholder="Search chat and message"
                    />
                </div>
                <div className={classes.chatList}>
                    <List className={classes.list}>
                        { this.createListItem(this.state.allData) }
                    </List>                        
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ChatList);