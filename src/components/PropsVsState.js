import React from 'react';

/**
 * Parent Component
 */
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            stringProp: this.props.stringProp,
            numberProp: this.props.numberProp,
            objectProp: this.props.objectProp,
        };
    }

    handleChange(type, event) {
        try {
            const value = event.target.value;
            let state;
            if (type === 'object') {
                state = {
                    objectProp: JSON.parse(event.target.value),
                };
            } else if (type === 'string') {
                state = {
                    stringProp: value,
                };
            } else if (type === 'number') {
                state = {
                    numberProp: +value,
                };
            }
            this.setState(state);
        } catch (error) {
            // invalid json
        }
    }

    render() {
        return (
            <div className='parentComponent'>
                <h3>This is the parent component</h3>
                <input type='text' onChange={this.handleChange.bind(this, 'string')} defaultValue={this.state.stringProp}/>
                <input type='text' onChange={this.handleChange.bind(this, 'number')} defaultValue={this.state.numberProp}/>
                <input type='text' onChange={this.handleChange.bind(this, 'object')} defaultValue={JSON.stringify(this.state.objectProp)}/>
                <Child {...this.state}/>
            </div>
        );
    }
}

/**
 * Child Component
 */
class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const props = Object.keys(this.props).map(key =>
            (
            <div key={key}>
                <span className='propLabel'>{key}</span>
                <span className='propValue'>{JSON.stringify(this.props[key])}</span>
            </div>
            )
        );
        return (
            <div className='childComponent'>
                <h4>This is the child component</h4>
                <div>
                    <span>I have the following props passed from my parent</span>
                    {props}
                </div>
            </div>
        );
    }
}

/**
 * PropsVsState component that will render everything
 */
class PropsVsState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const sampleObject = {
            a: true,
        };

        return (
            <div className='PropsVsState'>
                <h2>Props vs State</h2>
                <div>
                    <h3>Enter</h3>
                    <Parent stringProp={'a string prop'} numberProp={ 3 } objectProp={sampleObject}/>
                </div>
            </div>
        );
    }
}

export default PropsVsState;
