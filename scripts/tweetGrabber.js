// functions to get tweets

function getDonaldTweet() {
    return RealTweetsFormatted[Math.floor(Math.random() * RealTweetsFormatted.length)];
}

function getBotTweet() {
    return FakeTweetsFormatted[Math.floor(Math.random() * FakeTweetsFormatted.length)];
}