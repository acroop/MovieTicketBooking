import { z } from "zod";

export const createMovieZodSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    duration: z.string(),
    genre: z.array(z.string()).nonempty("Atleast one Genre is required"),
    releaseDate: z.string().transform((date) => new Date(date)),
    languages: z.array(z.string()).nonempty("Atleast one Language is required"),
    certification: z.string(),
    posterUrl: z.string().url("Poster URL must be a valid URL"),
    rating: z.number().min(0).max(10, "Rating must be between 0 and 10"),
    votes: z.number().min(0, "Votes must be a non-negative number"),
    format: z.array(z.string()).default(["2D"])
});

export type MovieInput = z.infer<typeof createMovieZodSchema>;