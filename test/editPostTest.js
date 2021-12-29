var expect = require('chai').expect;
var server = require('../app');
var request = require('supertest');
var app = request.agent(server);



/**
 * expected status code 200 for loading create post page
 */
 describe("/GET testing loading edit post page",function(){
    
    it('it should return status code 200 for loading edit post page', (done) => {
          app.get('/posts/edit/61cc98625b3a56185857a30c')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200)
             
          })
          done()
  })
  }),


    /**
   * expected status code 400 for editing a post without body
   */

     describe("/POST Testing edit post without body",function(){
        it('it should return status code 400 if post body not provided',function(done){
          app.post('/posts/edit/61cc98625b3a56185857a30c').send({
            title:'himel-nsu',
            body:'himel12345@gmail.com',
            tags:'#himel',
            thumbnail:''
          })
          .end((err,res)=>{
            expect(res.statusCode).to.equal(302)
           
          })
          done()
        })
      }),
    


  /**
   * expected status code 302 for editing a post
   */

  describe("/POST Testing edit post with all information",function(){
    it('post have been successfully edited and return status code 302',function(done){
      app.post('/posts/edit/61cc98625b3a56185857a30c').send({
        title:'himel-nsu',
        body:'himel12345@gmail.com',
        tags:'#himel',
        thumbnail:''
      })
      .end((err,res)=>{
        expect(res.statusCode).to.equal(302)
       
      })
      done()
    })
  }),


/**
   * expected status code 200 if post is deleted
   */
 describe("/delete post",function(){
    it('it should delete post and return status code 200',function(done){
      app.get('/delete/61cc98625b3a56185857a30b')
      .end((err,res)=>{
        expect(res.statusCode).to.equal(200)
       
      })
      done()
    })
  
  
  
  })
  