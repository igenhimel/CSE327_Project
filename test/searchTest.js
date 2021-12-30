const expect = require('chai').expect
const server = require('../app')

const request = require('supertest')
const app = request.agent(server)


/**
 * expected status code 200 for loading create post page
 */
 describe("/GET testing loading search page",function(){
    it('it should return status code 200 for loading search page', (done) => {
          app.get('/explore/search')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200)
            done()
            })
        })
    }),

  /**
   * Successfully searching a capital letter post
   */
    describe("/GET Testing search will all the functions",function(){
        it('search function is working perfectly for capital casing',function(done){
            app.get('/search').send({
                search:'TITANIC'
            })
            .end((err, res)=>{
                expect(res.statusCode).to.equal(200)
            })
            done();
        })
    }),

   /**
   * Successfully searching a smaller letter post
   */
     describe("/GET Testing search will all the functions",function(){
        it('search function is working perfectly for smaller casing',function(done){
            app.get('/search').send({
                search:'titanic'
            })
            .end((err, res)=>{
                expect(res.statusCode).to.equal(200)
            })
            done();
        })
    }),

    /**
     * expected status code 400 if search term not provided
     */
    describe("/Get Testing search post without a searchterm",function(){
        it('Return false if search bar is blank',function(done){
            app.get('/search').send({
                search:' '
            })
            .end((err, res)=>{
                expect(res.statusCode).to.equal(400)
            })
            done();
        })
    })