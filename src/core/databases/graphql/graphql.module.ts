import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
    imports: [
        NestGraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            playground: process.env.NODE_ENV !== 'production',
            debug: process.env.NODE_ENV !== 'production',
            context: ({ req, res }) => ({ req, res }),
            formatError: (error) => ({
                message: error.message,
                code: error.extensions?.code,
                path: error.path,
            }),
        })
    ],
    exports: [NestGraphQLModule],
})
export class GraphQLModule { }