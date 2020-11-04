const { ApolloServer, gql } = require('apollo-server')

//template string tagged template
const typeDefs = gql`
    #Pontos de entrada da sua api
    type Query {
        ola: String
        horaAtual: String!
    }
`

const resolvers = {
    Query: {
        ola() {
            return 'AAAAA'
        },
        horaAtual() {
            return `${new Date}`;
        }
    }

}

const server = new ApolloServer({
    typeDefs, 
    resolvers
});

server.listen().then(({url}) => {
    console.log(`Executando em ${url}`)
})