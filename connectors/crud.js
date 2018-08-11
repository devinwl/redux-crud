import { connect } from 'react-redux';

import {
	fetchItem
} from '../actions/crud';

import {
	getAllItems
} from '../reducers/crud';

export const crudConnector = c => {
	return connect(
		state => ({
			items: getAllItems(state)
		}),
		dispatch => ({
			fetchItem: (itemId) => dispatch(fetchItem(itemId))
		})
	)(c);
}