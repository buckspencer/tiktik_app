import type { PageConfig } from 'next';
import { client } from '../../../../utils/client';
import endpoint from '../[id]';
import { testApiHandler } from 'next-test-api-route-handler';

const handler: typeof endpoint & { nextConfig?: PageConfig } = endpoint;

describe("GET", () => {
  it("should return a post", async () => {
    await testApiHandler({
      handler,
      params: { id: 'cW1QlAWGawhhxvB3TIW68X' },
      test: async ({ fetch }) => {
        const res = await fetch({ method: "GET" });

        await expect(res.json()).resolves.toMatchSnapshot();
      }
    });
  });
});
