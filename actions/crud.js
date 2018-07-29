import { ItemTypes } from './type';

export const fetchItem = (itemId) => ({
	type: ItemTypes.FETCH_ITEM,
	itemId
});

export const fetchItemSuccess = (item) => ({
	type: ItemTypes.FETCH_ITEM_SUCCESS,
	item
});

export const fetchItemError = (error) => ({
	type: ItemTypes.FETCH_ITEM_ERROR,
	error
});

export const fetchAll = () => ({
	type: ItemTypes.FETCH_ALL
});

export const fetchAllSuccess = (items) => ({
	type: ItemTypes.FETCH_ALL_SUCCESS,
	items
});

export const fetchAllError = (error) => ({
	type: ItemTypes.FETCH_ALL_ERROR,
	error
});

export const createNamedAction = (name, fn) => {
	return {
		...fn,
		name
	}
};