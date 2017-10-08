import * as supertest from "supertest";
import { expect } from "chai";
import { injector } from "../../main";
import { logger } from "../../utils/logger";
import {} from "mocha";

const app = injector.server.app;

describe("conversation API", () => {

    // before((done) => {
    //     ConversationRepo.remove({}, () => {
    //         logger.trace('Test db: UserRepo collection removed!');
    //         done();
    //     });
    // });

    describe("POST /api/conversation", () => {
        it("should successfully create a new conversation", (done) => {
            supertest(app)
        .post("/api/conversation")
        .send({ "email": "michael@michael.com" })
        .set("Content-Type", "application/json")
        .end((err: any, res: supertest.Response) => {
            if (err) {
                done(err);
            } else {
                expect(res.body.email).to.equal("michael");
                expect(res.status).to.equal(200);
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
        .end((err: any, res: supertest.Response) => {
            if (err) {
                done(err);
            } else {
                expect(res.status).to.equal(500);
                done();
            }
        });
        });
    });

    describe("GET /api/conversation", () => {
        it("should get valid conversation", (done) => {
            supertest(app)
        .get("/api/conversation/aasdfkjashdkjf")
        .end((err: any, res: supertest.Response) => {
            if (err) {
                done(err);
            } else {
                expect(res.body.email).to.equal("michael@michael.com");
                expect(res.status).to.equal(200);
                done();
            }
        });
        });
    });

    describe("GET /api/conversation", () => {
        it("should fail to get invalid conversation", (done) => {
            supertest(app)
        .get("/api/conversation/ajksdlasdufas")
        .end((err: any, res: supertest.Response) => {
            if (err) {
                done(err);
            } else {
                expect(res.body.id).to.be.undefined;
                expect(res.status).to.equal(500);
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
        .end((err: any, res: supertest.Response) => {
            if (err) {
                done(err);
            } else {
                expect(res.body.email).to.equal("nathan@nathan.com");
                expect(res.status).to.equal(200);
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
        .end((err: any, res: supertest.Response) => {
            if (err) {
                done(err);
            } else {
                expect(res.body.id).to.be.undefined;
                expect(res.status).to.equal(500);
                done();
            }
        });
        });
    });

    describe("DEL /api/conversation", () => {
        it("should successfully delete valid conversation", (done) => {
            supertest(app)
        .del("/api/conversation/sdfajshdgfhkajsd")
        .end((err: any, res: supertest.Response) => {
            if (err) {
                done(err);
            } else {
                expect(res.body.id).to.equal("sdfajshdgfhkajsd");
                expect(res.status).to.equal(200);
                done();
            }
        });
        });
    });

    describe("DEL /api/conversation", () => {
        it("should fail to delete invalid conversation", (done) => {
            supertest(app)
        .del("/api/conversation/askdfhjajshdf")
        .end((err: any, res: supertest.Response) => {
            if (err) {
                done(err);
            } else {
                expect(res.body.id).to.be.undefined;
                expect(res.status).to.equal(500);
                done();
            }
        });
        });
    });

    describe("GET /api/conversation", () => {
        it("should fail to get invalid conversation", (done) => {
            supertest(app)
        .get("/api/conversation/askdfaksdf")
        .end((err: any, res: supertest.Response) => {
            if (err) {
                done(err);
            } else {
                expect(res.body.id).to.be.undefined;
                expect(res.status).to.equal(500);
                done();
            }
        });
        });
    });

});
