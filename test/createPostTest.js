var expect = require('chai').expect;
var server = require('../app');
var request = require('supertest');
var app = request.agent(server);




/**
 * expected status code 200 for loading create post page
 */
describe("/GET testing loading create post page",function(){
    
  it('it should return status code 200 for loading create post page', (done) => {
        app.get('/posts/createPost')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
            done()
        })
})
}),

/**
 * expected status code 302 for successfully posting a post
 */

describe("/POST Testing create post with all information",function(){
  it('post have been successfully posted and return status code 302',function(done){
    app.post('/posts/createPost').send({
      title:'himel123',
      body:'himel123@gmail.com',
      tags:'12345',
      thumbnail:''
    })
    .end((err,res)=>{
      expect(res.statusCode).to.equal(302)
     
    })
    done()
  })
}),

  /**
   * expected status code 400 if post title not provided
   */
 describe("/POST Testing create post without title",function(){
  it('it should return 400 status code if post without title',function(done){
    app.post('/posts/createPost').send({
      title:'',
      body:'himel123@gmail.com',
      tags:'12345',
      thumbnail:''
    })
    .end((err,res)=>{
      expect(res.statusCode).to.equal(400)
     
    })
    done()
  })
   }),


  /**
   * expected status code 400 if post body not provided
   */
   describe("/POST Testing create post without body",function(){
  it('it should return 400 status code if post without body',function(done){
    app.post('/posts/createPost').send({
      title:'himel',
      body:'',
      tags:'12345',
      thumbnail:''
    })
    .end((err,res)=>{
      expect(res.statusCode).to.equal(400)
     
    })
    done()
  })
})




