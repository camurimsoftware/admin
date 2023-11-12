import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const usersRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({
            name: z.string().min(1),
            guest: z.string().min(1),
            document: z.string().min(11),
            referenceNumber: z.number(),
            roomNumber: z.number(),
            startDate: z.string().min(1),
            endDate: z.string().min(1),
            signatureUrl: z.string().min(1),
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(users).values({
                name: input.name,
                guest: input.guest,
                document: input.document,
                referenceNumber: input.referenceNumber,
                roomNumber: input.roomNumber,
                signatureUrl: input.signatureUrl,
                startDate: input.startDate,
                endDate: input.endDate,
            })
        }),
    getUser: publicProcedure.input(z.object({
        document: z.string().min(11),
    })).query(async ({ ctx, input }) => {
        return await ctx.db.query.users.findFirst({
            where: (users, { eq }) => eq(users.document, input.document),
        });
    }),
});
