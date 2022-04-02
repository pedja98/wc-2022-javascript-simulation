groupMatches = [];

const getWinner = (tmp) => {
  tmp = Math.floor(tmp / 2) + 1;
  let arrWinner = [-1, -1, 0, 0, 1, 1];
  while (tmp > 0) {
    arrWinner.push(1)
    tmp--;
  }
  while (tmp < 0) {
    arrWinner.push(-1)
    tmp++;
  }
  arrWinner.sort(() => Math.random() - 0.5);
  let id = Math.floor(Math.random() * arrWinner.length);
  return arrWinner[id];
}

const groupStage = (groups, first, second, third, fourth) => {
  for (let i = 0; i < 8; i++) {
    console.log("Group " + groups[i].group + '\n')

    let tmp = groups[i].groupInfo[first].team.ranking - groups[i].groupInfo[second].team.ranking
    let won = getWinner(tmp)
    let goals = (won !== 0) ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 5) * 2

    let game =
    {
      homeTeam: groups[i].groupInfo[first].team.name,
      awayTeam: groups[i].groupInfo[second].team.name,
      result: won,
      goalsHome: undefined,
      goalsAway: undefined
    }

    if (won === -1) {
      let g1 = Math.floor(Math.random() * goals);
      let g2 = goals - g1;
      game.goalsHome = (g1 > g2) ? g1 : g2;
      game.goalsAway = (g1 < g2) ? g1 : g2;

      groups[i].groupInfo[first].pld++;
      groups[i].groupInfo[first].w++;
      groups[i].groupInfo[first].gf += game.goalsHome
      groups[i].groupInfo[first].ga += game.goalsAway
      groups[i].groupInfo[first].pts += 3;

      groups[i].groupInfo[second].pld++;
      groups[i].groupInfo[second].l++;
      groups[i].groupInfo[second].ga += game.goalsHome
      groups[i].groupInfo[second].gf += game.goalsAway

    }
    else if (won === 1) {
      let g1 = Math.floor(Math.random() * goals);
      let g2 = goals - g1;
      game.goalsHome = (g1 < g2) ? g1 : g2;
      game.goalsAway = (g1 > g2) ? g1 : g2;

      groups[i].groupInfo[second].pld++;
      groups[i].groupInfo[second].w++;
      groups[i].groupInfo[second].ga += game.goalsHome
      groups[i].groupInfo[second].gf += game.goalsAway
      groups[i].groupInfo[second].pts += 3;

      groups[i].groupInfo[first].pld++;
      groups[i].groupInfo[first].l++;
      groups[i].groupInfo[first].gf += game.goalsHome
      groups[i].groupInfo[first].ga += game.goalsAway
    }
    else {
      game.goalsHome = goals / 2;
      game.goalsAway = goals / 2;

      groups[i].groupInfo[second].pld++;
      groups[i].groupInfo[second].d++;
      groups[i].groupInfo[second].gf += game.goalsHome
      groups[i].groupInfo[second].ga += game.goalsAway
      groups[i].groupInfo[second].pts += 1;

      groups[i].groupInfo[first].pld++;
      groups[i].groupInfo[first].d++;
      groups[i].groupInfo[first].ga += game.goalsHome
      groups[i].groupInfo[first].gf += game.goalsAway
      groups[i].groupInfo[first].pts += 1;
    }

    groupMatches.push(game)
    console.log(groups[i].groupInfo[first].team.name + " " + game.goalsHome + " : " + game.goalsAway + " " + groups[i].groupInfo[second].team.name)

    tmp = groups[i].groupInfo[third].team.ranking - groups[i].groupInfo[fourth].team.ranking
    won = getWinner(tmp)
    goals = (won != 0) ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 5) * 2

    game =
    {
      homeTeam: groups[i].groupInfo[third].team.name,
      awayTeam: groups[i].groupInfo[fourth].team.name,
      result: won,
      goalsHome: undefined,
      goalsAway: undefined
    }

    if (won === -1) {
      let g1 = Math.floor(Math.random() * goals);
      let g2 = goals - g1;
      game.goalsHome = (g1 > g2) ? g1 : g2;
      game.goalsAway = (g1 < g2) ? g1 : g2;

      groups[i].groupInfo[third].pld++;
      groups[i].groupInfo[third].w++;
      groups[i].groupInfo[third].gf += game.goalsHome
      groups[i].groupInfo[third].ga += game.goalsAway
      groups[i].groupInfo[third].pts += 3;

      groups[i].groupInfo[fourth].pld++;
      groups[i].groupInfo[fourth].l++;
      groups[i].groupInfo[fourth].ga += game.goalsHome
      groups[i].groupInfo[fourth].gf += game.goalsAway

    }
    else if (won === 1) {
      let g1 = Math.floor(Math.random() * goals);
      let g2 = goals - g1;
      game.goalsHome = (g1 < g2) ? g1 : g2;
      game.goalsAway = (g1 > g2) ? g1 : g2;

      groups[i].groupInfo[fourth].pld++;
      groups[i].groupInfo[fourth].w++;
      groups[i].groupInfo[fourth].ga += game.goalsHome
      groups[i].groupInfo[fourth].gf += game.goalsAway
      groups[i].groupInfo[fourth].pts += 3;

      groups[i].groupInfo[third].pld++;
      groups[i].groupInfo[third].l++;
      groups[i].groupInfo[third].gf += game.goalsHome
      groups[i].groupInfo[third].ga += game.goalsAway
    }
    else {
      game.goalsHome = goals / 2;
      game.goalsAway = goals / 2;

      groups[i].groupInfo[fourth].pld++;
      groups[i].groupInfo[fourth].d++;
      groups[i].groupInfo[fourth].gf += game.goalsHome
      groups[i].groupInfo[fourth].ga += game.goalsAway
      groups[i].groupInfo[fourth].pts += 1;

      groups[i].groupInfo[third].pld++;
      groups[i].groupInfo[third].d++;
      groups[i].groupInfo[third].ga += game.goalsHome
      groups[i].groupInfo[third].gf += game.goalsAway
      groups[i].groupInfo[third].pts += 1;
    }
    groupMatches.push(game)
    console.log(groups[i].groupInfo[third].team.name + " " + game.goalsHome + " : " + game.goalsAway + " " + groups[i].groupInfo[fourth].team.name + '\n')
  }
}

