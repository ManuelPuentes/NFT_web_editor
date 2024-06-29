import { z } from 'zod';

export const creatCollectionSchema = z.object({
    collectionName: z.string().min(5),
    collectionAssets:
        z.instanceof(File, { message: 'Please upload a file.' }).refine((f) => f.type === 'application/zip', "provided file is invalid")
});


export type creatCollectionSchema = typeof creatCollectionSchema;