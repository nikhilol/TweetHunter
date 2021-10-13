import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Index.module.css";
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
import { useState } from "react";
import {Tweet} from "../Components/Tweet";

export default function Home(props) {

	const [username, setUsername] = useState(null);
	const [tweets, setTweets] = useState(null);
	const [sliderVal, setSliderVal] = useState(100);
  const [retweets, setRetweets] = useState(false)
  const [replies, setReplies] = useState(false)

	async function fetchTweets() {
    if(username){
      let res = await fetch(`/api/data?username=${username}&count=${sliderVal}&retweets=${retweets}&replies=${replies}`);
      let data = await res.json();
      if(data.length){
        let sortedData = Sort(data)
        setTweets(sortedData);
      } else{
        alert('There was an error getting the tweets! Please check the handle is correct...')
      }
    } else{
      alert('You need to enter a handle!')
    }
	}

  function Sort(data){
    let sorted = data.sort((a,b)=> calculate(a,b))
    return sorted
  }

  function calculate(a,b){
    return (b.favorite_count + b.retweet_count*2) < (a.favorite_count + a.retweet_count*2) 
    ? - 1 
    : Number((b.favorite_count + b.retweet_count*2) > (a.favorite_count + a.retweet_count*2))
  }

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Popular Tweets ⭐</h3>
			<div className={styles.inputContainer}>
				<Input onChange={(e) => setUsername(e.target.value)} placeholder="Twitter Handle" size="sm"></Input>
				<Button
					onClick={fetchTweets}
					size="sm"
					borderRadius= "3px"
          marginLeft= "0.5vw"
					background="cyan.400"
					color="white"
				>
					Search
				</Button>
			</div>
			<Text className={styles.inputLabel}>Number of tweets to search:</Text>
			<div id="slider-track-1" className={styles.sliderContainer}>
				<Slider id='slider-track-1' defaultValue={100} min={1} step={1} max={200} onChange={(val) => setSliderVal(val)}>
					<SliderTrack  bg="gray.100">
						<SliderFilledTrack bg="cyan.400" />
					</SliderTrack>
					<SliderThumb boxSize={6} borderRadius="sm">
						<Image outline='none' src={'/TwitterLogo.png'} layout="fill"></Image>
					</SliderThumb>
				</Slider>
				<div className={styles.sliderLabel}>{sliderVal}</div>
			</div>
      <HStack className={styles.checkboxContainer} spacing={10}>
        <Checkbox onChange={(e)=>{setRetweets(e.target.checked)}}>Include RTs</Checkbox>
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
