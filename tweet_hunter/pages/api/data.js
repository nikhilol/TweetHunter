// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  console.log(req.query)
  const { username, count, retweets, replies } = req.query
  console.log('RT: ' + retweets)
  console.log('Replies: ' + replies)

  const endpoint = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&include_rts=${retweets}&count=${count}&exclude_replies=${!replies}`
  const twitterRes = await fetch(endpoint, {
    headers: {'Authorization': "Bearer AAAAAAAAAAAAAAAAAAAAAOD9EQEAAAAAasc8XCY3KesPdYFiLXQrq7gxVWE%3DdsiQZIPEmu1MGqrbfCiEXAbAk5uymBnDbrCfkb3iZOHhLBYXBQ"}
  });
  const data = await twitterRes.json();
  res.send(data)
}
