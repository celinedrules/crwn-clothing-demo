import ShopActionTypes from './shop.types';

// Don't know that I need this as it's in shop.sagas.js
export const fetchCollectionsStart = collectionsMap => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap,
});

export const fetchCollectionsFailure = errorMessage => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage,
});
