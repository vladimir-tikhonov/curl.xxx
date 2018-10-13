import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { allRequestMethods, RequestMethod } from 'src/curl';
import { ExtractClassesPropType } from 'src/ui';

interface RequestMethodSelectProps extends ExtractClassesPropType<typeof styles> {
    requestMethod: RequestMethod;
    onChange(newRequestMethod: RequestMethod): void;
}

const styles = createStyles({
    formControl: {
        width: '100%',
    },
    select: {
        width: '100%',
    },
});

class RequestMethodSelect extends React.PureComponent<RequestMethodSelectProps> {
    public constructor(props: RequestMethodSelectProps) {
        super(props);

        this.handleRequestMethodChange = this.handleRequestMethodChange.bind(this);
    }

    public render() {
        const { classes, requestMethod } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="request-method-select">Method</InputLabel>
                <NativeSelect
                    id="request-method-select"
                    className={classes.select}
                    value={requestMethod}
                    onChange={this.handleRequestMethodChange}
                >
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

    private handleRequestMethodChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onChange(event.target.value as RequestMethod);
    }
}

export default withStyles(styles)(RequestMethodSelect);
