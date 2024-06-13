import 'server-only';
import { client } from './brandscale';

export async function getSite(): Promise {
  const site = await client.findMany('sites', {
    where: { id: process.env.BRANDSCALE_SITE_ID },
    include: {
      apps: true,
      users: true,
      components: true,
      navigations: true,
      pages: {
        include: {
          components: true,
        }
      }
    }
  });


  return site.data
}
