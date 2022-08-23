// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import conn from "../../../lib/db";

export default async function handler(req, res) {

  try {
      console.log("req nom", req.body)
      const query = 'SELECT DISTINCT clan_tag, clan_name FROM clans WHERE guild_id=$1 ORDER BY clan_name ASC'
      const values = [BigInt(req.query.gid)] // req.body.content

    const data = await conn.query(
        query,
        values
        );
    const clansInServer = data.rows

    const dataChannel = await conn.query(
      "SELECT DISTINCT clan_tag, clan_name FROM clans WHERE channel_id=$1",
      [BigInt(req.query.cid)]
    );
    const clansInChannel = dataChannel.rows
    
    for (const row of clansInServer) {
      if (clansInChannel.some(r => r.clan_tag == row.clan_tag)) {
        row.checked = true;
      } else {
        row.checked = false;
      }
    }
    
    res.status(200).json(clansInServer)
  } catch ( error ) {
    console.log( error );
  }
  // res.status(200).json(
  //   [
  //     {
  //       clan_tag: "#2PG",
  //       clan_name: "Reddit 2.0",
  //     },
  //     {
  //       clan_tag: "#2PL",
  //       clan_name: "Reddit",
  //     }
  //   ])
}
