import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { NavTabs } from '../../NavTabs';
import styled from 'styled-components';
import Classes from './Classes';
import Subjects from './Subjects';

const Container = styled.div``;

const Masters = () => {
	const [tabLinks, setTabLinks] = useState({
		1: { name: 'Classes', value: '/masters/classes' },
		2: { name: 'Subjects', value: '/masters/subjects' },
		3: { name: 'Fees', value: '/masters/fees' },
		4: { name: 'Assessments', value: '/masters/assessments' },
	});

	return (
		<Container>
			<NavTabs links={tabLinks} />

			<Switch>
				<Route path="/masters/classes" component={Classes} />
				<Route path="/masters/subjects" component={Subjects} />
			</Switch>
		</Container>
	);
};

export default Masters;
