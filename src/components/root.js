import React, { Component, PropTypes} from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import NavApp from './nav/nav';
import Pomodario from "./pomodario/pomodario";
import TestApp from "./test";

import Test2 from "./test2";
import Login from "./login";
import Register from "./createUser";
import {AboutUs} from "./aboutus";

import MdWrap from "./md/mdWrap";
import Md from "./md";
import Newflat from "./flat/newFlat";


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
            <IndexRoute component={AboutUs} />
            <Route path="pomodario" component={Pomodario} />
            <Route path="test" component={TestApp} />
            <Route path="test2" component={Test2} />
            <Route path="login" component={Login} />
            <Route path="register" component={Register} />
            <Route path="aboutus" component={AboutUs} />
            <Route path="md" component={MdWrap} >
              <Route path="/md/:id" component={Md} />
            </Route>
            <Route path="newFlat" component={Newflat} >
              <Route path="/newFlat/:id" component={Newflat} />
            </Route>

					</Route>
				</Router>
			</Provider>
		);
	}
}

