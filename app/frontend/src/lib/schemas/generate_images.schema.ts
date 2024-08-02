import { z } from 'zod';

export const generateImagesSchema = z.object({
	imagesAmount: z.number().positive().max(20).default(5)
});

export type generateImagesSchema = typeof generateImagesSchema;
