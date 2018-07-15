import React from 'react';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { translate, changeLocale as changeLocaleAction, ViewTitle } from 'admin-on-rest';

const styles = {
    label: { width: '10em' },
    button: { margin: '1em 1em 0em 0em' },
};

const Configuration = ({ locale, changeLocale, translate }) => (
    <Card>
        <ViewTitle title={translate('gra.configuration')} />
        <CardText>
            <div style={styles.label}>{translate('gra.language')}</div>
            <RaisedButton style={styles.button} label="en" primary={locale === 'en'} onClick={() => {
                window.localStorage.setItem('lang', 'en');
                return changeLocale('en');
            }} />
            <RaisedButton style={styles.button} label="sv" primary={locale === 'sv'} onClick={() => {
                window.localStorage.setItem('lang', 'sv');
                return changeLocale('sv');
            }} />
        </CardText>
    </Card>
);

const mapStateToProps = state => ({
    locale: state.locale,
});

export default connect(mapStateToProps, {
    changeLocale: changeLocaleAction,
})(translate(Configuration));
