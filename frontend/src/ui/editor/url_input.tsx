import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { IStyledComponentProps } from 'src/ui';

const styles = createStyles({
    formControl: {
        width: '100%',
    },
    urlInput: {
        width: '100%',
    },
});

class UrlInput extends React.PureComponent<IStyledComponentProps<typeof styles>> {
    public render() {
        const { classes } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="url-input">URL</InputLabel>
                <Input id="url-input" className={classes.urlInput} placeholder="https://example.com" />
            </FormControl>
        );
    }
}

export default withStyles(styles)(UrlInput);
