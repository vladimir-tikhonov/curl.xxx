import Button from '@material-ui/core/Button';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { IStyledComponentProps } from 'src/ui';

const styles = createStyles({
    button: {
        width: '100%',
    },
});

export class ExecuteButton extends React.PureComponent<IStyledComponentProps<typeof styles>> {
    public render() {
        const { classes } = this.props;

        return (
            <Button className={classes.button} variant="contained" color="primary">
                Execute
            </Button>
        );
    }
}

export default withStyles(styles)(ExecuteButton);
