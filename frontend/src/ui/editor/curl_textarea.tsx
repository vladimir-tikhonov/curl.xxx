import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';

import { IStyledComponentProps } from 'src/ui';

const styles = createStyles({
    formControl: {
        width: '100%',
    },
    curlTextarea: {
        width: '100%',
    },
    ps1: {
        alignItems: 'flex-start',
        color: 'rgba(0, 0, 0, 0.54)',
    },
});

class CurlTextarea extends React.PureComponent<IStyledComponentProps<typeof styles>> {
    public render() {
        const { classes } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <TextField
                    id="curl-texarea"
                    className={classes.curlTextarea}
                    multiline
                    rows="5"
                    label="curl command"
                    InputProps={{ startAdornment: this.renderPs1() }}
                />
            </FormControl>
        );
    }

    private renderPs1() {
        return (
            <InputAdornment disableTypography position="start" classes={{ root: this.props.classes.ps1 }}>
                > curl
            </InputAdornment>
        );
    }
}

export default withStyles(styles)(CurlTextarea);
