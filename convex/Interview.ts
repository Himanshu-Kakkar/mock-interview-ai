import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const SaveInterviewQuestion = mutation({
    args: {
        question: v.any(),
        uid: v.id('Usertable'),
        resumeUrl: v.string()
    },
    handler: async (convexToJson, args) => {
        const result = await ctx.db.insert('InterviewSessionTable', {
            interviewQuestions: args.questions,
            resumeUrl: args.resumeUrl,
            userId: args.uid,
            status: 'draft'
        });
        return result;
    }
})