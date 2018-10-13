import Button from '@material-ui/core/Button';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CopyIcon from '@material-ui/icons/FileCopy';
import SendIcon from '@material-ui/icons/Send';
import * as classnames from 'classnames';
import * as React from 'react';

import { ExtractClassesPropType } from 'src/ui';

interface ButtonsProps extends ExtractClassesPropType<typeof styles> {
    executionIsDisabled: boolean;
    handleClearClick(): void;
    handleCopyClick(): void;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        buttonsGroup: {
            display: 'flex',
            flexDirection: 'row',
            width: '50%',
        },
        leftButtons: {
            justifyContent: 'flex-start',
        },
        rightButtons: {
            justifyContent: 'flex-end',
        },
        icon: {
            marginLeft: theme.spacing.unit,
        },
        button: {
            margin: theme.spacing.unit,
        },
        executeButton: {
            minWidth: '50%',
        },
    });

export class Buttons extends React.PureComponent<ButtonsProps> {
    public render() {
        const { classes, executionIsDisabled, handleClearClick, handleCopyClick } = this.props;

        return (
            <div className={classes.root}>
                <div className={classnames(classes.buttonsGroup, classes.leftButtons)}>
                    <Button
                        className={classnames(classes.button, classes.executeButton)}
                        disabled={executionIsDisabled}
                        variant="contained"
                        color="primary"
                    >
                        Execute
                        <SendIcon className={classes.icon} />
                    </Button>
                </div>

                <div className={classnames(classes.buttonsGroup, classes.rightButtons)}>
                    <Button variant="contained" className={classes.button} onClick={handleCopyClick}>
                        Copy to clipboard
                        <CopyIcon className={classes.icon} />
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={handleClearClick}>
                        Clear
                        <DeleteIcon className={classes.icon} />
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Buttons);
