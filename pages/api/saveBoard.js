// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conn from '../../../lib/db'

export default async function handler(req, res) {
    const body = req.body;
    const query = `UPDATE boards SET title=$1, icon_url=$2, sort_by=$3, per_page=$4 WHERE channel_id=$5 AND type=$6`;
    const values = [body.title, body.icon_url, body.sort_by, body.per_page, body.channel_id, body.type];
    await conn.query(query, values);
    res.status(200);
  };
  