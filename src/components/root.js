import React, { Component, PropTypes} from 'react';
import { Route, Router } from 'react-router';
import { Provider } from 'react-redux';
//import store from './store';
//import actions from './actions';
//import Wrapper from './pages/wrapper';
//import Articles from './pages/articles';
import Tree from "./tree/tree";
import Stat from "./stat/stat";


export class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };


  /*
	componentWillMount() {
		//store.dispatch(actions.startListeningToArticles());
	}
  */

	render() {
    const { store } = this.props;

		return (
			<Provider store={store}>
				<Router>
					<Route path="/" component={Tree}>
          {/*<IndexRoute component={Articles} />*/}
					</Route>
          <Route path="tree" component={Tree} />
          <Route path="stat" component={Stat} />
				</Router>
			</Provider>
		);
	}
}

