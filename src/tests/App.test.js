import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('I am your test', () => {
  render(<App />);
  const linkElement = screen.getByText(/StarWars Planets/i);
  expect(linkElement).toBeInTheDocument();
});

test('Testa input de filtros', async () => {
  render(<App />);
  const inputFilterText = screen.getByPlaceholderText(/Pesquisar/i);
  expect(inputFilterText).toBeInTheDocument();
  const selectColumn = screen.getByTestId("column-filter")
  const comparison = screen.getByTestId("comparison-filter")
  expect(selectColumn && comparison).toBeInTheDocument();

  
  await waitFor(() => {
    const loading = screen.queryByText("loading")
    expect(loading).not.toBeInTheDocument();

  })

  userEvent.type(inputFilterText, 'T') 
  const planetshearch = await screen.findByText(/Tatooine/i);
  expect(planetshearch).toBeInTheDocument();
});
