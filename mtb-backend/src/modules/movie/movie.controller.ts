import { NextFunction, Request, Response } from "express";
import * as MovieService from "./movie.service";

export const createMovieController = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try{
        const movie = await MovieService.createMovie(req.body);
        res.status(201).json(movie);
    } catch (error){
        next(error);
    }
}

export const getAllMoviesController = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try{
        const movies = await MovieService.getAllMovies();
        res.status(200).json(movies);
    } catch (error){
        next(error);
    }   
}

export const getMovieByIdController = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try{
        const movie = await MovieService.getMovieById(req.params.id);
        if(!movie){
            res.status(404).json({ message: "Movie not found" });
            return
        }
        res.status(200).json(movie);
        
    } catch (error){
        next(error);
    }
}

export const getTopMovieByVotesController = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try{
        const movies = await MovieService.getTopMovieByVotes();
        res.status(200).json(movies);
        return
    } catch (error){
        next(error);
    }
}