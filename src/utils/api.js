import axios from 'axios';

function getProfile(username, params) {
    return axios.get(`https://api.github.com/users/${username}${params}`)
        .then(function(user) {
           return user.data;
        });
}

function getRepos(username, params) {
    return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

function getStarCount(repos) {
    return repos.data.reduce((count, repo) =>  {
        return count + repo.stargazers_count;
    }, 0);
}

function calculateScore(profile, repos) {
    let followers = profile.followers,
        totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError (error) {
    console.warn(error);
    return null;
}

function getUserData(player) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(function(data) {
        let profile = data[0],
            repos = data[1];

        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    })
}

function sortPLayers(players) {
    return players.sort((a,b) => {
       return b.score - a.score;
    });
}

export function fetchPopularRepos (language) {
    let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
        .then(response => response.data.items)
}

export function battle (players) {
    return axios.all(players.map(getUserData))
        .then(sortPLayers)
        .catch(handleError)
}

