function printScore() {

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // Sort Scores in Descending Order
    highscores.sort(function(a, b) {
        return b.score - a.score;
      });
    
    highscores.forEach(function(score) {
        // create li tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + "-" +score.score;

        // Display on the Page
        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

function clearHighscore() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighscore;

//Print Scores when page loads
printScore();