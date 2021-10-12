// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { username, count, retweets, replies } = req.query

  const endpoint = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&include_rts=${retweets}&count=${count}&exclude_replies=${!replies}`
  const twitterRes = await fetch(endpoint, {
    headers: {'Authorization': "Bearer " + process.env.TWITTER_TOKEN}
  });
  const data = await twitterRes.json();
  res.send(data)
}

