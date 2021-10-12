import styles from "../styles/Home.module.css";
import { memo } from "react";
import { Image, Text, Link, HStack, VStack, Divider } from "@chakra-ui/react";

export const Tweet = memo((props) => {
	return (
		<li className={styles.card}>
			<Link
				textDecoration="none !important"
				href={`https://twitter.com/${props.data.user.screen_name}/status/${props.data.id_str}`}
                isExternal
			>
				<VStack spacing={5} align={"flex-start"}>
					<HStack>
						<Image borderRadius="full" src={props.data.user.profile_image_url_https}></Image>
						<VStack spacing="0" align={"flex-start"}>
							<Text>{props.data.user.name}</Text>
							<Link href={`https://twitter.com/${props.data.user.screen_name}`} color="gray.400">
								@{props.data.user.screen_name}
							</Link>
						</VStack>
					</HStack>
					<p>
						{props.data.retweeted_status
							? props.data.retweeted_status.full_text
							: props.data.full_text || props.data.text}
					</p>
				</VStack>
				<Divider marginTop="2vh"></Divider>
				<HStack justifyContent={'space-between'} paddingTop="2vh">
					<HStack>
						<div>{"❤ " + props.data.favorite_count}</div>
						<div>{"🔁 " + props.data.retweet_count}</div>
					</HStack>
                    <Text color="gray.400">{props.data.created_at.split('+')[0].slice(0, -4)}</Text>
				</HStack>
			</Link>
		</li>
	);
});