 const expect = require('chai').expect;
 const server = require('../app');
 const request = require('supertest');
 const app = request.agent(server);


 //unit testing for signup 
describe("/post request testing for blanck username used for signup feature", function(){
    it("it should return response status code 200 if username field is blanck", function(done){
        app.post('/auth/signup').send({
            username:' ',
            email:'asiful@gmail.com',
            password:'123456',
            cpassword:'123456'
            

        })
        .end((err,res)=>{
            //200 means success
            expect(res.statusCode).to.equal(200)
        })
        done();
    })

    

} ),


describe("/post request testing for blanck email", function(){
    it("it should return reponse status code 200 if email field is blanck", function(done){
        app.post('/auth/signup').send({
            username:'asiful',
            email:'',
            password:'123456',
            cpassword:'123456'
            

        })
        .end((err,res)=>{
            //200 means success
            expect(res.statusCode).to.equal(200)
        })
        done();
    })

    

} ),


describe("/post request testing if password don't match", function(){
    it("it should return response status code 200 if pass don't match", function(done){
        app.post('/auth/signup').send({
            username:'asiful',
            email:'asiful@gmail.com',
            password:'123456',
            cpassword:'1234567'
            

        })
        .end((err,res)=>{
            //200 means success
            expect(res.statusCode).to.equal(200)
        })
        done();
    })

    

} ),


//unit testing for login 
describe("/post request testing login an account ", function(){
    it("it should return response status code 200 if password blanck", function(done){
        app.post('/auth/login').send({
            
            email:'asiful@gmail.com',
            password:'',
            
            

        })
        .end((err,res)=>{
            //200 means success
            expect(res.statusCode).to.equal(200)
        })
        done();
    })

    

} ),


describe("/post request testing login an account ", function(){
    it("it should return response status code 200 if email wrong", function(done){
        app.post('/auth/login').send({
            
            email:'asifulll@gmail.com',
            password:'123456',
            
            

        })
        .end((err,res)=>{
            //200 means success
            expect(res.statusCode).to.equal(200)
        })
        done();
    })

    

} )







