import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as classnames from 'classnames';
import * as React from 'react';

import { IStyledComponentProps } from 'src/ui';
import { LEFT_MENU_WIDTH } from 'src/ui/constants';

const styles = (theme: Theme) =>
    createStyles({
        leftMenu: {
            width: LEFT_MENU_WIDTH,
            height: '100%',
        },
        toolbar: theme.mixins.toolbar,
        leftMenuHeader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        leftMenuPaper: {
            position: 'relative',
            width: LEFT_MENU_WIDTH,
        },
    });

class LeftMenu extends React.PureComponent<IStyledComponentProps<ReturnType<typeof styles>>> {
    public render() {
        const { classes } = this.props;

        return (
            <Drawer
                className={classes.leftMenu}
                classes={{ paper: classes.leftMenuPaper }}
                anchor="left"
                variant="permanent"
            >
                <div className={classnames(classes.toolbar, classes.leftMenuHeader)}>
                    <Typography variant="title">Recent queries</Typography>
                </div>

                <Divider />

                <List>
                    <ListItem>
                        <span>123</span>
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles)(LeftMenu);
