import React, { Component, createContext } from 'react';
import logo from './logo.svg';
import './App.css';

export const CounterContext = createContext();

class CounterProvider extends Component {
  state = {
    count: 1
  }

  handleIncrement = this.handleIncrement.bind(this);
  handleDecrement = this.handleDecrement.bind(this);

  handleIncrement() {
    this.setState({
      count: this.state.count + 1
    });
  }

  handleDecrement() {
    this.setState({
      count: this.state.count - 1
    });
  }

  render() {
    return (
      <CounterContext.Provider value={{
        count: this.state.count,
        handleDecrement: this.handleDecrement,
        handleIncrement: this.handleIncrement
      }}>
        {this.props.children}
      </CounterContext.Provider>
    )
  }
}

const Increment = () => (
	<CounterContext.Consumer>
		{context => (<button onClick={context.handleIncrement}>+</button>)}
	</CounterContext.Consumer>
);

const Decrement = () => (
  <CounterContext.Consumer>
    {context => (<button onClick={context.handleDecrement}>-</button>)}
  </CounterContext.Consumer>
);

const Count = () => (
  <CounterContext.Consumer>
    {context => (<div>{context.count}</div>)}    
  </CounterContext.Consumer>
);

class Counter extends Component {
  static Increment = Increment
  static Decrement = Decrement
	static Count = Count
	render() {
		return (
			<CounterProvider>
				{this.props.children}
			</CounterProvider>
		);
	}
}

class App extends Component {
  render() {
    return (
      <Counter>
        <Counter.Increment />
        <Counter.Count />
        <Counter.Decrement />
      </Counter>
    );
  }
}

export default App;
