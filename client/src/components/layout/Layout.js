import React, { Fragment } from 'react';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Content from './Content';

const Layout = (props) => {
	return (
		<Fragment>
			<Navbar />
			<Sidebar />
			<Content />
		</Fragment>
	);
};

export default Layout;
