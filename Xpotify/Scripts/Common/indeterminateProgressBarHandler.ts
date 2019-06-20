﻿namespace InitScript.Common.IndeterminateProgressBarHandler {

    function trackLoadCheck(initialProgress) {
        try {
            var playbackBar = <HTMLElement>(document.querySelectorAll(".Root__now-playing-bar .playback-bar")[0]);
            var progressBarProgress = (<HTMLElement>(playbackBar.querySelectorAll(".progress-bar__fg")[0])).style.transform;

            if (progressBarProgress != initialProgress) {
                var progressBarBg = <HTMLElement>(playbackBar.querySelectorAll(".progress-bar__bg")[0]);
                var times = playbackBar.querySelectorAll(".playback-bar__progress-time");

                progressBarBg.style.opacity = '1';
                (<HTMLElement>(times[0])).style.opacity = '1';
                (<HTMLElement>(times[1])).style.opacity = '1';
                (<HTMLElement>(document.querySelectorAll(".playbackBar-indeterminateprogressbar")[0])).style.display = 'none';
            } else {
                setTimeout(function () {
                    trackLoadCheck(initialProgress);
                }, 250);
            }
        } catch (ex) {
            console.log("trackLoadCheck failed.", ex);
        }
    }

    export function onTrackLoadBegin() {
        try {
            var playbackBar = <HTMLElement>(document.querySelectorAll(".Root__now-playing-bar .playback-bar")[0]);
            var progressBarBg = <HTMLElement>(playbackBar.querySelectorAll(".progress-bar__bg")[0]);
            var times = playbackBar.querySelectorAll(".playback-bar__progress-time");

            progressBarBg.style.opacity = '0';
            (<HTMLElement>(times[0])).style.opacity = '0';
            (<HTMLElement>(times[1])).style.opacity = '0';

            (<HTMLElement>(document.querySelectorAll(".playbackBar-indeterminateprogressbar")[0])).style.display = 'block';

            setTimeout(function () {
                var progressBarProgress = (<HTMLElement>(playbackBar.querySelectorAll(".progress-bar__fg")[0])).style.transform;

                if (progressBarProgress.indexOf("translate") == -1) {
                    // Something's wrong. Will ignore progress bar
                    progressBarBg.style.opacity = '1';
                    (<HTMLElement>(times[0])).style.opacity = '1';
                    (<HTMLElement>(times[1])).style.opacity = '1';
                    console.log("onTrackLoadBegin failed, and reverted changes.")
                    return;
                }

                setTimeout(function () {
                    trackLoadCheck(progressBarProgress);
                }, 250);
            }, 250);
        } catch (ex) {
            console.log("onTrackLoadBegin failed.", ex);
        }
    }
}