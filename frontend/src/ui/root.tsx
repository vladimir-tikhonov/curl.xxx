import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { StyledComponentProps } from 'src/ui';
import { Editor } from './editor';
import { Header } from './header';
import { LeftMenu } from './left_menu';

const styles = createStyles({
    root: {
        display: 'flex',
        height: '100%',
    },
});

class Root extends React.PureComponent<StyledComponentProps<typeof styles>> {
    public render() {
        const { classes } = this.props;

        return (
            <CssBaseline>
                <main className={classes.root}>
                    <Header />
                    <LeftMenu />
                    <Editor />
                </main>
            </CssBaseline>
        );
    }
}

export default withStyles(styles)(Root);
