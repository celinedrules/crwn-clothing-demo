import React, { useState } from 'react';
import { useSortBy, useTable } from 'react-table';
import { Cells, ColumnHeader, DeleteButton, EditButton, TableContainer } from './view-items.styles';

const EditData = ({ values }) => {
	return (
		<>
			{values.map((item, index) => {
				return (
					<button>Edit</button>
				);
			})}
		</>
	);
};

const ViewItems = ({ collections }) => {
	const [data] = useState(React.useMemo(() => {
		let init = new Array(0);

		for (let i = 0; i < collections.length; i++) {
			Object.entries(collections[i]).map(([key, value]) => {
				if (Array.isArray(value)) {
					for (let j = 0; j < value.length; j++) {
						value[j].description = collections[i].title + ' ' + value[j].name;
						value[j].category = collections[i].title;
						value[j].price = `$${value[j].price}`;
						value[j].onHand = Math.floor((Math.random() * 99) + 1);
						init.push(value[j]);
					}
				}
			});
		}

		return init;
	}, []));

	const handleEdit = (value) => {
		console.log(value);
	};

	const handleDelete = (value) => {
		console.log(value);
	};

	const columns = React.useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
			},
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'Description',
				accessor: 'description',
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
				accessor: '',
				Cell: ({ cell }) => <EditButton onClick={() => handleEdit(cell.row.values)}>Edit</EditButton>,
			},
			{
				Header: 'Delete',
				accessor: '',
				Cell: ({ cell }) => <DeleteButton onClick={() => handleDelete(cell.row.values)}>Delete</DeleteButton>,
			},
		], [],
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data }, useSortBy);

	return (
		<TableContainer>
			<table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
				<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<ColumnHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render('Header')}
								{/*{*/}
								{/*	<span>*/}
								{/*		{column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}*/}
								{/*	</span>*/}
								{/*}*/}
							</ColumnHeader>
						))}
					</tr>
				))}
				</thead>
				<tbody {...getTableBodyProps()}>
				{rows.map(row => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
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