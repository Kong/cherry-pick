const { createNodeMiddleware, createProbot } = require("probot");

const app = require("../../../lib/index");
const probot = createProbot();

module.exports = createNodeMiddleware(app, { probot, webhooksPath: '/api/github/webhooks' });