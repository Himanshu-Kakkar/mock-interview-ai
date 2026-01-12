import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser=mutation({
    args:{
        name: v.string(),
        imageUrl: v.string(),
        email: v.string(),
    },
    handler: async(ctx, args) => {
        // If users already exists
        const user = await ctx.db.query('UserTable')
        .filter(q=>q.eq(q.field('email'), args.email)).collect();

        // Else: create new user
        if(user?.length == 0){
            
            const data = {
                name: args.name,
                email: args.email,
                imageUrl: args?.imageUrl,
            }

            const result = await ctx.db.insert('UserTable', {
                ...data
            })
            console.log(result);

            return {
                ...data,
                result,
                //
            }
        }

        return user[0];
    },
})