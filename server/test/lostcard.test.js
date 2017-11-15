let supertest = require('supertest');
let chai = require('chai');
let sinon = require('sinon');

let app = require('../app');
let lostCard = require('../models/lostCard');
let url = 'http://localhost:4024';
let lostCardSqlStub = sinon.stub(lostCard, 'query');
let lostCardGetStub = sinon.stub(lostCard, 'find');
let lostCardIdStub = sinon.stub(lostCard, 'findOne');
let lostCardUpdateStub = sinon.stub(lostCard, 'update');
let lostCardPostStub = sinon.stub(lostCard.prototype, 'save');


describe('test fetch data of lost access card', () => {
    before(() => {
        lostCardGetStub.yields(null, [{
            employeeId: 50042924,
            empoloyeeName: 'Rohit',
            empType: 'temp',
            accessType: 'temp',
            designation: 'trainee',
            dateOfJoining: '03/07/2017',
            dateOfExpiry: '03/12/2017',
            projct: 'stackroute',
            department: 'trainee',
            existingProject: 'stackroute',
            newProject: 'sita',
            requestDate: '09/12/2017',
            prev: 'employee',
            current: 'hr',
            zone: 'internal',
            cardno: '12345',
            issueDate: '12/12/2017',
            date: '21/12/2017',
            comments: 'card is damaged'
        }]);
    });

    it('validation for positive case of lost access card ', (done) => {
        supertest(url)
            .get('/lostcard/findlost')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body[0].employeeId).to.equal(50042924);
                done();
            });
    });

    it('validation for negative case of lost access card ', (done) => {
        supertest(url)
            .get('/lostcard/findlost')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body[0].employeeId).not.to.equal(50042);
                done();
            });
    });
});

describe('Test status of lost access card', () => {
    before(() => {
        lostCardGetStub.yields(null, [{
            employeeId: 50042924,
            empoloyeeName: 'Rohit',
            empType: 'temp',
            accessType: 'temp',
            designation: 'trainee',
            dateOfJoining: '03/07/2017',
            dateOfExpiry: '03/12/2017',
            projct: 'stackroute',
            department: 'trainee',
            existingProject: 'stackroute',
            newProject: 'sita',
            requestDate: '09/12/2017',
            prev: 'employee',
            current: 'hr',
            zone: 'internal',
            cardno: '12345',
            issueDate: '12/12/2017',
            date: '21/12/2017',
            comments: 'card is damaged'
        }]);
    });

    it('validation for status success', (done) => {
        supertest(url)
            .get('/lostcard/findlost')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.status).to.equal(200);
                done();
            });
    });

    it('validation for status not found', (done) => {
        supertest(url)
            .get('/lostcard/findlost')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.status).not.to.equal(404);
                done();
            });
    });
});

describe('test new record of lost access card', () => {
    let lostCardInfo = {
        employeeId: 50042924,
        empoloyeeName: 'Rohit',
        empType: 'temp',
        accessType: 'temp',
        designation: 'trainee',
        dateOfJoining: '03/07/2017',
        dateOfExpiry: '03/12/2017',
        projct: 'stackroute',
        department: 'trainee',
        existingProject: 'stackroute',
        newProject: 'sita',
        requestDate: '09/12/2017',
        prev: 'employee',
        current: 'hr',
        zone: 'internal',
        cardno: '12345',
        issueDate: '12/12/2017',
        date: '21/12/2017',
        comments: 'card is damaged'
    };

    it('positive case for new lostcard record', (done) => {
        lostCardPostStub.yields(null, [lostCardInfo])
        supertest(url)
            .post('/lostcard/lostInsert')
            .send(lostCardInfo)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body.employeeId).to.be.equal(50042924);
                done();
            });
    });

    it('negative case for new lostcard record', (done) => {
        lostCardPostStub.yields(null, [lostCardInfo])
        supertest(url)
            .post('/lostcard/lostInsert')
            .send(lostCardInfo)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body.employeeId).not.to.be.equal(50042);
                done();
            });
    });
});