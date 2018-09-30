import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import {
    applyRequestMethod,
    ArgumentApplier,
    buildCommandFromString,
    CurlCommand,
    extractMetadata,
    RequestMethod,
    sanitizeCommand,
    strinfigyCurlCommand,
} from 'src/curl';
import { ExtractClassesPropType } from 'src/ui';
import CurlTextarea from './curl_textarea';
import ExecuteButton from './execute_button';
import RequestMethodSelect from './request_method_select';
import UrlInput from './url_input';

interface EditorState {
    curlCommandString: string;
    curlCommand: CurlCommand;
    url: string;
    requestMethod: RequestMethod;
    parseError: string | null;
    parseWarnings: string[];
}

interface EditorProps extends ExtractClassesPropType<typeof styles> {}

const styles = (theme: Theme) =>
    createStyles({
        editorRoot: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        toolbar: theme.mixins.toolbar,
        gridRow: {
            minHeight: 'fit-content',
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            marginBottom: 16,
        },
        subheader: {
            marginTop: 16,
            marginLeft: 16,
        },
    });

const DEFAULT_CURL_COMMAND = 'https://example.com';

class Editor extends React.PureComponent<EditorProps, EditorState> {
    public constructor(props: EditorProps) {
        super(props);

        const buildResults = buildCommandFromString(DEFAULT_CURL_COMMAND);
        if (!buildResults.successfull || buildResults.warnings.length !== 0) {
            throw new Error('Default command is corrupted');
        }
        const { url, requestMethod } = extractMetadata(buildResults.curlCommand);
        this.state = {
            curlCommandString: DEFAULT_CURL_COMMAND,
            curlCommand: buildResults.curlCommand,
            url,
            requestMethod,
            parseError: null,
            parseWarnings: [],
        };

        this.handleCurlCommandStringChange = this.handleCurlCommandStringChange.bind(this);
        this.handleRequestMethodChange = this.handleRequestMethodChange.bind(this);
        this.handleArgumentApplier = this.handleArgumentApplier.bind(this);
    }

    public render() {
        const { classes } = this.props;
        const { requestMethod, url } = this.state;

        return (
            <div className={classes.editorRoot}>
                <div className={classes.toolbar} />

                <Typography className={classes.subheader} variant="headline">
                    Request
                </Typography>

                <Grid container spacing={8} className={classes.gridRow}>
                    <Grid item xs>
                        <UrlInput url={url} handleArgumentApplier={this.handleArgumentApplier} />
                    </Grid>
                    <Grid item xs={2}>
                        <RequestMethodSelect requestMethod={requestMethod} onChange={this.handleRequestMethodChange} />
                    </Grid>
                </Grid>

                <Grid container className={classes.gridRow}>
                    <Grid item xs>
                        <CurlTextarea
                            curlCommandString={this.state.curlCommandString}
                            parseError={this.state.parseError}
                            parseWarnings={this.state.parseWarnings}
                            onChange={this.handleCurlCommandStringChange}
                        />
                    </Grid>
                </Grid>

                <Grid container className={classes.gridRow}>
                    <Grid item xs>
                        <ExecuteButton disabled={!!this.state.parseError} />
                    </Grid>
                </Grid>
            </div>
        );
    }

    private handleCurlCommandStringChange(newCommand: string) {
        const sanitizedCommand = sanitizeCommand(newCommand);
        this.setState({ curlCommandString: sanitizedCommand });

        const buildResult = buildCommandFromString(sanitizedCommand);
        if (!buildResult.successfull) {
            this.setState({ parseError: buildResult.error, parseWarnings: [] });
            return;
        }

        this.applyNewCurlCommand(buildResult.curlCommand, buildResult.warnings, { doNotSetCurlString: true });
    }

    private handleRequestMethodChange(newRequestMethod: RequestMethod) {
        const newCurlCommand = applyRequestMethod(this.state.curlCommand, newRequestMethod);
        this.applyNewCurlCommand(newCurlCommand, []);
    }

    private handleArgumentApplier<T extends string = string>(applier: ArgumentApplier<T>, payload: T[]) {
        const newCurlCommand = applier.applyTo(this.state.curlCommand, payload);
        this.applyNewCurlCommand(newCurlCommand, []);
    }

    private applyNewCurlCommand(
        curlCommand: CurlCommand,
        parseWarnings: string[],
        customOptions?: { doNotSetCurlString?: boolean },
    ) {
        const options = { doNotSetCurlString: false, ...customOptions };

        const { url, requestMethod } = extractMetadata(curlCommand);
        this.setState({ curlCommand, url, requestMethod, parseError: null, parseWarnings });
        if (!options.doNotSetCurlString) {
            const curlCommandString = strinfigyCurlCommand(curlCommand);
            const buildResult = buildCommandFromString(curlCommandString);
            if (!buildResult.successfull) {
                this.setState({ parseError: buildResult.error });
            }
            this.setState({ curlCommandString });
        }
    }
}

export default withStyles(styles)(Editor);
