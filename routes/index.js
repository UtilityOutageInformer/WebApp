/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.render('index', { title: 'Outage Informer' });
};

exports.submitResponse = function (dbClient) {
  return function (req, res) {
    var feedback = req.body.feedback;
    dbClient.connect(function (err) {
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

exports.notify = function (dbClient) {
  return function (req, res) {
    var email = req.body.email;
    dbClient.connect(function (err) {
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
};













