
import React, { Component } from 'react';
import { translate, SelectInput } from 'admin-on-rest';


class DependentSelect extends Component {
   state : {
           resources: [];
       }

    /*This is necessary so that the SelectInput receive all its required props
    from redux-form*/
    static defaultProps : { addField: true };

    componentDidMount() {
        this.fetchData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dependsOnValue !== this.props.dependsOnValue) {
            this.fetchData(nextProps);
        }
    }

    fetchData(props) {
        fetch("/api/" + props.reference + '?' + props.dependsOnResource + '=' + props.dependsOnValue +'&_end=300&_order=DESC&_sort=id&_start=0',
            {
                method: "GET",
                headers : {
                    "authorization": "Bearer " + localStorage.token
                }
            }
    ).then((response) => {
       return response.json()
        })
            .then(resources => {
                this.setState({ resources });
            });
    }

    render() {
        return (
            <div>
                <SelectInput {...this.props} choices={this.state ? this.state.resources : [] }  />
            </div>
        )
    }
}

DependentSelect.propTypes = SelectInput.propTypes;
DependentSelect.defaultProps = SelectInput.defaultProps;

export default DependentSelect;