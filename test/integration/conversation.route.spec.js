"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const chai_1 = require("chai");
const main_1 = require("../../main");
const app = main_1.injector.server.app;
describe("conversation API", () => {
    describe("POST /api/conversation", () => {
        it("should successfully create a new conversation", (done) => {
            supertest(app)
                .post("/api/conversation")
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
    describe("POST /api/conversation", () => {
        it("should fail to create the same conversation twice", (done) => {
            supertest(app)
                .post("/api/conversation")
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
    describe("GET /api/conversation", () => {
        it("should get valid conversation", (done) => {
            supertest(app)
                .get("/api/conversation/aasdfkjashdkjf")
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
    describe("GET /api/conversation", () => {
        it("should fail to get invalid conversation", (done) => {
            supertest(app)
                .get("/api/conversation/ajksdlasdufas")
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
    describe("PUT /api/conversation", () => {
        it("should successfully update existing conversation", (done) => {
            supertest(app)
                .put("/api/conversation/asdfasdfherr")
                .send({
                "message": "nathan@nathan.com",
                "senderId": "asdfasdfherr"
            })
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
    describe("PUT /api/conversation", () => {
        it("should fail to update invalid conversation", (done) => {
            supertest(app)
                .put("/api/conversation/asdfjasdfas")
                .send({ "message": "please add me to your bla bla bla" })
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
    describe("DEL /api/conversation", () => {
        it("should successfully delete valid conversation", (done) => {
            supertest(app)
                .del("/api/conversation/sdfajshdgfhkajsd")
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
    describe("DEL /api/conversation", () => {
        it("should fail to delete invalid conversation", (done) => {
            supertest(app)
                .del("/api/conversation/askdfhjajshdf")
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
    describe("GET /api/conversation", () => {
        it("should fail to get invalid conversation", (done) => {
            supertest(app)
                .get("/api/conversation/askdfaksdf")
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
//# sourceMappingURL=conversation.route.spec.js.map