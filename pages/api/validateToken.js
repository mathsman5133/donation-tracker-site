// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conn from '../../lib/db'

export default async function handler(req, res) {
    // res.status(200).json(
    //     {
    //         title: "Donationboard Testing ",
    //         icon_url: "/River-04777.jpg",
    //         per_page: "30",
    //         sort_by: "donations",
    //     })
    try {
        console.log("req nom", req.body)
        const query = `SELECT user_id FROM access_tokens WHERE access_token=$1 AND guild_id=$2`
        const values = [req.body.token, BigInt(req.body.guild_id)] // req.body.content

      const result = await conn.query(
          query,
          values
      );
      if (result.rowCount == 0) {
        res.status(200).json({status: "fail"})
      } else {
        res.status(200).json({status: "ok"})
      }
  } catch ( error ) {
      console.log( error );
  }

  };
  