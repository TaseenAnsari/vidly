
module.exports = async function (req, res, next) {
    try {
        let period = 0
        dateNow = new Date(Date.now())
        dateReturn = new Date(req.body.returnDate);
        console.log(typeof(dateReturn))
        if(dateReturn =="Invalid Date") return res.status(400).send('Invalid date')
        if (dateNow.getFullYear() === dateReturn.getFullYear()) {
            if (dateNow.getMonth() === dateReturn.getMonth()) {
                if (dateNow.getDate() === dateReturn.getDate()) return new Error("same date")
                else if (dateNow.getDate() > dateReturn.getDate()) return new Error("return date is smaller")
                else period += dateReturn.getDate() - dateNow.getDate();
            }
            else if (dateNow.getMonth() > dateReturn.getMonth()) return new Error("return date is smaller")
            else {
                period += (dateReturn.getMonth() - dateNow.getMonth()) * 30;
                if (dateNow.getDate() > dateReturn.getDate()) period -= dateNow.getDate() - dateReturn.getDate()
                else period += dateReturn.getDate() - dateNow.getDate();
            }
        }
        else if (dateNow.getFullYear() > dateReturn.getFullYear()) return new Error("return date is smaller")
        else {
            period += (dateReturn.getFullYear() - dateNow.getFullYear()) * 365
            if (dateNow.getMonth() > dateReturn.getMonth()) {
                period -= (dateNow.getMonth() - dateReturn.getMonth()) * 30;
            }
            else {
                period += (dateReturn.getMonth() - dateNow.getMonth()) * 30;
                if (dateNow.getDate() > dateReturn.getDate()) period -= dateNow.getDate() - dateReturn.getDate()
                else period += dateReturn.getDate() - dateNow.getDate();
            }
        }
        req.body.period = period
        req.body.ndate = dateNow
        req.body.rdate = dateReturn
        next();
    }
    catch (err) {
        res.status(400).send(err.message)
    }

}