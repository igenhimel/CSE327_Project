var expect = require('chai').expect;
var server = require('../app');
var request = require('supertest');
var app = request.agent(server);





describe("/GET testing loading create post page",function(){

  it('it should return status code 200 with a webpage', (done) => {

        app.get('/posts/createPost')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
            done()
        })
})
}),

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
   * Return error if post title not provided
   */
 describe("/POST Testing create post without title",function(){
  it('it should not return true without title',function(done){
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
   * Return error if post body not provided
   */
   describe("/POST Testing create post without body",function(){
  it('it should not return true without body',function(done){
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



}),

describe("/delete post",function(){
  it('it should delete post',function(done){
    app.get('/delete/1812664642')
    .end((err,res)=>{
      expect(res.statusCode).to.equal(200)
     
    })
    done()
  })



})

