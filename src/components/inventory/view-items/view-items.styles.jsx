import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 25px;
`;

export const EditButton = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #f14e4e;
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;

  &:hover {
    background: #434343;
  }

  &:focus {
    outline: none;
  }
`;

export const DeleteButton = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #4e9af1;
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;

  &:hover {
    background: #434343;
  }

  &:focus {
    outline: none;
  }
`;

export const ColumnHeader = styled.th`
  background: aliceblue;
  color: black;
  font-weight: bold,
`;

export const Cells = styled.td`
  padding: 10px;
  border: solid 1px gray;
  background: papayawhip;
`;	