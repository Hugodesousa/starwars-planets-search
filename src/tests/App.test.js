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

  const filterNumber = screen.getByRole('button', {
    name: /acionar o filtro/i
  })
  const removeFilter = screen.getByRole('button', {
    name: /remover todas filtragens/i
  })
  expect(filterNumber && removeFilter).toBeInTheDocument();

  userEvent.click(filterNumber)
  const X = screen.getByRole('button', {
    name: /x/i
  })
  userEvent.click(X)
  expect(X).not.toBeInTheDocument();

  userEvent.click(filterNumber)
  const XX = screen.getByRole('button', {
    name: /x/i
  })
  expect(XX).toBeInTheDocument();
  userEvent.click(removeFilter)
  expect(XX).not.toBeInTheDocument();
});
