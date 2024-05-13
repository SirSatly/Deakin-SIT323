const express = require("express");
const app = express();
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});


// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

function parseFloats(s1, s2)
{
    const n1 = parseFloat(s1);
    const n2 = parseFloat(s2);
    if (isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }

    return [n1, n2]
}

const add = (n1, n2) => { return n1 + n2; }
const subtract = (n1, n2) => { return n1 - n2; }
const multiply = (n1, n2) => { return n1 * n2; }
const divide = (n1, n2) => { return n1 / n2; }

app.get("/add", (req, res) => {
    try {
        const [n1, n2] = parseFloats(req.query.n1, req.query.n2)
        logger.info('Parameters '+n1+' and '+n2+' received for addition');
        const result = add(n1, n2);
        res.status(200).json({ statuscocde: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            statuscocde: 500, msg: error.toString()
        })
    }
});

app.get("/subtract", (req, res) => {
    try {
        const [n1, n2] = parseFloats(req.query.n1, req.query.n2)
        logger.info('Parameters '+n1+' and '+n2+' received for subtraction');
        const result = subtract(n1, n2);
        logger.info()
        res.status(200).json({ statuscocde: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            statuscocde: 500, msg: error.toString()
        })
    }
});

app.get("/multiply", (req, res) => {
    try {
        const [n1, n2] = parseFloats(req.query.n1, req.query.n2)
        logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
        const result = multiply(n1, n2);
        res.status(200).json({ statuscocde: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            statuscocde: 500, msg: error.toString()
        })
    }
});

app.get("/divide", (req, res) => {
    try {
        const [n1, n2] = parseFloats(req.query.n1, req.query.n2)
        if (n2 == 0)
        {
            logger.error("cannot divide by zero");
            throw new Error("cannot divide by zero");
        }
        logger.info('Parameters '+n1+' and '+n2+' received for division');
        const result = divide(n1, n2);
        res.status(200).json({ statuscocde: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            statuscocde: 500, msg: error.toString()
        })
    }
});

const port = 3040;
app.listen(port, () => {
    console.log("hello I'm listening to port " + port);
})