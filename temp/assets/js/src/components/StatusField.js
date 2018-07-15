import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import pure from 'recompose/pure';

const StatusField = ({ source, record = {}, elStyle }) => {

    var statusVal = get(record, source);
    var status = 'yellow';
    if(statusVal > 1) {
        status = '#A4B6FA';
    }
    if(statusVal > 2) {
        status = 'green';
    }
    elStyle.background = status;

    console.log('status = ', source);
    return <span style={elStyle}></span>;
};

StatusField.propTypes = {
    addLabel: PropTypes.bool,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

const PureStatusField = pure(StatusField);

PureStatusField.defaultProps = {
    addLabel: true,
};

export default PureStatusField;
