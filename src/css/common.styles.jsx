import styled from 'styled-components';
import Divider from '../components/divider/divider-with-text';

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 2.5px rgba(15, 15, 15, 0.19);
  align-items: center;
`;

export const MutedLink = styled.p`
  font-size: 12px;
  color: rgba(100, 100, 100, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 12px;
  color: rgb(52, 152, 219);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0 10px;
  border-bottom: 2px solid rgba(200, 200, 200, 0.3);
  transition: all 200ms ease-in-out;
  font-size: 12px;

  &::placeholder {
    color: rgba(100, 100, 100, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(52, 152, 219);
  }
`;

export const Submit = styled.button`
  width: 80%;
  padding: 11px 40px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(52, 152, 219);
  background: linear-gradient(57deg, rgba(52, 152, 219, 1) 20%, rgba(18, 145, 171, 1) 100%);

  &:hover {
    filter: brightness(1.03);
  }
`;