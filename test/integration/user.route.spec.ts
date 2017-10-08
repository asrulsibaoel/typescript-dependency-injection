import * as supertest from "supertest";
import { expect } from "chai";
import { injector } from "../../main";
import { logger } from "../../utils/logger";
let app = injector.server.app;

describe("user API", () => {

  // before((done) => {
  //   UserRepo.remove({}, () => {
  //     logger.trace('Test db: UserRepo collection removed!');
  //     done();
  //   });
  // });

    describe("POST /api/user", () => {
        it("should successfully create a new user", (done) => {
            supertest(app)
            .post("/api/user")
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

    describe("POST /api/user", () => {
        it("should fail to create the same user twice", (done) => {
            supertest(app)
            .post("/api/user")
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

    describe("GET /api/user", () => {
        it("should get valid user", (done) => {
            supertest(app)
        .get("/api/user/aasdfkjashdkjf")
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

    describe("GET /api/user", () => {
        it("should fail to get invalid user", (done) => {
            supertest(app)
        .get("/api/user/ajksdlasdufas")
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

    describe("PUT /api/user", () => {
        it("should successfully update existing user", (done) => {
            supertest(app)
        .put("/api/user/asdfasdfherr")
        .send({ "email": "nathan@nathan.com" })
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

    describe("PUT /api/user", () => {
        it("should fail to update invalid user", (done) => {
            supertest(app)
        .put("/api/user/asdfjasdfas")
        .send({ "email": "nathan@nathan.com" })
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

    describe("DEL /api/user", () => {
        it("should successfully delete valid user", (done) => {
            supertest(app)
        .del("/api/user/sdfajshdgfhkajsd")
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

    describe("DEL /api/user", () => {
        it("should fail to delete invalid user", (done) => {
            supertest(app)
        .del("/api/user/askdfhjajshdf")
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

    describe("GET /api/user", () => {
        it("should fail to get invalid user", (done) => {
            supertest(app)
        .get("/api/user/askdfaksdf")
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
