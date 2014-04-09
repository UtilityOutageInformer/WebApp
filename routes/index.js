/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.render('index', { title: 'Outage Informer' });
};

exports.submitResponse = function (conString) {
  return function (req, res) {
    var feedback = req.body.feedback;
      var pg = require('pg');
      var dbClient = new pg.Client(conString);
      dbClient.connect(function (err,_,done) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }
      dbClient.query('CREATE TABLE IF NOT EXISTS Feedback (id bigserial PRIMARY KEY, isInterested boolean);');
      dbClient.query('INSERT INTO Feedback (isInterested) VALUES($1);', [feedback],
        function (err, result) {
          if (err) {
            console.log(err);

          } else {
            console.log("Row Inserted:" + feedback + result);
            dbClient.end();
          }
        });
      res.render('index', {feedback_response: "Thanks for the feedback. We value your response."})
    });
  }
};

exports.notify = function (conString) {
  return function (req, res) {
      var email = req.body.email;
      if (validateEmail(email) == false){
          res.render('index',{email_validation: "Please enter a valid email"});
      }
      else{
          var pg = require('pg');
          var dbClient = new pg.Client(conString);
          dbClient.connect(function (err,_,done) {
              if (err) {
                  return console.error('could not connect to postgres', err);
              }
              dbClient.query('CREATE TABLE IF NOT EXISTS NotifyDetails (id bigserial PRIMARY KEY, email text);');
              dbClient.query('INSERT INTO NotifyDetails (email) VALUES($1);', [email],
                  function (err, result) {
                      if (err) {
                          console.log(err);

                      } else {
                          console.log("Row Inserted:" + email + result);
                          dbClient.end();
                      }
                  });
              res.render('index', {email_response: "Thanks for showing your interest in our services."})
      });
    }
  }
};

var validateEmail = function(email){
    var regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};












