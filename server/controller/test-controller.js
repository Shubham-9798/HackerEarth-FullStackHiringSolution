// const test = require("./../models/test")

module.exports.test = async (req, res) => {
        // const a = await test.find();
        res.send({
            test: "success",
            // data: a
        })
}

module.exports.testAdd = async (req, res) => {
    try {
        // const at = await new test({
        //     a_string: "sk", a_date: "djfkj"
        // })
        // const aa = await at.save();
        res.send("aa")
    }catch(err) {
        res.send("error")
    }

}