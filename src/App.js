import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Container from './components/ContainerComponent';

function App() {
	return (
		<BrowserRouter>
			<div className="main">
				<div className="wrapper">
					<div className="intro">
						<Container />
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
