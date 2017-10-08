"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const chai_1 = require("chai");
const main_1 = require("../../main");
let app = main_1.injector.server.app;
describe("user API", () => {
    describe("POST /api/user", () => {
        it("should successfully create a new user", (done) => {
            supertest(app)
                .post("/api/user")
                .send({ "email": "michael@michael.com" })
                .set("Content-Type", "application/json")
                .end((err, res) => {
                if (err) {
                    done(err);
                }
                else {
                    chai_1.expect(res.body.email).to.equal("michael");
                    chai_1.expect(res.status).to.equal(200);
                    done();
                }
            });
        });
    });
    describe("POST /api/user", () => {
        it("should fail to create the same user twice", (done) => {
            supertest(app)
                .post("/api/user")
                .send({ "email": "michael@michael.com" })
                .set("Content-Type", "application/json")
                .end((err, res) => {
                if (err) {
                    done(err);
                }
                else {
                    chai_1.expect(res.status).to.equal(500);
                    done();
                }
            });
        });
    });
    describe("GET /api/user", () => {
        it("should get valid user", (done) => {
            supertest(app)
                .get("/api/user/aasdfkjashdkjf")
                .end((err, res) => {
                if (err) {
                    done(err);
                }
                else {
                    chai_1.expect(res.body.email).to.equal("michael@michael.com");
                    chai_1.expect(res.status).to.equal(200);
                    done();
                }
            });
        });
    });
    describe("GET /api/user", () => {
        it("should fail to get invalid user", (done) => {
            supertest(app)
                .get("/api/user/ajksdlasdufas")
                .end((err, res) => {
                if (err) {
                    done(err);
                }
                else {
                    chai_1.expect(res.body.id).to.be.undefined;
                    chai_1.expect(res.status).to.equal(500);
                    done();
                }
            });
        });
    });
    describe("PUT /api/user", () => {
        it("should successfully update existing user", (done) => {
            supertest(app)
                .put("/api/user/asdfasdfherr")
                .send({ "email": "nathan@nathan.com" })
                .set("Content-Type", "application/json")
                .end((err, res) => {
                if (err) {
                    done(err);
                }
                else {
                    chai_1.expect(res.body.email).to.equal("nathan@nathan.com");
                    chai_1.expect(res.status).to.equal(200);
                    done();
                }
            });
        });
    });
    describe("PUT /api/user", () => {
        it("should fail to update invalid user", (done) => {
            supertest(app)
                .put("/api/user/asdfjasdfas")
                .send({ "email": "nathan@nathan.com" })
                .set("Content-Type", "application/json")
                .end((err, res) => {
                if (err) {
                    done(err);
                }
                else {
                    chai_1.expect(res.body.id).to.be.undefined;
                    chai_1.expect(res.status).to.equal(500);
                    done();
                }
            });
        });
    });
    describe("DEL /api/user", () => {
        it("should successfully delete valid user", (done) => {
            supertest(app)
                .del("/api/user/sdfajshdgfhkajsd")
                .end((err, res) => {
                if (err) {
                    done(err);
                }
                else {
                    chai_1.expect(res.body.id).to.equal("sdfajshdgfhkajsd");
                    chai_1.expect(res.status).to.equal(200);
                    done();
                }
            });
        });
    });
    describe("DEL /api/user", () => {
        it("should fail to delete invalid user", (done) => {
            supertest(app)
                .del("/api/user/askdfhjajshdf")
                .end((err, res) => {
                if (err) {
                    done(err);
                }
                else {
                    chai_1.expect(res.body.id).to.be.undefined;
                    chai_1.expect(res.status).to.equal(500);
                    done();
                }
            });
        });
    });
    describe("GET /api/user", () => {
        it("should fail to get invalid user", (done) => {
            supertest(app)
                .get("/api/user/askdfaksdf")
                .end((err, res) => {
                if (err) {
                    done(err);
                }
                else {
                    chai_1.expect(res.body.id).to.be.undefined;
                    chai_1.expect(res.status).to.equal(500);
                    done();
                }
            });
        });
    });
});
//# sourceMappingURL=user.route.spec.js.map