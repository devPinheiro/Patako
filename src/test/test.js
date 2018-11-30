import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import User from '../api/resources/notes/notes.model';

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

let note_id;
let token;



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

// Reset user model before each test
describe('Create Account, Login and Get Token', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            console.log(err);
            done();
        });
    });

    // POST create a new user test
    describe('POST register a new user test', () => {
        it('It should allow new users sign up', (done) => {
            // using chai-http plugin
            chai.request(app)
                .post('/api/v1/users/signup')
                .send({
                    firstName: "tester",
                    lastName: "tester",
                    email: "tester@test.com",
                    password: "tester",
                    role: 2
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    res.body.should.have.property('success');

                    //attempt login with user credentials
                    chai.request(app)
                        .post('/api/v1/users/login')
                        .send({
                            email: "tester@test.com",
                            password: "tester"
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('token');
                            res.body.should.be.a('Object');
                            token = `Bearer ${res.body.token}`;

                            // attempt to login using an incorrect endpoint
                            chai.request(app)
                                .post('/api/v1/users/l')
                                .send({
                                    email: "tester@test.com",
                                    password: "tester"
                                })
                                .end((err, res) => {
                                    res.should.have.status(404);
                                    res.body.should.be.a('Object');

                                })

                            // attempt to login using an incorrect credential
                            chai.request(app)
                                .post('/api/v1/users/login')
                                .send({
                                    email: "tester@testerer.com",
                                    password: "tester"
                                })
                                .end((err, res) => {
                                    res.should.have.status(404);
                                    res.body.should.be.a('Object');
                                    res.body.should.have.property('err');
                                    done();
                                })
                        })
                })
        })
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

//let's test the get all notes entry endpoint out
describe('GET - fetch all unique note entry', () => {
    it('It should fetch all entry of notes', (done) => {
        chai.request(app)
            .get(`/api/v1/notes`)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                res.body.should.have.property('docs');
                res.body.should.have.property('pages');
                res.body.should.have.property('total');
                done();
            });
    }); 
    it('Invalid note should throw some errors ', (done) => {
        chai.request(app)
            .get(`/api/v1/notes/89`)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(500);
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

