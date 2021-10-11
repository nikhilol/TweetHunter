import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Input, Button} from '@chakra-ui/react'
import { useEffect, useState } from 'react'




export default function Home(props) {

  const[username,  setUsername] = useState(null)
  const[tweets,  setTweets] = useState(null)

  async function fetchTweets(){
    let res = await fetch('/api/data?username=' + username)
    let data = await res.json()
    console.log(data)
    setTweets(data)
  }

  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
      <div className={styles.InputContainer}>
        <div className={styles.InputLabel}>Handle:</div>
        <Input onChange={(e)=>setUsername(e.target.value)} placeholder='@' size='sm'></Input>
        <Button onClick={fetchTweets} style={{borderRadius:'3px', marginLeft:'0.5vw'}} size='sm' background='cyan.400' color='white'>Search</Button>
      </div>
      <ul className={styles.grid}>
        { tweets &&
          tweets.map(tweet=>{
            return(
              <li className={styles.card}>{tweet.retweeted_status ? tweet.retweeted_status.full_text : tweet.full_text}</li>
            )
          })
        }
      </ul>
    </div>
  )
}
