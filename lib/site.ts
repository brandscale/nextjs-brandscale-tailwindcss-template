import 'server-only';
import { client } from './brandscale';

export async function getSite(): Promise {
  const site = await client.findUnique('sites', process.env.BRANDSCALE_SITE_ID, {
    where: { id: process.env.BRANDSCALE_SITE_ID },
    include: {
      apps: {
        include: {
          entities: {
            include: {
              fields: true
            }
          }
        }
      },
      // users: true,
      components: true,
      navigations: true,
      pages: {
        include: {
          components: true,
        }
      }
    }
  });


  return Array.isArray(site.data) ? site.data[0] : site.data;
}
