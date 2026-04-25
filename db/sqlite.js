'use strict'

const path = require('path')
const Database = require('better-sqlite3')

const db = new Database(path.resolve(__dirname, '../msg.db'))

db.exec(`CREATE TABLE IF NOT EXISTS tb_msg (
    id        INTEGER        PRIMARY KEY AUTOINCREMENT
                             NOT NULL
                             UNIQUE,
    name      VARCHAR (32)   NOT NULL,
    room      VARCHAR (32)   NOT NULL,
    uid       VARCHAR (7)    NOT NULL,
    sid       VARCHAR (7)    NOT NULL,
    time      INT (10)       NOT NULL,
    namecolor VARCHAR (7)    NOT NULL,
    msgcolor  VARCHAR (7)    NOT NULL,
    msg       VARCHAR (1000) NOT NULL
);`)

function getRecord(roomId, limit = 100, offset = 0) {
  const stmt = db.prepare('SELECT * from tb_msg WHERE `room` = ? ORDER BY `time` DESC LIMIT ? OFFSET ?')
  return stmt.all(roomId, limit, offset)
}

function setRecord(msgItem) {
  const { name, room, uid, sid, ts: time, namecolor, msgcolor, msg } = msgItem
  const stmt = db.prepare(`INSERT INTO tb_msg(\`name\`, \`room\`, \`uid\`, \`sid\`, \`time\`, \`namecolor\`, \`msgcolor\`, \`msg\`)
            VALUES($name, $room, $uid, $sid, $time, $namecolor, $msgcolor, $msg);`)
  return stmt.run({
    $name: name,
    $room: room,
    $uid: uid,
    $sid: sid,
    $time: time,
    $namecolor: namecolor,
    $msgcolor: msgcolor,
    $msg: msg
  })
}

module.exports = {
  getRecord,
  setRecord
}