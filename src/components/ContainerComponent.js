import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Form from './FormComponent';
import User from './UserComponent';

class Container extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			show: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.returnDefault = this.returnDefault.bind(this);
	}

	handleSubmit(value) {
		this.setState({
			username: value,
			show: true
		});
	}

	returnDefault() {
		this.setState({
			username: '',
			show: false
		})
	}

	render() {
		return(
				<div className="containerwrapper">
					<Switch>
						<Route path='/home' component={() => <Form handleSubmit={this.handleSubmit} state={this.state} />} />
						<Route exact path='/user/:username' component={() => <User state={this.state} returnDefault={this.returnDefault} />} />
						<Redirect to="/home" />
					</Switch>
				</div>
			);
	}

}

export default Container;
