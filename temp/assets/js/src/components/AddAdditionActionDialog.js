import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {refreshView as refreshViewAction} from 'admin-on-rest/src/actions/uiActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup, TextField, SelectField, MenuItem} from 'material-ui';
 /*import AddProjectAdditions from './AddProjectAdditions';*/

import {
    ReferenceManyField,
    Datagrid,
    ShowButton,
    TextInput,
    SimpleForm,
    Create,
    ReferenceInput,
    SelectInput,
    AutocompleteInput
} from 'admin-on-rest';

const styles = {
    radioButton: {
        marginTop: 16
    }
};

const initialState = {
    openSelect: false,
    openCustom: false,
    price: '',
    value: null,
    addition: '',
};

/**
 * Dialog content can be scrollable.
 */
class AddAdditionActionDialog extends React.Component {
    /*/noinspection JSAnnotator*/

    constructor(props) {
        super(props);
        this.state = {...initialState, projectAdditions: []};
        this.fetchData();

        this.changePrice = this.changePrice.bind(this);
        this.handleCustomOpen = this.handleCustomOpen.bind(this);

    }

    fetchData() {
        fetch('/api/projects_additions?_end=500&_order=ASC&_sort=id&_start=0',
            {
                method: 'GET',
                headers: {
                    'authorization': 'Bearer ' + localStorage.token
                }
            }
        ).then((response) => {
            return response.json();
        })
            .then(projectAdditions => {
                this.setState({projectAdditions});
            });
    };


    handleCustomOpen = () => {
        this.setState({openCustom: true});
    };

    handleClose = () => {

        this.setState({
            openCustom: false,
            addition: ''
        });
    };

    saveSelectAddition = () => {
        var data = JSON.stringify({
            'name': this.state.addition,
            'price': this.state.price,
            'pricelist_id': this.props.record.id
        });

        fetch('/api/projects_additions',
            {
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + localStorage.token,
                    'Content-Length': data.length,
                    'Content-Type': 'application/json'
                },
                body: data
            }
        ).then((response) => {
            return response.json();
        })
            .then(response => {

                if (response.status == true) {
                    this.setState({...initialState});
                }

            });

        this.handleClose();
        this.props.refreshView();
    };

    changePrice = (e) => {

        this.setState({
            price: e.target.value
        });
    };
    changeAddition = (e) => {

        this.setState({
            addition: e.target.value
        });
    };


    render(props) {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={::this.saveSelectAddition}
            />
        ];

        return (
            <div>
                <FlatButton label="Add" primary={true} keyboardFocused={true} onClick={this.handleCustomOpen.bind(this)}/>

                <Dialog
                    title="Add stone addition"
                    actions={actions}
                    modal={true}
                    open={this.state.openCustom}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <div>
                        <TextField name="addition" floatingLabelText="Stone addition" value={this.state.addition}
                                   onChange={this.changeAddition}/>
                    </div>
                    <div>
                        <TextField name="price" floatingLabelText="Price" value={this.state.price}
                                   onChange={this.changePrice}/>
                    </div>
                </Dialog>
            </div>
        );
    }
}

const enchance = compose(
    connect(null, {refreshView: refreshViewAction})
);
export default enchance(AddAdditionActionDialog);
