'use strict';

const Database   = require('./data/database');
const FeedLoader = require('./data/feedloader');

const list = [
  'http://feeds.pinboard.in/rss/u:studiomohawk/',
  'http://feeds.pinboard.in/rss/u:pocotan001/',
  'http://feeds.pinboard.in/rss/u:hiloki/',
  'http://feeds.pinboard.in/rss/u:t32k/',
  'http://feeds.pinboard.in/rss/u:ahomu/'
];

let database = new Database();
let loader   = new FeedLoader(list);
let items    = database.collection('items');

loader.get().then((array) => {

  let links    = array.map((item) => item.link);
  let promises = array.filter((item, index) => {
    return links.indexOf(item.link) === index;
  }).map((item) => {
    return items.insert(item)
  });

  items.drop(function () {
    Promise.all(promises).then(() => {
      process.exit();
    });
  });
});