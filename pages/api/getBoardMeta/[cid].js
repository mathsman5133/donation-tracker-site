// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conn from '../../../lib/db'

export default async function handler(req, res) {
    // res.status(200).json(
    //     {
    //         title: "Donationboard Testing ",
    //         icon_url: "/River-04777.jpg",
    //         per_page: "30",
    //         sort_by: "donations",
    //     })
    const { cid } = req.query;

    try {
        console.log("req nom", req.body)
        const query = `SELECT title, icon_url, sort_by, coalesce(nullif(per_page, 0), 20), 'asc' as sort_type FROM boards WHERE channel_id=$1 AND type=$2`
        const values = [BigInt(cid), 'donation'] // req.body.content

      const result = await conn.query(
          query,
          values
      );
      console.log( "ttt",result.rows[0]);
      res.status(200).json(result.rows[0])
  } catch ( error ) {
      console.log( error );
  }

  };
  
