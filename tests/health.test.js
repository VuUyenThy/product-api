const request = require("supertest");
const express = require("express");

const app = express();

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        message: "Product API is healthy"
    });
});

describe("Health API", () => {

    test("GET /health should return 200", async () => {

        const response = await request(app)
            .get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("UP");

    });

});
