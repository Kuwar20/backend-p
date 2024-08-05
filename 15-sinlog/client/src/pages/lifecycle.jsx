import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    increment = () => {
        this.setState(prevState => ({ count: prevState.count + 1 }));
    };

    componentDidMount() {
        console.log('Component mounted');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component updated');
    }

    componentWillUnmount() {
        console.log('Component unmounted');
    }

    render() {
        return (
            <div>
                <p>Current Count: {this.state.count}</p>
                <button onClick={this.increment}>Increment</button>
            </div>
        );
    }
}

export default Counter;
