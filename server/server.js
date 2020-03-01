const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { kind } = require( 'graphql/language' );



let aboutMessage = "My Company Inventory";

const productDB = [
];


const resolvers={
        Query:{
            about: () =>aboutMessage,
            ProductList,
        },
        Mutation :{
            setAboutMessage,
            ProductAdd,
        },
};

function ProductAdd(_, { product }){
    product.Product_id = productDB.length+1;
    productDB.push(product);
    return product;
}

function setAboutMessage(_, { message }){
    return aboutMessage = message;
}
const server=new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql' , 'utf-8'),
    resolvers,
});

const app = express();
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: fs.userInfo().username }));
server.applyMiddleware({ app, path: '/graphql' });
app.listen(3000, function(){
    console.log('App started on port 3000');
});

function ProductList(){
    //console.log("In product list");
    return productDB;
}