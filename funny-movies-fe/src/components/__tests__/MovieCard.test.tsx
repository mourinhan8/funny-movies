// import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import MovieCard from "../MovieCard";
import { server } from '../../mocks/node';
import HomePage from '../../pages/homePage';
import { BrowserRouter as Router } from "react-router-dom";

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen()
});


afterEach(() => {
  server.resetHandlers()
  cleanup();
});

afterAll(() => {
  server.close();
})

test('should render MovieCard', () => {
  const movieData = {
    id: '1',
    title: 'Movie 1',
    url: 'https://example.com/movie1',
    sharedBy: 'test@example.com',
    liked: true,
    disliked: false,
    likes: 10,
    dislikes: 5,
    description: 'This is movie 1',
    isAuth: true
  };
  render(<MovieCard {...movieData} />);
  expect(screen.getByText('Movie 1')).toBeInTheDocument();
  expect(screen.getByText('Shared by: test@example.com')).toBeInTheDocument();
  expect(screen.getByText('Description: This is movie 1')).toBeInTheDocument();
});

test('HomePage', async () => {
  render(
    <Router>
      <HomePage likedMovies={[]} dislikedMovies={[]} isAuth={false} />
    </Router>
  );

  await waitFor(() => {
    expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
    expect(screen.queryByText('Shared by: test@example.com')).not.toBeInTheDocument();
  });
});