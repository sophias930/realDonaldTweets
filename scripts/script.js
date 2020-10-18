let points = 0;
let rounds = 1;
let tweets = ["#leftp", "#rightp"]; // will randomly choose one for donald vs. bot

let FakeTweetsFormatted = [];
let RealTweetsFormatted = [];
$(document).ready(() => {
    FakeTweetsFormatted = fakeTweets.split('\n');
    RealTweetsFormatted = realTweets.split('\n');

    $('#begin').click(function () {
        beginGame();
    })

});

async function beginGame() {
    // fill leftTweet and rightTweet with getRandomTweet() and getDonaldTweet()
    $('#begin').hide();
    $('#description').hide();
    $('#instructions').show();

    $('.twitter-tweet').show();
    $('.twitter-tweet').css("display", "inline-block");

    $('#score').show();

    // 10 rounds
    while (rounds < 11) {
        points += await playOneRound();
        $('#score').html("<b>Score: " + points+"</b>");
        rounds++;
        $('#instructions').text("Click the tweet you think is real! (" + rounds + "/10)");
    }

    // final points!
    $('.twitter-tweet').hide();
    $('#instructions').hide();

    $('#score').addClass("twitter-tweet");
    $('#score').css("display", "inline-block");
    $('#score').html("Your final score is " + points + "/10!");

}

function playOneRound() {
    return new Promise((resolve, reject) => {

        // fill one random div w donald
        let donaldTweetIndex = getRandomInt(2);
        console.log(donaldTweetIndex);
        let donaldTweetIdPar = tweets[donaldTweetIndex];
        let donaldTweetId = "";

        $(donaldTweetIdPar).html(getDonaldTweet());

        // fill other div w bot
        let botTweetIdPar = "#leftp";
        let botTweetId = "#leftTweet";
        donaldTweetId = "#rightTweet";
        if (donaldTweetIdPar == "#leftp") {
            botTweetIdPar = "#rightp";
            botTweetId = "#rightTweet";
            donaldTweetId = "#leftTweet";
        }

        $(botTweetIdPar).html(getBotTweet());

        // user chooses one! and earns a point or not
        $(donaldTweetId).click(function () {
            $(donaldTweetId).addClass('correctAnswer');
            setTimeout(function () {
                $(donaldTweetId).removeClass('correctAnswer');

                $(botTweetId).off();
                $(donaldTweetId).off();

                resolve(1);
            }, 2000);
        })

        $(botTweetId).click(function () {
            $(botTweetId).addClass('incorrectAnswer');
            $(donaldTweetId).addClass('correctAnswer');

            setTimeout(function () {
                $(botTweetId).removeClass('incorrectAnswer');
                $(donaldTweetId).removeClass('correctAnswer');

                $(botTweetId).off();
                $(donaldTweetId).off();

                resolve(0);
            }, 2000);
        })

    });
}