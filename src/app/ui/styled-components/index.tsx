"use client";

import styled from 'styled-components';
import Link from "next/link";

export const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(to bottom, white, #e5e7eb);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
`;

export const StyledLoader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  transition: color 0.2s;
  color: inherit;

  &:hover {
    color: #3b82f6;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  input {
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  input:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const ErrorText = styled.p`
  color: #d9534f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const PasswordErrorList = styled.ul`
  margin-top: 0.5rem;
  padding-left: 1rem;
  list-style: disc;
  color: #d9534f;
  font-size: 0.875rem;
`;

export const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: ${props => (props.disabled ? '#ccc' : '#007bff')};
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#0056b3')};
  }
`;
