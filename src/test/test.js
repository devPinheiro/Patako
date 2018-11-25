import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import User from '../api/resources/notes/notes.model';

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// let;s first clear the user in the db
// describe('Clear Users before each test', ()=>{
//     beforeEach('', (done)=>{
//         User.deleteMany({}, (err, res)=>{
//         if(err){
//             console.log(err);
//         }
//         done();
//         });
//     });
// });

// let's cover test for invalid endpoints to our applicaton
describe('Invalid routes should not be accessible', () => {
    it('You are on the wrong path', (done) => {
        chai.request(app)
        .get('/api')
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(404);
          done();   
        });
    });
}); 

//let's test the create endpoint out
describe('POST - create a new note entry', () =>{
    it('It should an entry of a note', (done)=>{
        chai.request(app)
        .post('/api/v1/notes')
        .send({
            "title": " lets test",
            "content": "This is a Note api test"
        })
        .end((err, res)=>{
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.have.property('title');
            res.body.should.have.property('_id');
            res.body.should.have.property('content');
            done();
        });
    });
});
