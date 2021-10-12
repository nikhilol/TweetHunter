import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
	Input,
	Button,
	Slider,
	SliderThumb,
	SliderTrack,
	SliderFilledTrack,
	Text,
  Checkbox,
  HStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {Tweet} from "../Components/Tweet";
import Logo from "../Static/TwitterLogo.png";

export default function Home(props) {
	const [username, setUsername] = useState(null);
	const [tweets, setTweets] = useState(null);
	const [embeds, setEmbeds] = useState(null);
	const [count, setCount] = useState(100);
  const [retweets, setRetweets] = useState(false)
  const [replies, setReplies] = useState(false)

	async function fetchTweets() {
		let res = await fetch(`/api/data?username=${username}&count=${count}&retweets=${retweets}&replies=${replies}`);
		let data = await res.json();
    console.log(data)
    let sortedData = Sort(data)
		setTweets(sortedData);
	}

  function Sort(data){
    let sorted = data.sort((a,b)=> b.favorite_count < a.favorite_count ? - 1 : Number(b.favorite_count > a.favorite_count))
    return sorted
  }

	return (
		<div className={styles.container}>
			<h1 className={styles.title} style={{marginBottom:'2vh'}}>Title</h1>
			<div className={styles.InputContainer}>
				<div className={styles.InputLabel}>Handle:</div>
				<Input onChange={(e) => setUsername(e.target.value)} placeholder="@" size="sm"></Input>
				<Button
					onClick={fetchTweets}
					borderRadius= "3px"
          marginLeft= "0.5vw"
					size="sm"
					background="cyan.400"
					color="white"
				>
					Search
				</Button>
			</div>
			<Text marginTop='2vh'>Number of tweets to search:</Text>
			<div id="slider-track-1" className={styles.InputContainer} style={{width: "30%"}}>
				<Slider id='slider-track-1' defaultValue={100} min={1} step={1} max={200} onChange={(val) => setCount(val)}>
					<SliderTrack  bg="gray.100">
						<SliderFilledTrack bg="cyan.400" />
					</SliderTrack>
					<SliderThumb boxSize={6} borderRadius="sm">
						<Image outline='none' src={Logo}></Image>
					</SliderThumb>
				</Slider>
				<div style={{marginLeft:'0.5vw'}}>{count}</div>
			</div>
      <HStack marginTop='1vw'>
        <Checkbox onChange={(e)=>{setRetweets(e.target.checked)}}>Include RT's</Checkbox>
        <Checkbox onChange={(e)=>{setReplies(e.target.checked)}}>Include Replies</Checkbox>
      </HStack>
			<ul className={styles.grid}>
				{tweets &&
					tweets.map((tweet) => {
						return <Tweet data={tweet}></Tweet>;
					})}
			</ul>
		</div>
	);
}
