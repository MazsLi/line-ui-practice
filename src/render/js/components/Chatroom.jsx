import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Data from './data';

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
        height: '77%',
    },
    toolbar: {
        height: '5%',
        borderTop: '1px solid #DDDDDD',
        borderBottom: '1px solid #DDDDDD'
    },
    input: {
        boxSizing: 'border-box',
        height: '12%',
        outline: 0,
        padding: '10px',
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

    render() {

        const { classes } = this.props;
        let data = this.state.data;

        return (
            <div className={classes.root}>
                <div className={classes.titleBar} >
                    <div className={classes.title} >
                        {data.name}
                    </div>
                </div>
                <div className={classes.chatWindow}>
                    
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