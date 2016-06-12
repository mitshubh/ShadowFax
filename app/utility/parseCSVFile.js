var _ = require('lodash');
var multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');
var logger = require('./logger');
var rejectedDataLogger = require('./rejectedDataLogger');
var datasetUpload = require('./datasetUpload');

var supported = ['String', 'Number', 'Date', 'Boolean'];

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, (req.body.name + '.csv') || file.fieldname + '-' + Date.now());
    }
});

exports.upload = multer({ storage : storage}).single('csvfile');

function parseCSVFile(sourceFilePath, columns, onNewRecord, handleError, onColumns, done) {
    var source = fs.createReadStream(sourceFilePath);

    var linesRead = 0;

    var parser = Parse({
        delimiter: ',',
        columns: columns,
        trim: true
    });

    parser.on("readable", function () {
        var record;
        while (record = parser.read()) {
            console.log(linesRead);
            linesRead++;
            if (1 === linesRead) {
                onColumns(record);
            } else {
                onNewRecord(record);
            }
        }
    });

    parser.on("error", function (error) {
        handleError(error)
    });

    parser.on("end", function () {
        done(linesRead);
    });

    source.pipe(parser);
}

exports.model = function(req, res, next) {
    var datasetName = req.file.filename;
    var description = req.body.description || "";
    datasetUpload.createDataset(datasetName, description, function(err, dataset) {
        if (!err) {
            res.datasetObj = dataset;
            next();
        } else {
            res.status(400);
            res.send(err.message);
        }
    });
};

exports.parse = function parseFile (req, res, next) {
    var filePath = req.file.path;
    console.log(req.file);
    var datasetName = req.file.filename;
    logger.info('Processing Data file- %s ', filePath);

    function onNewRecord(record) {
        //console.log('In onNewRecord');
        //console.log('New Record ---');
        //console.log(record);
        datasetUpload.upload(datasetName, record, rejectedDataLogger.error);
        // rejectedDataLogger.error(record, {reason: 'Datatype mismatch.'});
    }

    function onError(error) {
        logger.error(error);
    }

    function done(linesRead) {
        fs.unlinkSync(filePath);
        res.status(201).json(res.datasetObj);
        console.log('Done !!')
    }

    function onColumns(record) {
        //console.log('Inside onColumns');
        //console.log('Record --- ');
        //console.log(record);
        var errorMessage = null;
        _.forEach(record, function(value, key) {
            if (!_.include(supported, value) && !errorMessage) {
                errorMessage = 'Data type- ' + value + ' not supported for dimension- ' + key + ' .Supported' +
                    ' data types are- ' + JSON.stringify(supported);
            }
        });
        if (!errorMessage) {
            datasetUpload.createModel(datasetName, record);
        } else {
            res.status(400);
            res.send(errorMessage);
        }
    }

    var columns = true;
    parseCSVFile(filePath, columns, onNewRecord, onError, onColumns, done);
};
