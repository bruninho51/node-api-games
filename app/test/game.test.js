let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

const url = '0.0.0.0:45678';

var gameTest = {
    id: 0,
    title: 'Test',
    year: 2020,
    price: 2000
};

describe('Games', () => {

    describe('Register Game', () => {

        it('register', (done) => {

            chai.request(url)
                .post('/games')
                .send(gameTest)
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    res.body.should.have.property('title').eql(gameTest.title);
                    res.body.should.have.property('year').eql(gameTest.year);
                    res.body.should.have.property('price').eql(gameTest.price);
                    res.body.should.have.property('createdAt');
                    res.body.should.have.property('updatedAt');

                    gameTest.id = res.body.id;

                    done();
                });
        });

        it('get registered', (done) => {
            chai.request(url)
                .get(`/games/${gameTest.id}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(gameTest.id);
                    res.body.should.have.property('title').eql(gameTest.title);
                    res.body.should.have.property('year').eql(gameTest.year);
                    res.body.should.have.property('price').eql(gameTest.price);
                    res.body.should.have.property('createdAt');
                    res.body.should.have.property('updatedAt');
                    done();
                });
            
        });
    });

    describe('Update Game', () => {

        it('update title', (done) => {
            chai.request(url)
                .put(`/games/${gameTest.id}`)
                .send({  title: 'Test modified' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    done();
                });
        });

        it('check if title has been updated', (done) => {
            chai.request(url)
                .get(`/games/${gameTest.id}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.body.should.have.property('title').eql('Test modified');
                    done();
                });
        });

        it('update price', (done) => {
            chai.request(url)
                .put(`/games/${gameTest.id}`)
                .send({  price: 5000 })
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    done();
                });
        });

        it('check if price has been updated', (done) => {
            chai.request(url)
                .get(`/games/${gameTest.id}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.body.should.have.property('price').eql(5000);
                    done();
                });
        });

        it('update year', (done) => {
            chai.request(url)
                .put(`/games/${gameTest.id}`)
                .send({  year: 2021 })
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    done();
                });
        });

        it('check if year has been updated', (done) => {
            chai.request(url)
                .get(`/games/${gameTest.id}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.body.should.have.property('year').eql(2021);
                    done();
                });
        });
    });

    describe('Get Games', () => {
        it('get all', (done) => {
            chai.request(url)
                .get('/games')
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    expect(res.body).to.be.length.greaterThan(0);
                    done();
                });
        });
    });

    describe('Delete Game', () => {
        it('delete', (done) => {
            chai.request(url)
                .delete(`/games/${gameTest.id}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    done();
                });
        });

        it('check if it has been deleted', (done) => {
            chai.request(url)
                .get(`/games/${gameTest.id}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(404);
                });
                done();
        });

    });

});