const { expect } = require('chai');
const { formatDate, makeRefObj, formatComments } = require('../db/utils/utils');

describe('formatDate', () => {
    it('returns an array', () => {
        const input = [{}];
        const actual = formatDate(input);
        expect(actual).to.be.an('array')
    });
    it('return array with single object of ARTICLES with key values unchanged, while created_at was changed to readable format', () => {
        const input = [
            {
            title: 'Running a Node App',
            topic: 'coding',
            author: 'jessjelly',
            body:
            'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
            created_at: 1471522072389,
            }
        ];
        const expected = [
            {
            title: 'Running a Node App',
            topic: 'coding',
            author: 'jessjelly',
            body:
            'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
            created_at: "8/18/2016, 1:07:52 PM",
            }
        ];
        const actual = formatDate(input);
        expect(actual[0].title).to.equal('Running a Node App');
        expect(actual[0].created_at.toLocaleString()).to.equal("8/18/2016, 1:07:52 PM")
    });
    it('return array with multiply objects of ARTICLES with key values unchanged, while created_at was changed to readable format', () => {
        const input = [
            {
            title: 'Running a Node App',
            topic: 'coding',
            author: 'jessjelly',
            body:
              'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
            created_at: 1471522072389,
          },
          {
            title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
            topic: 'coding',
            author: 'jessjelly',
            body:
              'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
            created_at: 1500584273256,
          }];
        const expected = [{
            title: 'Running a Node App',
            topic: 'coding',
            author: 'jessjelly',
            body:
              'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
            created_at: "8/18/2016, 1:07:52 PM",
          },
          {
            title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
            topic: 'coding',
            author: 'jessjelly',
            body:
              'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
            created_at: "7/20/2017, 9:57:53 PM",
          }];
        const actual = formatDate(input);
        expect(actual).to.eql(expected)
    });
    it('return array with single object of COMMENTS with key values unchanged, while created_at was changed to readable format', () => {
        const input = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1,
            created_at: 1468087638932,
          }];
        const expected = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1,
            created_at: "7/9/2016, 7:07:18 PM",
          }];
        const actual = formatDate(input);
        expect(actual).to.eql(expected)
    });
    it('return array with multiply objects of COMMENTS with key values unchanged, while created_at was changed to readable format', () => {
        const input = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1,
            created_at: 1468087638932,
          },
          {
            body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
            belongs_to: 'Making sense of Redux',
            created_by: 'grumpy19',
            votes: 7,
            created_at: 1478813209256,
          }];
        const expected = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1,
            created_at: "7/9/2016, 7:07:18 PM",
          },
          {
            body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
            belongs_to: 'Making sense of Redux',
            created_by: 'grumpy19',
            votes: 7,
            created_at: "11/10/2016, 9:26:49 PM",
          }];
        const actual = formatDate(input);
        expect(actual).to.eql(expected);
    })
});

describe('makeRefObj', () => {
    it('returns single object when array with key values pairs is passed', () => {
        const input = [{ article_id: 1, title: 'A' }];
        const expected = { A: 1 }
        const actual = makeRefObj(input);
        expect(actual).to.eql(expected)
    });
    it('returns another single object when array with key values pairs is passed', () => {
        const input = [
            { article_id : 2, title: 'Hello'}
        ];
        const expected = { Hello: 2 };
        const actual = makeRefObj(input);
        expect(actual).to.eql(expected)
    });
    it('returs object with multiply key value pairs when array with multiple objects is passed', () => {
        const input = [
            { article_id: 1, title: 'A' },
            { article_id : 2, title: 'Hello'}
        ];
        const expected = { A : 1, Hello : 2};
        const actual = makeRefObj(input);
        expect(actual).to.eql(expected);
    })
});

describe('formatComments', () => {
    it('returns array with one object, when array wiht one object is passed - created by renamed to author, belongs_to renamed to article_id', () => {
        const comments = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1,
            created_at: 1468087638932,
          }];
        const articleRef = { 'The People Tracking Every Touch, Pass And Tackle in the World Cup': 1};
        const actual = formatComments(comments, articleRef);
        const expected = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
            article_id: 1,
            author: 'tickle122',
            votes: -1,
            created_at: "7/9/2016, 7:07:18 PM",
          }];
        expect(actual).to.eql(expected)
    })
    it('returns array with multiply object with changed key value pairs, when array with multiply objects is passed', () => {
        const comments = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
            belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
            created_by: 'tickle122',
            votes: -1,
            created_at: 1468087638932,
          },
          {
            body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
            belongs_to: 'Making sense of Redux',
            created_by: 'grumpy19',
            votes: 7,
            created_at: 1478813209256,
          }];
          const articleRef = {'The People Tracking Every Touch, Pass And Tackle in the World Cup': 1, 'Making sense of Redux' : 2};
          const actual = formatComments(comments, articleRef);
          const expected = [{
            body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
            article_id: 1,
            author: 'tickle122',
            votes: -1,
            created_at: "7/9/2016, 7:07:18 PM",
          },
          {
            body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
            article_id: 2,
            author: 'grumpy19',
            votes: 7,
            created_at: "11/10/2016, 9:26:49 PM",
          }];
          expect(actual).to.eql(expected)
    })
});