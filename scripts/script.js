let points = 0;
let rounds = 0;
let tweets = ["#leftTweet", "#rightTweet"]; // will randomly choose one for donald vs. bot

$(document).ready(() => {

    $('#begin').click(function () {
        beginGame();
    }) 

});

async function beginGame() {
    // TODO
        // fill leftTweet and rightTweet with getRandomTweet() and getDonaldTweet()
    $('#begin').hide();
    $('#leftTweet').show();
    $('#rightTweet').show();
    $('#score').show();

    // 10 rounds
    while (rounds < 10) { 
        points += await playOneRound();
        $('#score').text("Score: " + points);
        
        rounds++;
    }

    // final points!
    $('#leftTweet').hide();
    $('#rightTweet').hide();

    // TODO change css of score to enlarggeeeennnn at the end!
    
}

function playOneRound() {
    return new Promise((resolve, reject) => {

        // fill one random div w donald
        let donaldTweetIndex = getRandomInt(2);
        console.log(donaldTweetIndex);
        let donaldTweetId = tweets[donaldTweetIndex];

        $(donaldTweetId).text(getDonaldTweet());

        // fill other div w bot
        let botTweetId = "#leftTweet";
        if (donaldTweetId == "#leftTweet") {
            botTweetId = "#rightTweet";
        } 

        $(botTweetId).text(getBotTweet());  

        // user chooses one! and earns a point or not
        $(donaldTweetId).click(function () {
            resolve(1);
        }) 

        $(botTweetId).click(function () {
            resolve(0);
        }) 

    });
}