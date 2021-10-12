// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { username, count, retweets, replies } = req.query

  console.log('RT:' + retweets)
  console.log(replies)

  const endpoint = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&include_rts=${retweets==='true'}&count=${count}&exclude_replies=${replies!=='true'}`
  const twitterRes = await fetch(endpoint, {
    headers: {'Authorization': "Bearer " + process.env.TWITTER_TOKEN}
  });
  const data = await twitterRes.json();
  res.send(data)
}

