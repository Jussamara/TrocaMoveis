"use strict";

var ObjectId = require('mongoose').Types.ObjectId;
var CRUD = {};

CRUD.insert = (model) => {
    return new Promise(
        (resolve, reject) => {
            model
            .save(
                (err, data) => {
                    return (err) ? reject("Mongoose not insert -> " + err) : resolve(data);
                }
            )
        }
    );
};

CRUD.listSeek = (model, seek) => {
    seek = seek || {};
    return new Promise(
        (resolve, reject) => {
            model
            .find(seek)
            .lean()
            .exec(
                (err, data) => {
                    return (err) ? reject("Mongoose not listSeek -> " + err) : resolve(data);
                }
            )
        }
    );
};

CRUD.listLastForSeek = (model, seek, limit) => {
    return new Promise(
        (resolve, reject) => {
            model
            .find(seek)
            .limit(limit)
            .sort({$natural:-1})
            .exec(
                (err, data) => {
                    return (err) ? reject("Mongoose not listLastForSeek -> " + err) : resolve(data);
                }
            )
        }
    );
};

CRUD.listAllForSeek = (model, seek, limit, page) => {
    return new Promise(
        (resolve, reject) => {
            model
            .find(seek)
            .lean()
            .skip(limit * (page - 1))
            .limit(limit)
            .exec(
                (err, data) => {
                    return (err) ? reject("Mongoose not listAllForSeek -> " + err) : resolve(data);
                }
            )
        }
    );
};

CRUD.findOne = (model, id) => {
    return new Promise(
        (resolve, reject) => {
            model
            .findOne(
                { _id: ObjectId(id) },
                (err, data) => {
                    return (err) ? reject("Mongoose not findOne -> " + err) : resolve(data);
                }
            ).lean()
        }
    );
};

CRUD.findOneUpdate = (model, id, data, upSert=true) => {
    return new Promise(
        (resolve, reject) => {
            model
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                data,
                { new: upSert},
                (err, data) => {
                    return (err) ? reject("Mongoose not findOneUpdate -> " + err) : resolve(data);
                }
            )
        }
    );
};

CRUD.remove = (model,id) => {
    return new Promise(
        (resolve, reject) => {
            model
            .remove(
                { _id: ObjectId(id) },
                (err, data) => {
                    return (err) ? reject("Mongoose not remove -> " + err) : resolve(data);
                }
            )
        }
    );
}

module.exports = CRUD;