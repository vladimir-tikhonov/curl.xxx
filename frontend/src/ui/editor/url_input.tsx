import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { ArgumentApplier, urlApplier } from 'src/curl';
import { ExtractClassesPropType } from 'src/ui';

interface UrlInputProps extends ExtractClassesPropType<typeof styles> {
    url: string;
    handleArgumentApplier<T extends string = string>(applier: ArgumentApplier<T>, payload: T[]): void;
}

const styles = createStyles({
    formControl: {
        width: '100%',
    },
    urlInput: {
        width: '100%',
    },
});

class UrlInput extends React.PureComponent<UrlInputProps> {
    public constructor(props: UrlInputProps) {
        super(props);

        this.handleUrlChange = this.handleUrlChange.bind(this);
    }

    public render() {
        const { classes, url } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="url-input">URL</InputLabel>
                <Input
                    id="url-input"
                    className={classes.urlInput}
                    value={url}
                    onChange={this.handleUrlChange}
                    placeholder="https://example.com"
                />
            </FormControl>
        );
    }

    private handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newUrl = event.target.value;
        this.props.handleArgumentApplier(urlApplier, [newUrl]);
    }
}

export default withStyles(styles)(UrlInput);
