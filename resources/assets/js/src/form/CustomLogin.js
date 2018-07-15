import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import { cyan500, pinkA200, blueGrey600 } from 'material-ui/styles/colors';
import Fade from 'material-ui-next/transitions/Fade'
import defaultTheme from 'admin-on-rest';
import { userLogin as userLoginAction } from 'admin-on-rest/lib/actions/authActions';
import translate from 'admin-on-rest/lib/i18n/translate';
import Notification from 'admin-on-rest/lib/mui/layout/Notification';

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        minWidth: 300,
    },
    avatar: {
        margin: '1em 1em 30px 1em',
        textAlign: 'center ',
        img: {
            height: 'auto',
            width: 250,
            borderRadius: 0,
            backgroundColor: 'none',
        },
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        display: 'flex',
        position: 'relative',
        marginBottom: '30px',
    },
    label: {
        position: 'absolute',
        top: '-4px',
        fontSize: '12px',
    },
};

function getColorsFromTheme(theme) {
    if (!theme) return { primary1Color: cyan500, accent1Color: pinkA200 };
    const { palette: { primary1Color, accent1Color } } = theme;
    return { primary1Color, accent1Color };
}

const renderInput = ({
                         meta: { touched, error } = {},
                         input: { ...inputProps },
                         ...props
                     }) => (
    <TextField
        errorText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

class CustomLogin extends Component {
    login = auth =>
        this.props.userLogin(
            auth,
            this.props.location.state
                ? this.props.location.state.nextPathname
                : '/'
        );

    render() {
        const { handleSubmit, isLoading, theme, translate } = this.props;
        let muiTheme = getMuiTheme(theme);
        muiTheme.appBar = { ...muiTheme.appBar, position: 'fixed', top: 0};
        const { primary1Color, accent1Color } = getColorsFromTheme(muiTheme);
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={{ ...styles.main, backgroundColor: primary1Color }}>
                    <div> </div>
                    <Card style={styles.card}>
                        <div style={styles.avatar}>
                        </div>
                        <form onSubmit={handleSubmit(this.login)}>
                            <div style={styles.form}>
                                <div style={styles.input}>
                                    <label style={styles.label}>Email</label>
                                    <Field
                                        name="email"
                                        component={renderInput}
                                        rows={1}
                                        hintText="Email"
                                        type="email"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div style={styles.input}>
                                    <label style={styles.label}>{translate('aor.auth.password')}</label>
                                    <Field
                                        name="password"
                                        component={renderInput}
                                        rows={1}
                                        hintText={translate(
                                            'aor.auth.password'
                                        )}
                                        type="password"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <CardActions>
                                <RaisedButton
                                    type="submit"
                                    primary
                                    disabled={isLoading}
                                    icon={
                                        isLoading && (
                                            <CircularProgress
                                                size={25}
                                                thickness={2}
                                            />
                                        )
                                    }
                                    label={translate('aor.auth.sign_in')}
                                    fullWidth
                                />
                            </CardActions>
                        </form>
                    </Card>
                    <Notification />
                </div>
            </MuiThemeProvider>
        );
    }
}

CustomLogin.propTypes = {
    ...propTypes,
    authClient: PropTypes.func,
    previousRoute: PropTypes.string,
    theme: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
};

CustomLogin.defaultProps = {
    theme: defaultTheme,
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });

const enhance = compose(
    translate,
    reduxForm({
        form: 'signIn',
        validate: (values, props) => {
            const errors = {};
            const { translate } = props;
            if (!values.username)
                errors.username = translate('aor.validation.required');
            if (!values.password)
                errors.password = translate('aor.validation.required');
            return errors;
        },
    }),
    connect(mapStateToProps, { userLogin: userLoginAction })
);

export default enhance(CustomLogin);
