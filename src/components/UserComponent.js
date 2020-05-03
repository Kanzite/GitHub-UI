import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

class User extends Component {

	constructor(props) {
		super(props);

		this.state={
			baseurl: 'https://api.github.com/users/' + this.props.state.username + '/repos',
			repourl: 'https://api.github.com/repos/' + this.props.state.username, 
			repos: '',
			list: '',
			show: false,
			showfile: false
		}

		this.backFn = this.backFn.bind(this);
	}

	renderFiles(name) {
		var url=this.state.repourl + '/' + name + '/contents';
		fetch(url)
			.then(response => response.json())
			.then(files => {
				var element = {
					name: name,
					files: files
				}
				this.setState({
					list: element,
					showfile: true
				})
			});

	}

	renderData() {
		if(this.state.showfile === true) {
			if(this.state.list.files.length === 0)
				return <section className="textsubhead"> No Files Found! </section>
			else
				return(this.state.list.files.map((file, i) => (
					<CSSTransition key = {i} in={true} classNames="fade" enter={false} exit={false} appear={true} timeout={1000}>
						<section key={i} className="repo"> {file.name} </section>
					</CSSTransition>
				)));
		}
		else {
			if(this.state.show === true) {
				if(this.state.repos.length === 0)
					return <section className="textsubhead"> No Repositories Found! </section>
				else if(this.state.repos.length > 0)
					return(this.state.repos.map((repo, i) => (
						<CSSTransition key = {i} in={true} classNames="fade" enter={false} exit={false} appear={true} timeout={1000}>
							<section key={i} className="repo" onClick={this.renderFiles.bind(this, repo.name)}> {repo.name} </section>
						</CSSTransition>
					)));
				else
					return <section className="texthead"> Username Invalid! </section>
			}
			else
				return <section className="textsubhead"> Loading... </section>
		}
	}

	componentDidMount() {
		fetch(this.state.baseurl)
			.then(response => response.json())
			.then(repos => this.setState({ repos: repos, show: true }));
	}

	backFn() {
		if(this.state.showfile === true)
			this.setState({
				showfile: false
			})
		else
			this.props.returnDefault();
	}

	render() {
		if(this.props.state.username.length === 0)
			return(
				<Redirect to={'/home'} />
			);
		else
			return(
				<div className="userhome">
					<section className="texthead user"> Welcome, {this.props.state.username}</section>
					<section className="textsubhead"> click on repository to view files </section>
					<input type="button" className="buttonmove" value="Back" onClick={this.backFn} />
					<section className="repohome">
						{ this.renderData() }
					</section>
				</div>
			);
	}

}

export default User;
