import Head from "next/head";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
  
            <main className={styles.main}>
                <Box component="form">
                    <div><TextField required id="Title" label="Board Title" variant="outlined" /></div>
                    <div><TextField id="Background URL" label="Background URL" variant="outlined"/></div>
                </Box>   
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">
                        Next.js!</a> integrated with{" "}
                    <a href="https://mui.com/">Material-UI!</a>
                </h1>
                <p className={styles.description}>
                    Get started by editing{" "}
                    <code className={styles.code}>
                        pages/index.js</code>
                </p>
  
            </main>
        </div>
    );
}