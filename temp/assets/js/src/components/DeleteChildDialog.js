import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import DoNotDistrub from 'material-ui/svg-icons/notification/do-not-disturb';
/*import linkToRecord from 'admin-on-rest/src/util/linkToRecord';*/
import translate from 'admin-on-rest/src/i18n/translate';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {refreshView as refreshViewAction} from 'admin-on-rest/src/actions/uiActions';
import Dialog from 'material-ui/Dialog';

const DeleteButton = ({
                          basePath = '',
                          label = 'aor.action.delete',
                          record = {},
                          translate,
                          clickHandler = () => {
                              console.log('click')
                          }
                      }) => (
    <FlatButton
        secondary
        label={label && translate(label)}
        icon={<ActionDelete/>}
        onClick={clickHandler}
        /*containerElement={
            <Link to={`${linkToRecord(basePath, record.id)}/delete`} />
        }*/
        style={{overflow: 'inherit'}}
    />
);

DeleteButton.propTypes = {
    basePath: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    clickHandler: PropTypes.func,
    translate: PropTypes.func.isRequired,
};

const DeleteButtonTranslated = translate(DeleteButton);


const initialState = {
    openDelete: false
};

class DeleteChildDialog extends React.Component {


    constructor(props) {
        super(props);
        this.state = {...initialState, props};
    }

    handleClose = () => {
        this.setState({
            openDelete: false,
        });
    };
    handleDeleteItem = () => {
        console.log(this.props);
        fetch('/api/' + this.props.resource + '/' + this.props.record.id,
            {
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + localStorage.token
                }
            }
        )
            .then(response => {
              return response.json();
            }).then(response => {
                if(response.status) {
                    this.handleClose();
                    this.props.refreshView();
                }
        });
    };

    openDeleteDialog() {
        this.setState({
            openDelete: true,
        });
    }

    render(props) {
        const actions = [
            <FlatButton
                onClick={::this.handleClose}
                icon={<DoNotDistrub/>}
            />,
            <DeleteButtonTranslated
                primary={true}
                keyboardFocused={true}
                clickHandler={::this.handleDeleteItem}
                icon={<ActionDelete/>}
            />
        ];

        return (
            <div>
                <DeleteButtonTranslated clickHandler={::this.openDeleteDialog}/>
                <Dialog
                    title="Scrollable Dialog"
                    actions={actions}
                    modal={true}
                    open={this.state.openDelete}
                    onRequestClose={this.handleClose.bind(this)}
                    autoScrollBodyContent={true}
                >

                    <h2>Are you sure?</h2>
                </Dialog>
            </div>
        );
    }

}

const enchance = compose(
    connect(null, {refreshView: refreshViewAction}),
    translate
);
export default enchance(DeleteChildDialog);
