import axios from 'axios';
import { getConfig } from '../config';

export default async function (post: string): Promise<void> {
  await axios.post(
    `${getConfig().superbragPrefix}/api/brags`,
    { published: true, body: post },
    { headers: { Authorization: `Bearer ${getConfig().accessPassword}` } }
  );
}
