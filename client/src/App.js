// Basics
import React, { useEffect, Fragment } from 'react';
import { SnackbarProvider } from 'notistack';

// Layout Components
import Alert from './components/layout/Alert';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

// Styled Components
import styled, { ThemeProvider } from 'styled-components';
import bcg from './assets/img/background.jpg';

import Layout from './components/layout/Layout';

const theme = {
	primary: '#26304A',
	secondary: '#314065',
	primaryGreen: '#289BBA',
	primaryRed: '#F80117',
	primaryOrange: '#FFB800',
	primaryBackplate: 'rgba(49, 64, 101, 0.9)',
	tertiary: '#BA5B94',
	gradient_simple_red: 'rgba(248, 1, 23, 0.6)',
	gradient_simple_red_hover: 'rgba(248,1,23,0.7)',
	gradient_simple_green: 'rgba(40, 155, 186, 0.4)',
	gradient_simple_orange: 'rgba(251, 148, 22, 0.5)',
	gradient_simple_primary: 'rgba(38, 48, 74, 0.8)',
};

const Container = styled.div`
	position: fixed;
	z-index: -1;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			170deg,
			rgba(38, 48, 74, 0.54),
			rgba(38, 48, 74, 1)
		),
		url(${bcg});
	background-size: cover;
`;

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Fragment>
				<ThemeProvider theme={theme}>
					<Container />
					<Layout />
					<SnackbarProvider maxSnack={10}>
						<Alert />
					</SnackbarProvider>
				</ThemeProvider>
			</Fragment>
		</Provider>
	);
};

export default App;
