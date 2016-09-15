import React from 'react';

class Section1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClicked(event) {
        const message = typeof event === 'string' ?
            `Using React function binding : You clicked ${event}` :
            `Using DOM access : You clicked ${event.target.attributes.name.value}`;

        this.setState({
            message,
        });
    }

    render() {
        return (
            <div className='section1'>
                <h2>React state</h2>
                <h3>These links use React state to render</h3>
                <ul>
                    <li className='clickable' name='React' onClick={this.onClicked.bind(this, 'React')}>React</li>
                    <li className='clickable' name='Ember' onClick={this.onClicked.bind(this, 'Ember')}>Ember</li>
                    <li className='clickable' name='Angular' onClick={this.onClicked.bind(this)}>Angular</li>
                </ul>
                <div className='linky'>
                    <h3>{this.state.message}</h3>
                </div>
            </div>
        );
    }
}

export default Section1;
