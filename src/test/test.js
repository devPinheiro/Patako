import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import User from '../api/resources/notes/notes.model';

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

let note_id;

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
            note_id = res.body._id;
            done();
        });
    });
    it('Title is required', (done) => {
        chai.request(app)
            .post('/api/v1/notes')
            .send({
                "title": "",
                "content": "This is a Note api test"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                done();
            });
    });
});

//let's test the get one note entry endpoint out
describe('GET - fetch a unique note entry', () =>{
    it('It should fetch an entry of notes', (done)=>{
        chai.request(app)
        .get(`/api/v1/notes/${note_id}`)
        .end((err, res)=>{
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.have.property('title');
            res.body.should.have.property('_id');
            res.body.should.have.property('content');
            done();
        });
    });
    it('Invalid note should throw some errors ', (done) => {
        chai.request(app)
            .get(`/api/v1/notes/5bd85e98a07f968a88e68814`)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(404);
                res.body.should.have.property('err');
                done();
            });
    });
    it('Invalid note should throw some errors ', (done) => {
        chai.request(app)
            .get(`/api/v1/notes/5`)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(500);
                done();
            });
    });
});

//let's test the update note entry endpoint out
describe('UPDATE - modifies a unique note entry', () => {
    it('It should modify an entry of notes', (done) => {
        chai.request(app)
            .put(`/api/v1/notes/${note_id}`)
            .send({
                "title": "Second test",
                "content": "This is a Note api test"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                res.body.should.have.property('title');
                res.body.should.have.property('_id');
                res.body.should.have.property('content');
                done();
            });
    });
    it('Invalid note should throw some errors due to wrong id ', (done) => {
        chai.request(app)
            .put(`/api/v1/notes/5bd85e98a07f968a88e68814`)
            .send({
                "title": "Second test",
                "content": "This is a Note api test"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(404);
                res.body.should.have.property('err');
                done();
            });
    });
    it('Invalid note should throw some errors ', (done) => {
        chai.request(app)
            .put(`/api/v1/notes/${note_id}`)
            .send({
                "title": "",
                "content": "This is a Note api test"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                done();
            });
    });
});

//let's test the delete note entry endpoint out
describe('DELETE - fetch a unique note entry', () => {
    it('It should delete an entry of notes', (done) => {
        chai.request(app)
            .delete(`/api/v1/notes/${note_id}`)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                res.body.should.have.property('message');
                done();
            });
    });
    it('Invalid note should throw some errors due to wrong id ', (done) => {
        chai.request(app)
            .delete(`/api/v1/notes/5bd85e98a07f968a88e68814`)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(404);
                res.body.should.have.property('err');
                done();
            });
    });
    it('Invalid note should throw some errors ', (done) => {
        chai.request(app)
            .delete(`/api/v1/notes/5`)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(500);
                done();
            });
    });
});

