import React from 'react';
import { useTable } from 'react-table';
import { Cells, ColumnHeader, DeleteButton, EditButton, TableContainer } from './view-items.styles';

const ViewItems = () =>
{
	const editProduct = (value) =>{
		alert(value.productName)
	}
	
	const data = React.useMemo(
		() => [
			{
				itemNum: '1',
				productName: 'Men\'s Blue Shirt',
				productDesc: 'Nice Blue T-Shirt',
				price: '$24.99',
				onHand: '9',
				category: 'Men\'s',
				edit: <EditButton onClick={() => editProduct(data[0])}>Edit</EditButton>,
				delete: <DeleteButton>Delete</DeleteButton>,
			},
			{
				itemNum: '2',
				productName: 'Girl\'s Green Hoodie',
				productDesc: 'Lightweight Sweatshirt',
				price: '$39.99',
				onHand: '16',
				category: 'Girl\'s',
				edit: <EditButton onClick={() => editProduct(data[1])}>Edit</EditButton>,
				delete: <DeleteButton>Delete</DeleteButton>,
			},
			{
				itemNum: '3',
				productName: 'Boy\'s Nike Jordan\'s',
				productDesc: 'Expensive Shoes',
				price: '$239.99',
				onHand: '1',
				category: 'Boy\'s Shoes',
				edit: <EditButton onClick={() => editProduct(data[2])}>Edit</EditButton>,
				delete: <DeleteButton>Delete</DeleteButton>,
			},
		], [],
	);

	const columns = React.useMemo(
		() => [
			{
				Header: '#',
				accessor: 'itemNum', // accessor is the "key" in the data
			},
			{
				Header: 'Product Name',
				accessor: 'productName',
			},
			{
				Header: 'Description',
				accessor: 'productDesc',
			},
			{
				Header: 'Price',
				accessor: 'price',
			},
			{
				Header: 'On Hand',
				accessor: 'onHand',
			},
			{
				Header: 'Category',
				accessor: 'category',
			},
			{
				Header: 'Edit',
				accessor: 'edit',
			},
			{
				Header: 'Delete',
				accessor: 'delete',
			},
		], [],
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data });

	return (
		<TableContainer>
			<table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
				<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<ColumnHeader {...column.getHeaderProps()}>{column.render('Header')}</ColumnHeader>
						))}
					</tr>
				))}
				</thead>
				<tbody {...getTableBodyProps()}>
				{rows.map(row =>
				{
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell =>
							{
								return (
									<Cells{...cell.getCellProps()}>{cell.render('Cell')}</Cells>
								);
							})}
						</tr>
					);
				})}
				</tbody>
			</table>
		</TableContainer>
	);
};

export default ViewItems;