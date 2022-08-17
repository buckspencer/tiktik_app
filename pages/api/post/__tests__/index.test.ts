import { PageConfig } from 'next';
import endpoint from '../index';
import { testApiHandler } from 'next-test-api-route-handler';

const handler: typeof endpoint & { config?: PageConfig } = endpoint;

describe("index", () => {
  it("should return a post", async () => {
    await testApiHandler({
      handler,
      requestPatcher: (req) => (req.headers = {}),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        await expect(res.json()).resolves.toMatchSnapshot();
      }
    });
  });
});
