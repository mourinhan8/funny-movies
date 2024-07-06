import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import MovieCard from '../../components/MovieCard';
import { Movie } from '../../utils/type';
import axios from '../../utils/axios';

const PAGE_LIMIT = 3;

interface HomePageProps {
  likedMovies: string[];
  dislikedMovies: string[];
  isAuth: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
const HomePage: React.FC<HomePageProps> = ({ likedMovies, dislikedMovies, isAuth }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const fetchListMovies = async (page: number) => {
    try {
      const response = await axios.get(`/movie?page=${page}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMovies(response.data.data.map((movie: any) => ({
        id: movie._id,
        title: movie.title,
        url: movie.url,
        sharedBy: movie.sharedBy.email,
        liked: likedMovies?.includes(movie._id) ? true : false,
        disliked: dislikedMovies?.includes(movie._id) ? true : false,
        likes: movie.likes,
        dislikes: movie.dislikes,
        description: movie.description || '',
      })));
      setTotal(response.data.paging.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListMovies(page);
  }, [page]);


  return (
    <>
      <div className="p-4 mb-2">
        {movies.map((movie, index) => (
          <MovieCard key={index} isAuth={isAuth} {...movie} />
        ))}
      </div>
      <Pagination
        align="center"
        defaultCurrent={1}
        current={page}
        total={total}
        onChange={handlePageChange}
        pageSize={PAGE_LIMIT}
      />
    </>

  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(HomePage);
