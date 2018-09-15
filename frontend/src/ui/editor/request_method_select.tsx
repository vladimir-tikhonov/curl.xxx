import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { allRequestMethods, RequestMethod } from 'src/request_methods';
import { IStyledComponentProps } from 'src/ui';

const styles = createStyles({
    formControl: {
        width: '100%',
    },
    select: {
        width: '100%',
    },
});

class RequestMethodSelect extends React.PureComponent<IStyledComponentProps<typeof styles>> {
    public render() {
        const { classes } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="request-method-select">Method</InputLabel>
                <NativeSelect id="request-method-select" className={classes.select}>
                    {allRequestMethods.map((method) => this.renderMethodOption(method))}
                </NativeSelect>
            </FormControl>
        );
    }

    private renderMethodOption(method: RequestMethod) {
        return (
            <option key={method} value={method}>
                {method}
            </option>
        );
    }
}

export default withStyles(styles)(RequestMethodSelect);
