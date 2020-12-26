const teamScoreCard = require("./../model/team")
const utility = require('./../helpers/utility')
const apiResponse = require('./../helpers/apiResponse')
const point = require('./../helpers/constants')
var ObjectId = require('mongodb').ObjectID;

module.exports.getTeam = async (req, res) => {
    try {
        const list = await teamScoreCard.find().sort({score: 'desc'});
        res.send({
            test: "success",
            list: list
        })
    }catch(error) {
        console.log(err)
        apiResponse.ErrorResponse(res, err)
    }

}

module.exports.addTeam = async (req, res) => {
    const obj = req.body
    const {team_name, wins, ties, losses, score} = req.body

    console.log(obj);

    let idea = await new teamScoreCard ({
        team_name: team_name,
        wins: wins,
        losses: losses,
        ties: ties,
        score: score,

        isDeleted: false,
        updatedDate: utility.currentDate(),
        createdDate: utility.currentDate()
    })

    idea.save()
    .then((data) => {
        console.log("saves");
        apiResponse.successResponse(res, data)
    }
    )
    .catch((err) => {
        console.log(err)
        apiResponse.ErrorResponse(res, {})
    })
}

module.exports.matchWinner = async (req, res) => {
    const { winner, losser, tied} = req.body; // i get objectId 
    console.log(req.body)
    let Wins = 3
    let increment = 1
    let decrement = -1
    let respLosser = null
    let resWinner = null
    let resTied = null
try {
    if(!tied) {
        respLosser = await teamScoreCard.updateOne(
            { _id: {$eq: losser}  } ,
            { $inc:{ losses: increment, score: decrement }
            })

        resWinner = await teamScoreCard.updateOne(
                { _id: {$eq: winner}  } ,
                { $inc: { wins: increment, score: Wins }
                })
    }
       else {
        resTied = await teamScoreCard.updateMany(
            { $or: [{ _id: {$eq: winner}  }, {_id: {$eq: losser} }]} ,
            { $inc: { ties: increment, score: increment }}
            )
    }
        console.log(resTied)
        apiResponse.FoundResponseWithData(res, {resWinner, respLosser, resTied})
    
} catch (error) {
    apiResponse.ErrorResponse(res, error)
}




    // await setWinner()
//     let conditions = {
//         _id: ObjectId(winner)
//     };
// let options = { multi: true, upsert: true };

// Device.updateMany(conditions , { cid: '' }, options, function(err, res) {

// });
// ties , ties++, score++

    // teamScoreCard.find(
    //     { $or: [{ _id: ObjectId(winner) }, { _id: ObjectId(losser) }]} ,

    //     function(err, results) {
    //         if (err) {
    //            apiResponse.ErrorResponse(res, err)
    //           }
    //           console.log(result)
    //           let Wins = 3
    //           let Loss = -1
    //           let Ties = 0
    //           let increment = 1
    //           let decrement = -1

    //           results.forEach((result)=> {
    //               teamScoreCard.update(
    //                 { $or: [{ _id: ObjectId(winner) }, { _id: ObjectId(losser) }]} ,
    //                 { $inc: ties ?  { ties: increment, score: increment }: null
    //                     // $inc: { wins: 1, score: 3 }, 
    //                     // $inc: { loss: 1, score: -1 },
    //                   }
    //                   )
    //           })
              
    //         apiResponse.FoundResponseWithData(res, result)
    //     }
    // )
    
     
}
