import type { Prisma } from "../generated/prisma/client";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;

// Show type with its related Movie and Theater
type ShowWithRelations = Prisma.ShowGetPayload<{
  include: {
    movie: true;
    theater: true;
  };
}>;

// Grouped show structure
type GroupedShow = {
  movie: ShowWithRelations["movie"];
  theater: {
    theaterDetails: ShowWithRelations["theater"];
    shows: Array<{
      _id: string;
      date: string;
      startTime: string;
      format: string;
      audioType: string;
    }>;
  };
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate seat layout
export const generateSeatLayout = () => {
  return [
    {
      row: "E",
      rowOrder: 0,
      type: "PREMIUM",
      price: 510,
      seats: Array.from({ length: 10 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE" as const,
      })),
    },
    {
      row: "D",
      rowOrder: 1,
      type: "EXECUTIVE",
      price: 290,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE" as const,
      })),
    },
    {
      row: "C",
      rowOrder: 2,
      type: "EXECUTIVE",
      price: 290,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE" as const,
      })),
    },
    {
      row: "B",
      rowOrder: 3,
      type: "EXECUTIVE",
      price: 290,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE" as const,
      })),
    },
    {
      row: "A",
      rowOrder: 4,
      type: "NORMAL",
      price: 180,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE" as const,
      })),
    },
  ];
};

// Group shows by theater and movie
export const groupShowsByTheatreAndMovie = (
  shows: ShowWithRelations[]
): GroupedShow[] => {
  const grouped: Record<string, GroupedShow> = {};

  shows.forEach((show) => {
    const key = `${show.movieId}_${show.theaterId}`;

    if (!grouped[key]) {
      grouped[key] = {
        movie: show.movie,
        theater: {
          theaterDetails: show.theater,
          shows: [],
        },
      };
    }

    grouped[key].theater.shows.push({
      _id: show.id,
      date: show.date,
      startTime: show.startTime,
      format: show.format,
      audioType: show.audioType,
    });
  });

  return Object.values(grouped);
};