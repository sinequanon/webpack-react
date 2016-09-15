import React from 'react';

class RouteParams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { first, second } = this.props.params;
        return (
            <div className='routeParams'>
                <h2>Routes with Params</h2>
                <div>
                    <h4>{ `First Param : ${first}` }</h4>
                    <h4>{ `Second Param : ${second}` }</h4>
                </div>
            </div>
        );
    }
}

export default RouteParams;
