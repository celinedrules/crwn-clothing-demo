import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { ButtonContainer, InventoryButton } from './inventory.styles';
import AddItems from '../../components/inventory/add-items/add-items.component';
import ViewItems from '../../components/inventory/view-items/view-items.component';
import CreateItems from '../../components/inventory/create-items/create-items.component';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

const InventoryPage = ({ fetchCollectionsStart, match, collections }) =>
{
	const [active, setActive] = useState('Add');
	useEffect(() =>
	{
		fetchCollectionsStart();
	}, [fetchCollectionsStart]);

	const setView = event =>
	{
		const { value, name } = event.target;
		switch (name)
		{
			case 'Add':
				setActive('Add');
				break;
			case 'View':
				setActive('View');
				//console.log(collections)
				break;
			case 'Create':
				setActive('Create');
				break;
		}


	};

	return (
		<>
			<div>
				<ButtonContainer>
					<InventoryButton name={'Add'} style={{ backgroundColor: '#f14e4e' }} onClick={setView}>Add to
						Stock</InventoryButton>
					<InventoryButton name={'View'} style={{ backgroundColor: '#4e9af1' }} onClick={setView}>View
						Inventory</InventoryButton>
					<InventoryButton name={'Create'} style={{ backgroundColor: '#84f14e' }} onClick={setView}>Create New
						Product</InventoryButton>
				</ButtonContainer>
			</div>
			<div>
				{active === 'Add' && (<AddItems />)}
				{active === 'View' && (<ViewItems collections={collections} />)}
				{active === 'Create' && (<CreateItems />)}
			</div>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	collections: selectCollectionsForPreview,
})

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPage);