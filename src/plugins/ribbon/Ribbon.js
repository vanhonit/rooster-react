import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RibbonButton from './RibbonButton';
import ribbonButtons from './ribbonButtons';
import { getFormatState, rotateElement } from 'roosterjs-editor-api';
import { QueryScope } from 'roosterjs-editor-types';
import styles from './RibbonStyles';

// let styles = require('./Ribbon.css');

class Ribbon extends React.Component {
    render() {
        const plugin = this.props.plugin;
        if (!plugin) {
            return null;
        }
        const editor = plugin.getEditor();
        const format = editor && getFormatState(editor);
        const button = {...ribbonButtons, ...this.props.ribbonButtons};

        const { classes } = this.props;
        return (
            <div className={classes.ribbon + ' ' + (this.props.className || '')}>
                {Object.keys(button).map(key => (
                    <RibbonButton
                        key={key}
                        plugin={plugin}
                        format={format}
                        button={button[key]}
                        onClicked={this.onButtonClicked}
                    />
                ))}
                {/* <button onClick={this.onRotateImage} className={classes.textButton}>
                    RotateImage
                </button>
                <button onClick={this.onSave} className={classes.textButton}>
                    Export
                </button> */}
                <button onClick={this.onClear} className={classes.textButton}>
                    Clear
                </button>
{/* 
                {!this.props.isPopout && (Browser.isChrome || Browser.isFirefox) && (
                    <button onClick={this.onPopOut} className={styles.textButton}>
                        PopOut
                    </button>
                )} */}
            </div>
        );
    }

    onRotateImage = () => {
        const editor = this.props.plugin.getEditor();
        const images = editor.queryElements('img', QueryScope.InSelection);
        if (images.length > 0) {
            rotateElement(editor, images[0], 45);
        }
    };

    onSave = () => {
        let editor = this.props.plugin.getEditor();
        let w = window.open();
        w.document.write(editor.getContent());
    };

    onClear = () => {
        let editor = this.props.plugin.getEditor();
        editor.addUndoSnapshot(() => {
            editor.setContent('');
        });
    };

    // onPopOut = () => {
    //     MainPaneBase.getInstance().popout();
    // };

    onButtonClicked = () => {
        this.forceUpdate();
    };
}
Ribbon.propTypes = {
    plugin: PropTypes.array,
    ribbonButtons: PropTypes.array
};
export default withStyles(styles)(Ribbon);