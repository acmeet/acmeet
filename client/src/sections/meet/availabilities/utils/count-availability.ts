import type { AvailabilityGrid } from "../../types";

export const countAvailability = (availabilityGrids: AvailabilityGrid[], i: number, j: number) => {
  return availabilityGrids.reduce((accum, cur) => accum + cur[i][j], 0);
}