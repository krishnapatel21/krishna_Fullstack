import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from './server.js';

// Lightweight test so Jenkins can verify that the backend starts and exposes its health endpoint.
test('health endpoint exists', async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, 'UP');
  } finally {
    server.close();
  }
});
