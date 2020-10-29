export type Config = {
    hasuraUrl: string;
};

export const config: Config = {
    hasuraUrl: process.env.HASURA_URL || 'http://localhost:8080/v1/graphql'
};
