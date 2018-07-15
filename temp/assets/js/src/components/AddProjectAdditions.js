import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import pure from 'recompose/pure';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {ReferenceManyField, Datagrid, TextField, ShowButton } from 'admin-on-rest';

import { Popover, FloatingActionButton, Menu, MenuItem } from 'material-ui';



class AddProjectAddition extends Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            open: false,

        };
    }


    handleClick(event) {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose () {
        this.setState({
            open: false,
        });
    };

    onItemChoiceSelect(event) {
        this.props.handleChoiceSelect(event);
        this.handleRequestClose();

    }
    onItemChoiceCustom(event) {
        this.props.handleChoiceCustom(event);
        this.handleRequestClose();


    }
    render () {
        return (
            <div>
                <FloatingActionButton
                    onClick={this.handleClick.bind(this)}
                >
                <ContentAdd />
                </FloatingActionButton>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                >
                    <Menu>
                        <MenuItem primaryText="Select from exists" onClick={this.onItemChoiceSelect.bind(this)} />
                        <MenuItem primaryText="Custom addition" onClick={this.onItemChoiceCustom.bind(this)}/>
                    </Menu>
                </Popover>
            </div>
        )
    }
};

 const AddProjectAdditions = ({ source, record = {}, elStyle, handleChoiceSelect,  handleChoiceCustom}) => {

  return <AddProjectAddition handleChoiceSelect={handleChoiceSelect} handleChoiceCustom={handleChoiceCustom}/>;
};
AddProjectAdditions.propTypes ={
    handleChoiceSelect: PropTypes.func.isRequired,
    handleChoiceCustom: PropTypes.func.isRequired,

};
export default AddProjectAdditions;