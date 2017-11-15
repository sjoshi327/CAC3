let supertest = require('supertest');
let chai = require('chai');
let sinon = require('sinon');

let url = 'http://localhost:4024';
let app = require('../app');
let employee = require('../models/requester');
let employeeSqlStub = sinon.stub(employee, 'query');
let employeeGetStub = sinon.stub(employee, 'find');
let employeeIdGetStub = sinon.stub(employee, 'findOne');
let employeePostStub = sinon.stub(employee.prototype, 'save');
let employeeUpdateStub = sinon.stub(employee, 'update');

describe('test fetch data of employee access card', () => {
    before(() => {
        employeeGetStub.yields(null, [{
            employeeId: 50042924,
            employeeName: 'Shubhang',
            empType: 'Permanent',
            accessType: 'temp',
            designation: 'Trainee',
            dateOfJoining: '12/07/2017',
            dateOfExpiry: '18/12/2017',
            project: 'slack-route',
            department: 'Hr',
            existingProject: 'Trainee',
            newProject: 'Sita',
            requestDate: '10/07/2017',
            prev: 'supervisor',
            current: 'hr',
            zone: 'Greater Noida',
            cardno: '123456',
            issuedBy: 'Sheetal',
            issueDate: '12/07/2017'
        }]);
    });

    it('validation for positive case of employee access card data', (done) => {
        supertest(url)
            .get('/requester/findemployee')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body[0].employeeId).to.equal(50042924);
                done();
            });
    });

    it('validation for negative case of employee access card data', (done) => {
        supertest(url)
            .get('/requester/findemployee')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body[0].employeeId).not.to.equal(50042);
                done();
            });
    });
});

describe('test fetch data of employee by employeeId of access card', () => {
    before(() => {
        employeeIdGetStub.yields(null, [{
            employeeId: 50042924,
            employeeName: 'Shubhang',
            empType: 'Permanent',
            accessType: 'temp',
            designation: 'Trainee',
            dateOfJoining: '12/07/2017',
            dateOfExpiry: '18/12/2017',
            project: 'slack-route',
            department: 'Hr',
            existingProject: 'Trainee',
            newProject: 'Sita',
            requestDate: '10/07/2017',
            prev: 'supervisor',
            current: 'hr',
            zone: 'Greater Noida',
            cardno: '123456',
            issuedBy: 'Sheetal',
            issueDate: '12/07/2017'
        }]);
    });

    it('validation for positive case of employee access card data fetch by employeeId', (done) => {
        supertest(url)
            .get('/requester/findemployeebyid/50042924')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body[0].employeeId).to.equal(50042924);
                done();
            });
    });

    it('validation for negative case of employee access card data fetch by employeeId', (done) => {
        supertest(url)
            .get('/requester/findemployeebyid/5004')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body[0].employeeId).not.to.equal(50042);
                done();
            });
    });
});

describe('test status of employee access card', () => {
    before(() => {
        employeeGetStub.yields(null, [{
            employeeId: 50042924,
            employeeName: 'Shubhang',
            empType: 'Permanent',
            accessType: 'temp',
            designation: 'Trainee',
            dateOfJoining: '12/07/2017',
            dateOfExpiry: '18/12/2017',
            project: 'slack-route',
            department: 'Hr',
            existingProject: 'Trainee',
            newProject: 'Sita',
            requestDate: '10/07/2017',
            prev: 'supervisor',
            current: 'hr',
            zone: 'Greater Noida',
            cardno: '123456',
            issuedBy: 'Sheetal',
            issueDate: '12/07/2017'
        }]);
    });

    it('validation for status success', (done) => {
        supertest(url)
            .get('/requester/findemployee')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.status).to.equal(200);
                done();
            });
    });

    it('validation for status not found', (done) => {
        supertest(url)
            .get('/requester/findemployee')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.status).not.to.equal(404);
                done();
            });
    });
});

describe('Test new record of employee access card', () => {
    let employeeInfo = {
        employeeId: 50042924,
        employeeName: 'Shubhang',
        empType: 'Permanent',
        accessType: 'temp',
        designation: 'Trainee',
        dateOfJoining: '12/07/2017',
        dateOfExpiry: '18/12/2017',
        project: 'slack-route',
        department: 'Hr',
        existingProject: 'Trainee',
        newProject: 'Sita',
        requestDate: '10/07/2017',
        prev: 'supervisor',
        current: 'hr',
        zone: 'Greater Noida',
        cardno: '123456',
        issuedBy: 'Sheetal',
        issueDate: '12/07/2017'
    };

    it('positive case for new employee record', () => {
        employeePostStub.yields(null, [employeeInfo])
        supertest(url)
            .post('/requester/insert')
            .send(employeeInfo)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body.employeeId).to.be.equal(50042924);
                done();
            });
    });

    it('negative case for new employee record', () => {
        employeePostStub.yields(null, [employeeInfo])
        supertest(url)
            .post('/requester/insert')
            .send(employeeInfo)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body.employeeId).not.to.be.equal(50042)
                done();
            });
    });
});


describe('test edit employee data using employeeId ', (done) => {
    beforeEach(() => {
        employeeUpdateStub.yields(null, {
            employeeId: '50042924',
            $set: { zone: 'Delhi', accessType: 'temp', prev: 'supervisor', current: 'hr', issuedBy: 'Sita', issueDate: '12/06/2017', cardno: '50040' },
            ok: 1,
            nModified: 0,
            n: 0
        });
    });

    it('pasitive case of edit employee data using employeeId', (done) => {
        supertest(url)
            .put('/requester/update/50042924')
            .expect("Content-Type", /json/)
            .send({ $set: { zone: 'Delhi', accessType: 'temp', prev: 'supervisor', current: 'hr', issuedBy: 'Sita', issueDate: '12/06/2017', cardno: '50040' } })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body.ok).to.equal(1)
                chai.expect(res.body.nModified).to.equal(0);
                chai.expect(res.body.n).to.equal(0);
                done();
            });
    });

    it('negative case of edit employee data using employeeId', (done) => {
        supertest(url)
            .put('/requester/update/50042924')
            .expect("Content-Type", /json/)
            .send({ $set: { zone: 'Delhi', accessType: 'temp', prev: 'supervisor', current: 'hr', issuedBy: 'Sita', issueDate: '12/06/2017', cardno: '50040' } })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body.ok).not.to.equal(0)
                chai.expect(res.body.nModified).not.to.equal(1);
                chai.expect(res.body.n).not.to.equal(1);
                done();
            });
    });
});