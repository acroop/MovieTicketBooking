import prisma from "../../utils";
import { Prisma } from "../../generated/prisma/client";

export type CreateMovieInput = Prisma.MovieCreateInput;

// 1. Create Movie
export const createMovie = async (movieData: CreateMovieInput) => {
  return await prisma.movie.create({
    data: movieData,
  });
};

// 2. getMovies
export const getAllMovies = async () => {
  return await prisma.movie.findMany({ orderBy: {releaseDate: 'desc'} });
};

// 3. getMovieById
export const getMovieById = async (movieId: string) => {
  return await prisma.movie.findUnique({
    where: { id: movieId },
  });
};

// 4. getTopMovieByVotes
export const getTopMovieByVotes = async () => {
  return await prisma.movie.findMany({
    orderBy: { votes: "desc" },
    take: 10,
  });
}