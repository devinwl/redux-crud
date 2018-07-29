import React from 'react';
import ReactDOM from 'react-dom';

import { ItemTypes } from '../actions/type';
import { 
	fetchItem,
	fetchItemSuccess,
	fetchItemError,
	createNamedAction,
	fetchAll,
	fetchAllSuccess,
	fetchAllError
} from '../actions/crud';
import { reducer, createNamedReducer } from '../reducers/crud';

const initialState = {
	pending: false,
	items: {
		byId: {},
		allIds: []
	},
	response: ''
}

it('should create a fetch action', () => {
	const itemId = '123';
	const expectedAction = {
		type: ItemTypes.FETCH_ITEM,
		itemId
	}
	expect(fetchItem(itemId)).toEqual(expectedAction);
});

it('should create a fetch success action', () => {
	const item = { id: '123', someProp: 'someValue' };
	const expectedAction = {
		type: ItemTypes.FETCH_ITEM_SUCCESS,
		item
	}
	expect(fetchItemSuccess(item)).toEqual(expectedAction);
});

it('should create a fetch error action', () => {
	const error = 'Some error message';
	const expectedAction = {
		type: ItemTypes.FETCH_ITEM_ERROR,
		error
	}
	expect(fetchItemError(error)).toEqual(expectedAction);
});

it('should create a named action', () => {
	const itemId = '456';
	const expectedAction = {
		type: ItemTypes.FETCH_ITEM,
		itemId,
		name: 'custom'
	};
	expect(createNamedAction('custom', fetchItem(itemId))).toEqual(expectedAction);
});

it('should create a fetch all action', () => {
	const expectedAction = {
		type: ItemTypes.FETCH_ALL,
	}
	expect(fetchAll()).toEqual(expectedAction);
});

it('should create a fetch all success action', () => {
	const items = [
		{ id: '123', prop: 'value1' },
		{ id: '456', prop: 'value2' },
		{ id: '789', prop: 'value3' },
	]
	const expectedAction = {
		type: ItemTypes.FETCH_ALL_SUCCESS,
		items
	}
	expect(fetchAllSuccess(items)).toEqual(expectedAction);
});

it('should create a fetch all error action', () => {
	const error = 'error';
	const expectedAction = {
		type: ItemTypes.FETCH_ALL_ERROR,
		error
	}
	expect(fetchAllError(error)).toEqual(expectedAction);
});

it('returns the initial state', () => {
	expect(reducer(undefined, {})).toEqual(initialState);
});

it('handles a fetch action', () => {
	expect(
		reducer(initialState, fetchItem('123'))
	)
	.toEqual(
		{
			...initialState,
			pending: true
		}
	);
});

it('handles a fetch success action', () => {
	const item = { id: '123', name: 'value' };
	const state = reducer(initialState, fetchItem(item.id));
	expect(
		reducer(state, fetchItemSuccess(item))
	)
	.toEqual(
		{
			...state,
			pending: false,
			items: {
				byId: {
					[item.id]: item
				},
				allIds: [
					item.id
				]
			}
		}
	);
});

it('handles a fetch error action', () => {
	const state = reducer(initialState, fetchItem('123'));
	expect(
		reducer(state, fetchItemError('error'))
	)
	.toEqual(
		{
			...state,
			pending: false,
			response: 'error'
		}
	);
});

it('should create a named reducer', () => {
	const action = createNamedAction('custom', fetchItem('789'));
	const r = createNamedReducer('custom', reducer);
	expect(
		r(initialState, action)
	)
	.toEqual(
		{
			...initialState,
			pending: true
		}
	)
});

it('handles a fetch all action', () => {
	expect(
		reducer(initialState, fetchAll())
	)
	.toEqual(
		{
			...initialState,
			pending: true
		}
	);
});

it('handles a fetch all success action', () => {
	const items = [
		{ id: '123', name: 'value11' },
		{ id: '456', name: 'value2' },
		{ id: '789', name: 'value3' }
	];
	const state = reducer(initialState, fetchAll());
	expect(
		reducer(state, fetchAllSuccess(items))
	)
	.toEqual(
		{
			...state,
			pending: false,
			items: {
				byId: {
					...items.reduce( (byIdObj, item) => { 
						byIdObj[item.id] = item;
						return byIdObj }, {})
				},
				allIds: [
					...items.map(item => item.id)
				]
			}
		}
	);
});

it('handles a fetch all error action', () => {
	const state = reducer(initialState, fetchAll());
	expect(
		reducer(state, fetchAllError('error'))
	)
	.toEqual(
		{
			...state,
			pending: false,
			response: 'error'
		}
	);
});