const endOfGroupStage = (groups) => {
  for (let i = 0; i < 8; i++) {
    console.log("Group " + groups[i].group + '\n')
    for (let j = 1; j <= 4; j++) {
      console.log(j + ". " + groups[i].groupInfo[j - 1].team.name + "("
        + groups[i].groupInfo[j - 1].team.ranking + ")   "
        + groups[i].groupInfo[j - 1].w + "   "
        + groups[i].groupInfo[j - 1].d + "   "
        + groups[i].groupInfo[j - 1].l + "   "
        + groups[i].groupInfo[j - 1].gf + ":" + groups[i].groupInfo[j - 1].ga + "   "
        + groups[i].groupInfo[j - 1].pts
      )
    }
    console.log()
  }
}

const main = () => {

  let groups = [
    {
      group: 'A', groupInfo: [
        { team: { name: "Qatar", ranking: 50 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Ecuador", ranking: 29 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Senegal", ranking: 28 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Netherlands", ranking: 37 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'B', groupInfo: [
        { team: { name: "England", ranking: 5 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Iran", ranking: 33 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "United States", ranking: 30 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Ukraine", ranking: 40 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'C', groupInfo: [
        { team: { name: "Argentina", ranking: 6 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Saudi Arabia", ranking: 34 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Mexico", ranking: 15 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Poland", ranking: 12 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'D', groupInfo: [
        { team: { name: "France", ranking: 3 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Peru", ranking: 17 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Denmark", ranking: 7 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Tunisia", ranking: 25 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'E', groupInfo: [
        { team: { name: "Spain", ranking: 10 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "New Zealand", ranking: 22 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Germany", ranking: 4 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Japan", ranking: 21 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'F', groupInfo: [
        { team: { name: "Belgium", ranking: 9 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Canada", ranking: 39 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Morocco", ranking: 27 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Croatia", ranking: 24 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'G', groupInfo: [
        { team: { name: "Brazil", ranking: 2 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Serbia", ranking: 1 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Switzerland", ranking: 44 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Cameroon", ranking: 18 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'H', groupInfo: [
        { team: { name: "Portugal", ranking: 13 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Ghana", ranking: 51 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Uruguay", ranking: 14 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "South Korea", ranking: 38 }, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
  ]

  console.log("Group stage: Matchday 1 of 3" + '\n')
  groupStage(groups, 0, 1, 2, 3);

  console.log("------------------------------------")
  console.log("Group stage: Matchday 2 of 3" + '\n')
  groupStage(groups, 0, 2, 1, 3);

  console.log("------------------------------------")
  console.log("Group stage: Matchday 3 of 3" + '\n')
  groupStage(groups, 0, 3, 1, 2);

  console.log("------------------------------------")
  console.log("End of the group stages")

  for(let i = 0; i< groups.length; i++) {
    groups[i].groupInfo.sort((a,b) => {
      return -1;
    })
  }

  endOfGroupStage(groups)
};

main();
