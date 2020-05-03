import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Form extends Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleSubmit(event) {
		this.props.handleSubmit(this.username.value);
		event.preventDefault();
	}

	render() {
		if(this.props.state.show === true)
			return(
				<Redirect to={`/user/${this.props.state.username}`} />
			);
		else
			return(
				<div className="homeform">
					<section className="texthead"> Welcome to GitHub </section>
					<section className="textsubhead"> please enter valid GitHub username to continue </section>
					<form onSubmit={this.handleSubmit}>
						<input type="text" className="textinp" name="username" placeholder="Username" ref={(input) => this.username = input}/>
						<button className="buttonsubmit"> Load Files </button>
					</form>
				</div>
			);
	}

}

export default Form;
