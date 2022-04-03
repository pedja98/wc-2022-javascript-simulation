let groupMatches = [];
let knockoutMatches = [];

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

const getResult = (team1, team2, maxGoalsScored) => {
  let tmp = team1.ranking - team2.ranking
  let won = getWinner(tmp)
  let goals = (won !== 0) ? Math.floor(Math.random() * (maxGoalsScored - 1) + 1) : Math.floor(Math.random() * maxGoalsScored / 2) * 2

  let game = {
    homeTeam: team1.name,
    awayTeam: team2.name,
    result: won,
    goalsHome: undefined,
    goalsAway: undefined,
  }
  if (won === -1) {
    let g1 = Math.floor(Math.random() * goals);
    if (g1 === goals / 2) {
      g1++;
    }
    let g2 = goals - g1;
    game.goalsHome = (g1 > g2) ? g1 : g2;
    game.goalsAway = (g1 < g2) ? g1 : g2;
  }
  else if (won === 1) {
    let g1 = Math.floor(Math.random() * goals);
    if (g1 === goals / 2) {
      g1++;
    }
    let g2 = goals - g1;
    game.goalsHome = (g1 < g2) ? g1 : g2;
    game.goalsAway = (g1 > g2) ? g1 : g2;
  }
  else {
    game.goalsHome = goals / 2;
    game.goalsAway = goals / 2;
  }

  if (maxGoalsScored === 10) {
    game.firstHalfGoalsHome = Math.floor(Math.random() * (game.goalsHome + 1))
    game.firstHalfGoalsAway = Math.floor(Math.random() * (game.goalsAway + 1))
  }

  return game;
}

const playGameGroupStage = (group, first, second) => {
  let game = getResult(group.groupInfo[first].team, group.groupInfo[second].team, 10)

  if (game.result === -1) {

    group.groupInfo[first].w++;
    group.groupInfo[first].gf += game.goalsHome
    group.groupInfo[first].ga += game.goalsAway
    group.groupInfo[first].pts += 3;

    group.groupInfo[second].l++;
    group.groupInfo[second].ga += game.goalsHome
    group.groupInfo[second].gf += game.goalsAway
  }
  else if (game.result === 1) {

    group.groupInfo[second].w++;
    group.groupInfo[second].ga += game.goalsHome
    group.groupInfo[second].gf += game.goalsAway
    group.groupInfo[second].pts += 3;

    group.groupInfo[first].l++;
    group.groupInfo[first].gf += game.goalsHome
    group.groupInfo[first].ga += game.goalsAway
  }
  else {
    group.groupInfo[second].d++;
    group.groupInfo[second].gf += game.goalsHome
    group.groupInfo[second].ga += game.goalsAway
    group.groupInfo[second].pts += 1;

    group.groupInfo[first].d++;
    group.groupInfo[first].ga += game.goalsHome
    group.groupInfo[first].gf += game.goalsAway
    group.groupInfo[first].pts += 1;
  }
  groupMatches.push(game)
  console.log(group.groupInfo[first].team.name + " " + game.goalsHome + " : " + game.goalsAway + " " + group.groupInfo[second].team.name)
  console.log("First Half")
  console.log("{" + group.groupInfo[first].team.name + " " + game.firstHalfGoalsHome + " : " + game.firstHalfGoalsAway + " " + group.groupInfo[second].team.name + "}\n")
}

const groupStage = (groups, first, second, third, fourth) => {
  for (let i = 0; i < 8; i++) {
    console.log("\nGroup " + groups[i].group)
    playGameGroupStage(groups[i], first, second)
    playGameGroupStage(groups[i], third, fourth)
  }
}

