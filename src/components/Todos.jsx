import React from 'react';
import ENDPOINT from '../../endpoint.json';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentWillMount() {
    const { TODOS_ENDPOINT } = ENDPOINT;

    fetch(TODOS_ENDPOINT)
      .then(response => (
        response.json()
      ))
      .then((data) => {
        const { todos } = data;
        this.setState({
          todos,
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.todos.map((todo, i) => (
          // eslint-disable-next-line
          <li key={i}>
            {todo.title}
          </li>
        ))}
      </div>
    );
  }
}
