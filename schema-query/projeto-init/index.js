const { ApolloServer, gql } = require('apollo-server')

//template string tagged template
const typeDefs = gql`
    #Cria um scalar além dos definidos pelo graphql
    scalar Date

    #tipo definido por mim
    #por não ser um scalar, ao usar em uma query, devem ser passados os campos dele
    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean

    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float

    }

    #Pontos de entrada da sua api
    type Query {
        ola: String!
        horaAtual: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
    }
`

const resolvers = {

    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Produto: {
        precoComDesconto(produto) {
            if(produto.desconto) return produto.preco * (1 - produto.desconto);
        }
    },
    Query: {
        ola() {
            return 'AAAAA'
        },
        horaAtual() {
            return new Date
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: 'Ana da Web',
                email: 'anadaweb@email.com',
                idade: 23,
                salario_real: 1234.56,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Banana',
                preco: 2.99,
                desconto: .5
            }
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