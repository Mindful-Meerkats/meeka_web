'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
      const fetch = require('node-fetch');
      const Papa = require('./papaparse.min.js');
      const sheeturl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQfUOaApPLLEzM_h_RT6tG-PownrGC25SAPplKGmJczXtDstb3SbBRIjrEIybs-ZW-UEORy3Wzxsrov/pub?gid=1799488393&single=true&output=csv";
      let quests;
      fetch(sheeturl)
    .then(function(res) {
        console.log("here");
        return res.text();
    }).then(function(csv){
        console.log(csv);
        let parse = Papa.parse(csv);
        for(let i = 1;i< parse.data.length; i++){
          let q = {
            id: parse.data[i][0],
            quest: parse.data[i][1],
            title: parse.data[i][2],
            description: parse.data[i][3],
            mind:0,
            body: 0,
            soul: 0,
            community: 0,
            thriftiness: 0,
            pawprint: 0,
            happiness: 0
          };
          switch(parse.data[i][4]){
            case "Mind":
              q.mind = 1;
              break;
            case "Body":
              q.body = 1;
              break;
            case "Soul":
              q.soul = 1;
              break;
            case "Community":
              q.community = 1;
              break;
            case "Thriftiness":
              q.thriftiness = 1;
              break;
            case "Happiness":
              q.happiness = 1;
              break;
            case "Pawprint":
              q.pawprint = 1;
              break;
            default:
              break;
          }

          quests.push(q);
        }
    });
      return queryInterface.bulkInsert('quests', quests, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.*/

      Example:
      return queryInterface.bulkDelete('quests', null, {});

  }
};
