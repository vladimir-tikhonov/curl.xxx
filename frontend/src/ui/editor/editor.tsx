import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { buildCommandFromString, sanitizeCommand } from 'src/curl';
import { ExtractClassesPropType } from 'src/ui';
import CurlTextarea from './curl_textarea';
import ExecuteButton from './execute_button';
import RequestMethodSelect from './request_method_select';
import UrlInput from './url_input';

interface EditorState {
    curlCommandString: string;
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

class Editor extends React.PureComponent<EditorProps, EditorState> {
    public constructor(props: EditorProps) {
        super(props);
        this.state = {
            curlCommandString: 'https://example.com',
            parseError: null,
            parseWarnings: [],
        };

        this.handleCurlCommandStringChange = this.handleCurlCommandStringChange.bind(this);
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.editorRoot}>
                <div className={classes.toolbar} />

                <Typography className={classes.subheader} variant="headline">
                    Request
                </Typography>

                <Grid container spacing={8} className={classes.gridRow}>
                    <Grid item xs>
                        <UrlInput />
                    </Grid>
                    <Grid item xs={2}>
                        <RequestMethodSelect />
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
        if (buildResult.successfull) {
            this.setState({ parseError: null, parseWarnings: buildResult.warnings });
        } else {
            this.setState({ parseError: buildResult.error, parseWarnings: [] });
        }
    }
}

export default withStyles(styles)(Editor);
