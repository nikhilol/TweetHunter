// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  console.log(req.query)
  const { username } = req.query


  console.log(username)
  const endpoint = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}`
  const twitterRes = await fetch(endpoint, {
    headers: {'Authorization': "Bearer AAAAAAAAAAAAAAAAAAAAAOD9EQEAAAAAvipSJivAOql%2Fn3%2F8YBUnbWm4c64%3Dp3lJZKY270PgQWfmxZ2DdNyIRLgahNU1UVd6BkKuMTWanoZmy1"}
  });
  const data = await twitterRes.json();
  res.send(data)
}
