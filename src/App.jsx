import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import actions from './actions';
import Wrapper from './pages/wrapper';
import Articles from './pages/articles';
import tree from "./compoments/tree";


export class App extends Component {
	componentWillMount() {
		store.dispatch(actions.startListeningToArticles());
	}
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Route path="/" component={Wrapper}>
						<IndexRoute component={Articles} />
					</Route>
          <Route path="about" component={tree} />
				</Router>
			</Provider>
		);
	}
}
