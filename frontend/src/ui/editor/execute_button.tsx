import Button from '@material-ui/core/Button';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { ExtractClassesPropType } from 'src/ui';

interface ExecuteButtonProps extends ExtractClassesPropType<typeof styles> {
    disabled: boolean;
}

const styles = createStyles({
    button: {
        width: '100%',
    },
});

export class ExecuteButton extends React.PureComponent<ExecuteButtonProps> {
    public render() {
        const { classes, disabled } = this.props;

        return (
            <Button className={classes.button} disabled={disabled} variant="contained" color="primary">
                Execute
            </Button>
        );
    }
}

export default withStyles(styles)(ExecuteButton);
