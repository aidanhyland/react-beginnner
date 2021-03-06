import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Todos from "./components/Todos";
import Header from "./components/layout/header";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";

class App extends Component {
	state = {
		todos: [],
	};

	componentDidMount() {
		axios
			.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
			.then((response) => this.setState({ todos: response.data }));
	}

	// toggle Complete
	markComplete = (id) => {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if (todo.id === id) {
					todo.completed = !todo.completed;
				}
				return todo;
			}),
		});
	};

	// Delete Todo
	delTodo = (id) => {
		axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(() =>
			this.setState({
				todos: [...this.state.todos.filter((todo) => todo.id !== id)],
			})
		);
	};

	// Add Tooo
	addTodo = (title) => {
		axios
			.post("https://jsonplaceholder.typicode.com/todos", {
				title,
				completed: false,
			})
			.then((response) =>
				this.setState({
					todos: [...this.state.todos, response.data],
				})
			);
	};

	render() {
		return (
			<Router>
				<div className="App">
					<div className="container">
						<Header />
						<Route
							exact
							path="/"
							render={(props) => (
								<React.Fragment>
									<AddTodo addTodo={this.addTodo} />
									<Todos
										todos={this.state.todos}
										markComplete={this.markComplete}
										delTodo={this.delTodo}
									/>
								</React.Fragment>
							)}
						/>
						<Route path="/about" component={About} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
