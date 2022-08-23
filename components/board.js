import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Image from "next/image";
import boardStyles from "../styles/boards.module.css";


function Board(props) {
    const defaultImage = "https://cdn.discordapp.com/attachments/681438398455742536/768684688100687882/snowyfield2.png";
    console.log(props.playerData);

    const getHeaderSelected = name => {return props.boardMeta.sort_by == name ? boardStyles.selected: boardStyles.th}
    const getRowSelected = name => {return props.boardMeta.sort_by == name ? boardStyles.selected: boardStyles.td}
    const getSelectedPlayersFunc = player => {return props.clanData.some(r => r.checked && r.clan_tag == player.clan_tag)}

    return (
        <body>
            {/* <Container>                 */}
            <div className={boardStyles.container2}>
                <header className={boardStyles.header}>{props.boardMeta.title}</header>
                <Image 
                    className={boardStyles.bgimg}
                    layout="fill"
                    height="100%"
                    width="100%"
                    src={props.boardMeta.icon_url ?? defaultImage} 
                    alt="Tes3t"/>

                <table className={boardStyles.table}>
                    <tr className={boardStyles.tr}>
                        <th className={boardStyles.th}>#</th>
                        <th className={getHeaderSelected("player_name")}>Player Name</th>
                        <th className={getHeaderSelected("donations")}>Dons</th>
                        <th className={getHeaderSelected("received")}>Rec</th>
                        <th className={getHeaderSelected("ratio")}>Ratio</th>
                        <th className={getHeaderSelected("last_online ASC")}>Last On</th>
                    </tr>

                    {props.playerData.filter(player => getSelectedPlayersFunc(player)).slice(0,props.boardMeta.per_page).map((player, idx) => (
                        <tr className={boardStyles.tr} key={idx}>
                            <td className={boardStyles.td}>{idx+1}.</td>
                            <td className={getRowSelected("player_name")}>{player.player_name}</td>
                            <td className={getRowSelected("donations")}>{player.donations}</td>
                            <td className={getRowSelected("received")}>{player.received}</td>
                            <td className={getRowSelected("ratio")}>{player.ratio}</td>
                            <td className={getRowSelected("last_online ASC")}>{player.last_online}</td>
                        </tr>
                    ))
                    }                
                </table>
                </div>
            {/* </Container> */}
            </body>

        
    );
  }
  
  export default Board;