const sortFun = (a, b) => {
  if (a.pts > b.pts) {
    return -1;
  }
  else if (a.pts < b.pts) {
    return 1;
  }
  else {
    if ((a.gf - a.ga) > (b.gf - b.ga)) {
      return -1;
    }
    else if ((a.gf - a.ga) < (b.gf - b.ga)) {
      return 1;
    }
    else {
      if (a.gf > b.gf) {
        return -1;
      }
      else if (a.gf < b.gf) {
        return 1;
      }
      else {
        let tmp;
        groupMatches.forEach((elem) => {
          if ((elem.homeTeam == a.team.name && elem.awayTeam == b.team.name) ||
            (elem.homeTeam == b.team.name && elem.awayTeam == a.team.name)) {
            tmp = elem;
          }
        });
        if (tmp.result === -1) {
          return 1;
        }
        else if (tmp.result === 1) {
          return -1
        }
        else {
          let tmp = Math.floor(Math.random() * 11);
          if (tmp < 5) {
            return 1;
          }
          else {
            return -1;
          }
        }
      }
    }
  }
}

const endOfGroupStage = (groups) => {
  let sw = true;
  let j = 0;
  for (let i = 0; i < groups.length; i++) {
    groups[i].groupInfo.sort(sortFun)

    console.log("Group " + groups[i].group + '\n')
    for (let j = 1; j <= groups[i].groupInfo.length; j++) {
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
    if (sw) {
      knockoutMatches[j].homeTeam = groups[i].groupInfo[0].team
      knockoutMatches[j + 4].awayTeam = groups[i].groupInfo[1].team
    }
    else {
      knockoutMatches[j].awayTeam = groups[i].groupInfo[1].team
      knockoutMatches[j + 4].homeTeam = groups[i].groupInfo[0].team
      j++;
    }
    sw = !sw;
  }
}

const knockoutStage = () => {
  let cnt = 0;
  while (knockoutMatches.length > 1) {
    if (cnt === 0) {
      console.log("****************")
      console.log("Round of 16");
    }
    else if (cnt === 1) {
      console.log("****************")
      console.log("Quarter-finals");
    }
    else {
      console.log("****************")
      console.log("Semi-finals");
    }
    cnt++;
    let tmpArr = [];
    for (let i = 0; i < knockoutMatches.length; i += 2) {
      console.log("-------------------------------")
      let team1 = playGameKnockoutStage(knockoutMatches[i].homeTeam, knockoutMatches[i].awayTeam);
      console.log("-------------------------------")
      let team2 = playGameKnockoutStage(knockoutMatches[i + 1].homeTeam, knockoutMatches[i + 1].awayTeam);
      tmp = {
        homeTeam: team1,
        awayTeam: team2,
        result: undefined,
      }
      tmpArr.push(tmp)
    }
    knockoutMatches = tmpArr
  }
  console.log("****************")
  console.log("Final")
  let winner = playGameKnockoutStage(knockoutMatches[0].homeTeam, knockoutMatches[0].awayTeam);
  console.log("\n\nWinner of wc 2022 is " + winner.name + "\n\n");

}

const playGameKnockoutStage = (team1, team2) => {
  let game = getResult(team1, team2, 10)
  if (game.result === -1) {
    console.log(team1.name + " " + game.goalsHome + " : " + game.goalsAway + " " + team2.name)
    console.log("First Half")
    console.log("{" + team1.name + " " + game.firstHalfGoalsHome + " : " + game.firstHalfGoalsAway + " " + team2.name + "}\n")
    return team1;
  }
  else if (game.result === 1) {
    console.log(team1.name + " " + game.goalsHome + " : " + game.goalsAway + " " + team2.name)
    console.log("First Half")
    console.log("{" + team1.name + " " + game.firstHalfGoalsHome + " : " + game.firstHalfGoalsAway + " " + team2.name + "}\n")
    return team2;
  }
  else {
    let game2 = getResult(team1, team2, 3)
    game.goalsHome += game2.goalsHome
    game.goalsAway += game2.goalsAway
    console.log(team1.name + " " + game.goalsHome + " : " + game.goalsAway + " " + team2.name);
    console.log("First Half")
    console.log("{" + team1.name + " " + game.firstHalfGoalsHome + " : " + game.firstHalfGoalsAway + " " + team2.name + "}")
    console.log("Extra time");
    console.log(team1.name + " " + game2.goalsHome + " : " + game2.goalsAway + " " + team2.name);
    if (game2.result === -1) {
      return team1
    }
    else if (game2.result === 1) {
      return team2
    }
    else {
      console.log("Penalties");
      return penalties(team1, team2)
    }
  }
}

const penalties = (team1, team2) => {
  let goalsTeam1 = 0;
  let goalsTeam2 = 0;
  let won = 0;
  let firstRound = true;

  while (won === 0) {
    for (let i = 0; i < 10; i++) {
      let penalty = Math.round(Math.random())
      if (firstRound) {
        if (i % 2 === 0) {
          goalsTeam1 += penalty;
        }
        else {
          goalsTeam2 += penalty;

          if (goalsTeam1 > goalsTeam2) {
            if (goalsTeam1 - goalsTeam2 === 3) {
              won = -1;
              break;
            }
            if (goalsTeam1 - goalsTeam2 === 2 && goalsTeam1 === 4) {
              won = -1;
              break;
            }
          }
          if (goalsTeam2 > goalsTeam1) {
            if (goalsTeam2 - goalsTeam1 === 3) {
              won = 1;
              break;
            }
            if (goalsTeam2 - goalsTeam1 === 2 && goalsTeam2 === 4) {
              won = 1;
              break;
            }
          }
        }
      }
      else {
        if (i % 2 === 0) {
          goalsTeam1 += penalty;
        }
        else {
          goalsTeam2 += penalty;

          if (goalsTeam1 > goalsTeam2) {
            won = -1;
            break
          }
          if (goalsTeam2 > goalsTeam1) {
            won = 1
            break;
          }
        }
      }
    }
    if (firstRound) {
      firstRound = false
      if (goalsTeam1 > goalsTeam2) {
        won = -1;
        break
      }
      if (goalsTeam2 > goalsTeam1) {
        won = 1
        break;
      }
    }
  }

  console.log(team1.name + " " + goalsTeam1 + " : " + goalsTeam2 + " " + team2.name + '\n');
  return (won == -1) ? team1 : team2;
}

const main = () => {

  let groups = [
    {
      group: 'A', groupInfo: [
        { team: { name: "Qatar", ranking: 50 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Ecuador", ranking: 29 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Senegal", ranking: 28 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Netherlands", ranking: 37 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'B', groupInfo: [
        { team: { name: "England", ranking: 5 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Iran", ranking: 33 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "United States", ranking: 30 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Ukraine", ranking: 40 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'C', groupInfo: [
        { team: { name: "Argentina", ranking: 6 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Saudi Arabia", ranking: 34 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Mexico", ranking: 15 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Poland", ranking: 12 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'D', groupInfo: [
        { team: { name: "France", ranking: 3 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Peru", ranking: 17 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Denmark", ranking: 7 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Tunisia", ranking: 25 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'E', groupInfo: [
        { team: { name: "Spain", ranking: 10 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "New Zealand", ranking: 22 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Germany", ranking: 4 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Japan", ranking: 21 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'F', groupInfo: [
        { team: { name: "Belgium", ranking: 9 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Canada", ranking: 39 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Morocco", ranking: 27 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Croatia", ranking: 24 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'G', groupInfo: [
        { team: { name: "Brazil", ranking: 2 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Serbia", ranking: 1 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Switzerland", ranking: 44 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Cameroon", ranking: 18 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
    {
      group: 'H', groupInfo: [
        { team: { name: "Portugal", ranking: 13 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Ghana", ranking: 51 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "Uruguay", ranking: 14 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: { name: "South Korea", ranking: 38 }, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      ]
    },
  ]

  for (let i = 0; i < 8; i++) {
    tmp = {
      homeTeam: undefined,
      awayTeam: undefined,
      result: undefined,
    }
    knockoutMatches.push(tmp)
  }

  console.log("Group stage: Matchday 1 of 3")
  groupStage(groups, 0, 1, 2, 3);

  console.log("------------------------------------")
  console.log("Group stage: Matchday 2 of 3")
  groupStage(groups, 0, 2, 1, 3);

  console.log("------------------------------------")
  console.log("Group stage: Matchday 3 of 3")
  groupStage(groups, 0, 3, 1, 2);

  console.log("------------------------------------")
  console.log("End of the group stages")
  endOfGroupStage(groups)

  console.log("------------------------------------")
  console.log("Knockout stage\n")
  knockoutStage();

};

main();
