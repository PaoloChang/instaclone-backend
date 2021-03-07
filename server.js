require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './schema';
import { getUser, protectedResolver } from './users/users.utils';

const PORT = process.env.PORT;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
            protectedResolver,
        };
    }
});

server
    .listen(PORT)
    .then(() => 
        console.log(`🚀 Server is running on http://localhost:${PORT} ✅`)
    );