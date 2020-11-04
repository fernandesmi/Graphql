const { ApolloServer, gql } = require('apollo-server')

const usuarios= [
    {
        id: 1,
        nome: "João",
        email: "joao@email.com",
        idade: 12,
        perfil_id: 1
    },
    {
        id: 2,
        nome: "Andre",
        email: "andre@email.com",
        idade: 13,
        perfil_id: 2
    },
    {
        id: 3,
        nome: "Maria",
        email: "maria@email.com",
        idade: 15,
        perfil_id: 1
    }
]

const perfis = [
    {
        id: 1,
        nome: "Comum"
    },
    {
        id: 2,
        nome: "Admin"
    }
]

//template string tagged template
const typeDefs = gql`
    #Cria um scalar além dos definidos pelo graphql
    scalar Date

    #tipo definido por mim
    #por não ser um scalar, ao usar em uma query, devem ser passados os campos dele
    type Usuario {
        id: Int!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
        perfil: Perfil

    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float

    }

    type Perfil {
        id: Int!
        nome: String!
    }

    #Pontos de entrada da sua api
    type Query {
        ola: String!
        horaAtual: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]! #obrigatoriamente é um array de inteiros
        usuarios: [Usuario]
        usuario(id: Int): Usuario
        perfis: [Perfil]
        perfil(id: Int): Perfil
    }
`

const resolvers = {

    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        },
        perfil(usuario) {
            const sels = perfis
                        .filter(p => p.id === usuario.perfil_id)
            return sels ? sels[0] : null
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
        },
        numerosMegaSena() {
            const crescente = (a,b) => a - b
            return Array(6).fill(0)
                    .map(() => parseInt(Math.random() * 60 + 1))
                    .sort(crescente)
        },
        usuarios() {
            return usuarios
        },
        usuario(_, {id}) {
            const sels = usuarios
                        .filter(u => u.id === id)
            return sels ? sels[0] : null
        },
        perfis() {
            return perfis
        },
        perfil(_,{id}) {
            const sels = perfis
                        .filter(u => u.id === id)
            return sels ? sels[0] : null
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