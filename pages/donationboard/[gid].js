import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import { Typography } from "@mui/material";
import Board from '../../components/board';
import { useRouter } from 'next/router';


export default function Home() {
    const router = useRouter();
    const { cid, gid } = router.query;

    const [boardMeta, setBoardMeta] = React.useState({});
    const [clanTagsChecked, setClanCheckedState] = React.useState([]);
    const [playerData, setPlayerData] = React.useState([])

    const [dataLoading, setDataLoading] = React.useState(true)
    const [clanLoading, setClanLoading] = React.useState(true)
    const [playerLoading, setPlayerLoading] = React.useState(true)
    
    React.useEffect(() => {
        if (!router.isReady) {return};
        setDataLoading(true);
        setClanLoading(true);
        setPlayerLoading(true);

        fetch(`../api/getBoardMeta/${cid}`)
           .then(response => response.json())
           .then(boardMeta => {
                console.log(boardMeta);
                setBoardMeta(boardMeta);
                setDataLoading(false);
           });
        fetch(`../api/getClansWithBoard/${cid}?gid=${gid}`)
           .then(response => response.json())
           .then(clanData => {
                console.log(clanData);
                setClanCheckedState(clanData);
                setClanLoading(false);
            });
        fetch(`../api/getBoardPlayers/${cid}?gid=${gid}`)
            .then(response => response.json())
            .then(playerData => {
                console.log(playerData);
                const newPlayerData = playerData.sort((a, b) => (b.donations - a.donations))
                setPlayerData(newPlayerData);
                setPlayerLoading(false);
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [router.isReady]) 

     const handleBoardMetaChange = type => event => {
        const meta = {...boardMeta};
        meta[type] = event.target.value;
        setBoardMeta(meta);
        console.log(meta);

        if (type == "sort_by" || type == "sort_type") {
            // if (event.target.value == "ratio") {
            //     const newPlayerData = playerData.sort((a, b) => a.donations/a.received - b.donations/b.received)*(meta.sort_type == "asc" ? 1:-1)                
            //     setPlayerData(newPlayerData);
            // } else {
                const newPlayerData = playerData.sort((a, b) => (b[meta.sort_by] - a[meta.sort_by])*(meta.sort_type == "asc" ? -1:1))
                setPlayerData(newPlayerData);
            // }

        }
    }

    const handleClanChange = idx => event => {
        console.log(clanTagsChecked);
        const rows = [...clanTagsChecked];
        rows[idx] = {
            clan_tag: clanTagsChecked[idx].clan_tag,
            clan_name: clanTagsChecked[idx].clan_name,
            checked: event.target.checked
        }
        setClanCheckedState(rows);
    }

    const onSubmit = (event) => {

    };

    if (dataLoading | clanLoading | playerLoading) {
        return <div>Loading...</div>
    }
    
    return (
        <div className={styles.container}>
            <Head>
                <title>Donationbot Board Editor</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
  

            <main className={styles.main}>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <Image 
                    src="https://cdn.discordapp.com/avatars/427301910291415051/8fd702a4bbec20941c72bc651279c05c.webp"
                    height={50} 
                    width={50} 
                    // layout="responsive" 
                    alt="demo board"/>
                <h1>Donation Tracker Board Editor</h1>
            </div>  

            <Grid container spacing={2} maxWidth="full">
            <Grid item xs={12} sm={4}>
                <Box component="form" onSubmit={onSubmit}>
                    <Grid container spacing={2} maxWidth="sm" justifyContent="flex-start">
                        <Grid item xs={12}>
                            <TextField 
                                required 
                                fullWidth 
                                autoFocus 
                                id="Title" 
                                label="Board Title" 
                                variant="outlined"
                                value={boardMeta.title}
                                onChange={handleBoardMetaChange("title")}/>
                        </Grid>
                        <Grid item xs={12}>                  
                            <TextField 
                                fullWidth 
                                id="Background URL" 
                                label="Background URL" 
                                variant="outlined" 
                                onChange={handleBoardMetaChange("icon_url")} 
                                value={boardMeta.icon_url}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="players-per-page-select-label">Players Per Page</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={boardMeta.per_page}
                                label="Players Per Page"
                                onChange={handleBoardMetaChange("per_page")}
                            >
                                <MenuItem value={"5"}>5</MenuItem>
                                <MenuItem value={"10"}>10</MenuItem>
                                <MenuItem value={"20"}>20</MenuItem>
                                <MenuItem value={"25"}>25</MenuItem>
                                <MenuItem value={"30"}>30</MenuItem>
                                <MenuItem value={"50"}>50</MenuItem>
                            </Select>

                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="sort-by-select-label">Sort By</InputLabel>
                            <Select
                                fullWidth
                                labelId="sort-by-select-label"
                                id="sort-by-select"
                                value={boardMeta.sort_by}
                                label="Sort By"
                                onChange={handleBoardMetaChange("sort_by")}
                            >
                                <MenuItem value={"donations"}>Donations</MenuItem>
                                <MenuItem value={"received"}>Received</MenuItem>
                                <MenuItem value={"ratio"}>Ratio</MenuItem>
                                <MenuItem value={"last_online ASC"}>Last Online</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="sort-type-select-label">Sort Type</InputLabel>
                            <Select
                                fullWidth
                                labelId="sort-type-select-label"
                                id="sort-type-select"
                                value={boardMeta.sort_type}
                                label="Sort Type"
                                onChange={handleBoardMetaChange("sort_type")}
                            >
                                <MenuItem value={"asc"}>Ascending</MenuItem>
                                <MenuItem value={"desc"}>Descending</MenuItem>
                            </Select>
                        </Grid>

                    </Grid>

                </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
                {/* <div className={styles.boardShrink}> */}
                {/* <div> */}
                    <Board boardMeta={boardMeta} playerData={playerData} clanData={clanTagsChecked} maxWidth/>
                {/* </div> */}
            </Grid>

            <Grid item xs={12} sm={4}>
                <h4>Clans added</h4>
                <FormGroup>
                    {clanTagsChecked.map((item, idx) => (
                        <FormControlLabel 
                            key={idx}
                            control={
                                <Checkbox 
                                    checked={clanTagsChecked[idx].checked} 
                                    onChange={handleClanChange(idx)} 
                                />} 
                            label={`${item.clan_name} (${item.clan_tag})`} />
                        ))
                    }
                </FormGroup>
            </Grid>

            </Grid>

            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{mt: 2, alignItems: "center", maxWidth: "sm"}}                
                >
                    Save
            </Button>
  
            </main>
        </div>
    );
}