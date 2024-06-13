import 'server-only';
import { Brandscale } from '@brandscale/sdk';

const { BRANDSCALE_API_TOKEN, BRANDSCALE_API_URL } = process.env;

export const client = new Brandscale({ apiToken: BRANDSCALE_API_TOKEN, apiUrl: BRANDSCALE_API_URL });

export async function getUsers(
  search: string,
  offset: number
): Promise {
  // Always search the full table, not per page
  if (search) {
    const { data: users } = await client.findMany('users', {
      where: {
        OR: [
          { firstName: { contains: search } },
          { lastName: { contains: search } }
        ]
      }});

    return {
      users,
      newOffset: null
    };
  }

  if (offset === null) {
    return { users: [], newOffset: null };
  }

  const allUsers = await client.findMany('users');
  // console.log(allUsers?.data)
  const moreUsers = allUsers?.data?.slice(offset, offset + 20);
  const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
  return { users: moreUsers, newOffset };
}

export async function deleteUserById(id: number) {
  await client.delete('users', id);
}
