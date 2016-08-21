import React, { Component, PropTypes} from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
//import store from './store';
//import actions from './actions';
//import Wrapper from './pages/wrapper';
//import Articles from './pages/articles';
import NavApp from './nav/nav';
import Flat from "./tree/tree";
import Flat2 from "./flat/flat";
import Stat from "./stat/stat";
import Pomodario from "./pomodario/pomodario";
import Articles from "./article/articles";
import TestApp from "./test";
import Tree2 from "./tree2";
import MyFirstGrid from "./tree2";
import Files from "./files/files";
import Desciption from "./files/description";

import Test2 from "./test2";
import Login from "./login";
import TestVis from "./testVis";
import TestVis2 from "./testVis2";
import TestGrid from "./testGrid";
import Register from "./createUser";


class Wrap extends Component {
  render(){
    return (
      <div>
        <NavApp/>
        {this.props.children}
      </div>
    )
  }
}


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
					<Route path="/" component={Wrap}>
            <IndexRoute component={Files} />
            <Route path="stat" component={Stat} />
            <Route path="pomodario" component={Pomodario} />
            <Route path="articles" component={Articles} />
            <Route path="test" component={TestApp} />
            <Route path="test2" component={Test2} />
            <Route path="tree2" component={Tree2} />
            <Route path="testVis" component={TestVis} />
            <Route path="testVis2" component={TestVis2} />
            <Route path="testGrid" component={TestGrid} />
            <Route path="resize" component={MyFirstGrid} />
            <Route path="login" component={Login} />
            <Route path="register" component={Register} />
            <Route path="files" component={Files} >
              <Route path="/files/:id" component={Flat2} />
            </Route>
					</Route>
				</Router>
			</Provider>
		);
	}
}

