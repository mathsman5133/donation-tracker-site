import conn from '../../../lib/db'

export default async function handler(req, res) {
    const {cid} = req.query;

    try {
        console.log("req nom", req.body)
        const query = `SELECT DISTINCT player_name,
                                       players.clan_tag,
                                       players.fake_clan_tag,
                                       clans.emoji,
                                       donations,
                                       received,
                                       trophies,
                                       to_char(now() - last_updated, 'HH24h MIm') AS "last_online",
                                       CASE WHEN received = 0 THEN trunc(cast(donations as decimal), 2)
                                           ELSE trunc(cast(donations as decimal) / received,2)
                                       END ratio,
                                       trophies - start_trophies AS "gain"
                                FROM players
                                INNER JOIN clans
                                ON clans.clan_tag = players.clan_tag
                                WHERE clans.channel_id = $1
                                AND season_id = 35`
        const values = [BigInt(cid)] // req.body.content
        console.log(values, "hello");
      const result = await conn.query(
          query,
          values
      );
      console.log( "ttt",result);
      res.status(200).json(result.rows)
  } catch ( error ) {
      console.log( error );
  }

    // res.status(200).json(
    //   [
    //     {
    //       player_name: "fifteen letter",
    //       donations: 200,
    //       received: 400,
    //       last_online: "1d2h",
    //       clan_tag: "#2PG",
    //     },
    //     {
    //         player_name: "Belps",
    //         donations: 300,
    //         received: 500,
    //         last_online: "1d6h",
    //         clan_tag: "#2PG",
    //     },
    //     {
    //         player_name: "Shadow",
    //         donations: 8003,
    //         received: 2003,
    //         last_online: "1h7m",
    //         clan_tag: "#2PG",
    //     },
    //     {
    //         player_name: "Sbeve",
    //         donations: 14213,
    //         received: 2321,
    //         last_online: "1d2h",
    //         clan_tag: "#2PG",
    //     },
    //     {
    //       player_name: "Mathsman",
    //       donations: 200,
    //       received: 400,
    //       last_online: "1d2h",
    //       clan_tag: "#2PG",
    //     },
    //     {
    //         player_name: "Belps",
    //         donations: 300,
    //         received: 500,
    //         last_online: "1d6h",
    //         clan_tag: "#2PL",
    //     },
    //     {
    //         player_name: "Shadow",
    //         donations: 8003,
    //         received: 2003,
    //         last_online: "1h7m",
    //         clan_tag: "#2PL",
    //     },
    //     {
    //         player_name: "Sbeve",
    //         donations: 14213,
    //         received: 2321,
    //         last_online: "1d2h",
    //         clan_tag: "#2PL",
    //     },
    //     {
    //       player_name: "Mathsman",
    //       donations: 200,
    //       received: 400,
    //       last_online: "1d2h",
    //       clan_tag: "#2PL",
    //     },
    //     {
    //         player_name: "Belps",
    //         donations: 300,
    //         received: 500,
    //         last_online: "1d6h",
    //         clan_tag: "#2PL",
    //     },
    //     {
    //         player_name: "Shadow",
    //         donations: 8003,
    //         received: 2003,
    //         last_online: "1h7m",
    //     },
    //     {
    //         player_name: "Sbeve",
    //         donations: 14213,
    //         received: 2321,
    //         last_online: "1d2h",
    //     },
    //     {
    //         player_name: "Shadow",
    //         donations: 8003,
    //         received: 2003,
    //         last_online: "1h7m",
    //     },
    //     {
    //         player_name: "Sbeve",
    //         donations: 14213,
    //         received: 2321,
    //         last_online: "1d2h",
    //     },
    //     {
    //       player_name: "Mathsman",
    //       donations: 200,
    //       received: 400,
    //       last_online: "1d2h",
    //     },
    //     {
    //         player_name: "Belps",
    //         donations: 300,
    //         received: 500,
    //         last_online: "1d6h",
    //     },
    //     {
    //         player_name: "Shadow",
    //         donations: 8003,
    //         received: 2003,
    //         last_online: "1h7m",
    //     },
    //     {
    //         player_name: "Sbeve",
    //         donations: 14213,
    //         received: 2321,
    //         last_online: "1d2h",
    //     },
    //     {
    //         player_name: "Shadow",
    //         donations: 8003,
    //         received: 2003,
    //         last_online: "1h7m",
    //     },
    //     {
    //         player_name: "Sbeve",
    //         donations: 14213,
    //         received: 2321,
    //         last_online: "1d2h",
    //     },
    //     {
    //       player_name: "Mathsman",
    //       donations: 200,
    //       received: 400,
    //       last_online: "1d2h",
    //     },
    //     {
    //         player_name: "Belps",
    //         donations: 300,
    //         received: 500,
    //         last_online: "1d6h",
    //     },
    //     {
    //         player_name: "Shadow",
    //         donations: 8003,
    //         received: 2003,
    //         last_online: "1h7m",
    //     },
    //     {
    //         player_name: "Sbeve",
    //         donations: 14213,
    //         received: 2321,
    //         last_online: "1d2h",
    //     },

    //   ])
    };  