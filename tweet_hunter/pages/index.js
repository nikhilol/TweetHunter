import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Input} from '@chakra-ui/react'

const endpoint = 'https://rickandmortyapi.com/api/character'

export async function getServerSideProps({}){
  const res = await fetch(endpoint, {
    headers: {Authentication: 'Bearer Token'}
  });
  const data = await res.json();
  return {
    props:{data}
  }
}

export default function Home(props) {
  console.log(props.data.results)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
      <div style={{display:'flex', alignItems:'center'}}>
        <div style={{marginRight:'0.5 rem'}}>Handle:</div>
        <Input placeholder='@' size='sm'></Input>
      </div>
      <ul className={styles.grid}>
        {
          props.data.results.map(result=> <li className={styles.card}>{result.name}</li> )
        }
      </ul>
    </div>
  )
}
