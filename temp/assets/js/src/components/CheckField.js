import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import pure from 'recompose/pure';


import TrueIcon from 'material-ui/svg-icons/content/clear';
export const CheckField = ({ source, record = {}, elStyle }) => {
    if (get(record, source) == false) {
        return (
            <span style={{
                display: "block",
                border: "1px solid black",
                width: 10,
                height: 10
            }}> </span>
        );
    }

    if (get(record, source) === true) {
        return (
            <TrueIcon style={elStyle} />
        );
    }

    return <span style={elStyle} />;
};

CheckField.propTypes = {
    addLabel: PropTypes.bool,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

const PureCheckField = pure(CheckField);

PureCheckField.defaultProps = {
    addLabel: true,
    elStyle: {
        display: 'block',
        margin: 'auto',
    },
};

export default PureCheckField;
