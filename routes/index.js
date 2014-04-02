
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Outage Informer' });
};

exports.submitResponse = function(dbClient) {
    return function(req, res) {
        var feedback = req.body.feedback;
        dbClient.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
            }
            console.log("Feedback is ",feedback)
            dbClient.query('CREATE TABLE IF NOT EXISTS Feedback (id bigserial PRIMARY KEY, isInterested boolean);');
            dbClient.query('INSERT INTO Feedback (isInterested) VALUES($1);',[feedback],
                function(err,result){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Row Inserted:" + feedback + result);
                        dbClient.end();
                    }

                });
            res.render('thankyou');
        });
    }
};













