import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='home'>
                <h2>Home</h2>
                <span>This is the simple home page</span>
            </div>
        );
    }
}

export default Home;
