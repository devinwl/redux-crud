import { combineReducers } from 'redux';

import { ItemTypes } from '../actions/type';

const initialState = {
	pending: false,
	items: {
		byId: {},
		allIds: []
	},
	response: ''
}

export const pending = (state = initialState.pending, action) => {
	switch(action.type) {

		case ItemTypes.FETCH_ITEM:
		case ItemTypes.FETCH_ALL:
			return true;

		case ItemTypes.FETCH_ITEM_SUCCESS:
		case ItemTypes.FETCH_ITEM_ERROR:
		case ItemTypes.FETCH_ALL_SUCCESS:
		case ItemTypes.FETCH_ALL_ERROR: {
			return false;
		}

		default:
			return state;
	}
}

export const byId = (state = initialState.items.byId, action) => {
	switch (action.type) {
		case ItemTypes.FETCH_ITEM_SUCCESS: {
			return {
				...state,
				[action.item.id]: action.item
			}
		}

		case ItemTypes.FETCH_ALL_SUCCESS: {
			return {
				...action.items.reduce( (byIdObj, item) => { 
					byIdObj[item.id] = item;
					return byIdObj }, {})
			}
		}

		default:
			return state;
	}
}

export const allIds = (state = initialState.items.allIds, action) => {
	switch (action.type) {
		case ItemTypes.FETCH_ITEM_SUCCESS: {
			return Array.from(new Set([ ...state, action.item.id ]));
		}

		case ItemTypes.FETCH_ALL_SUCCESS: {
			return [ ...action.items.map(item => item.id)];
		}

		default:
			return state;
	}
}

export const items = combineReducers({
	byId,
	allIds
});

export const response = (state = initialState.response, action) => {
	switch(action.type) {

		case ItemTypes.FETCH_ITEM_ERROR:
		case ItemTypes.FETCH_ALL_ERROR: {
			return action.error
		}

		default:
			return state;
	}
}

export const reducer = combineReducers({
	pending,
	items,
	response
});

export const createNamedReducer = (reducerName, reducer) => {
	return (state, action) => {
		const { name } = action;
		const isInitializationCall = state === undefined;
        if ( name !== reducerName && !isInitializationCall ) return state;

		return reducer(state, action);
	}
}