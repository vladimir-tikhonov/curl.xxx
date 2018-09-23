import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { StyledComponentProps } from 'src/ui';

interface CurlTextareaProps extends StyledComponentProps<typeof styles> {
    curlCommandString: string;
    parseError: string | null;
    parseWarnings: string[];
    onChange: (newCommand: string) => void;
}

const styles = createStyles({
    formControl: {
        width: '100%',
    },
    curlTextarea: {
        width: '100%',
    },
    ps1: {
        alignSelf: 'flex-start',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    helperLine: {
        display: 'block',
    },
});

class CurlTextarea extends React.PureComponent<CurlTextareaProps> {
    public constructor(props: CurlTextareaProps) {
        super(props);

        this.handleTextareaChange = this.handleTextareaChange.bind(this);
    }

    public render() {
        const { classes, curlCommandString, parseError, parseWarnings } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="curl-texarea">curl command</InputLabel>
                <Input
                    error={!!parseError || parseWarnings.length > 0}
                    id="curl-texarea"
                    className={classes.curlTextarea}
                    multiline
                    rows="5"
                    value={curlCommandString}
                    onChange={this.handleTextareaChange}
                    startAdornment={this.renderPs1()}
                />
                {this.renderErrorsAndWarnings()}
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

    private renderErrorsAndWarnings() {
        const { classes, parseError, parseWarnings } = this.props;
        if (!parseError && parseWarnings.length === 0) {
            return null;
        }

        return (
            <FormHelperText>
                {parseError && <span className={classes.helperLine}>Error: {parseError}</span>}
                {parseWarnings.map((warning) => (
                    <span key={warning} className={classes.helperLine}>
                        Warning: {warning}
                    </span>
                ))}
            </FormHelperText>
        );
    }

    private handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.props.onChange(event.target.value);
    }
}

export default withStyles(styles)(CurlTextarea);
