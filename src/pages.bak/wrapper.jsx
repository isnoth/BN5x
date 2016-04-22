/*
This is our top-level component. Sub-components matching specific routes will be
contained in `this.props.children` and rendered out.
*/

import React, { Component } from 'react';
import Feedbackpanel from './components/feedbackpanel';
import Pomodario from "./components/pomodario"

export default class Wrapper extends Component {
	render() {
		return (
			<div className="wrapper">
				<div className="center">
					<Feedbackpanel />
					{this.props.children}
          <Pomodario />
				</div>
			</div>
		);
	}
}
