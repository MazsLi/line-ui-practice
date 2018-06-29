
const testData = {
    'id1': {
        id: 'id1',
        name: 'Bryant',
        photoSrc: require('Assets/men1.png'),
        msgAry: [
            {
                msg: "let's go to play baseketball tonight!",
                time: 1530243600000, // 2018/06/29 11:40:00
            }
        ]
    },
    'id2': {
        id: 'id2',
        name: 'Gigi',
        photoSrc: require('Assets/women1.png'),            
        msgAry: [
            {
                msg: "Okay ~ see u tomorrow ~",
                time: 1530240600000, // 2018/06/29 10:50
            },
        ]
    },
    'id3': {
        id: 'id3',
        name: 'Mars',
        photoSrc: require('Assets/men2.png'),
        msgAry: [
            {
                msg: "Have any interested job?",
                time: 1530240000000, // 2018/06/29 10:40
            }
        ]
    },
    'id4': {
        id: 'id4',
        name: 'Mary',
        photoSrc: require('Assets/women2.png'),
        msgAry: [
            {
                msg: "How are you today?",
                time: 1530200400000, // 2018/06/28 23:40
            }
        ]
    },
    'id5': {
        id: 'id5',
        name: 'Tom',
        photoSrc: require('Assets/men3.png'),
        msgAry: [
            {
                msg: "chat chat chat room",
                time: 1530168000000, // 2018/06/28 14:40
            }
        ]
    },
    'id6': {
        id: 'id6',
        name: 'Money',
        msgAry: [
            {
                msg: 'Join us! Make a lot of money...',
                time: 1530084000000, // 2018/06/27 15:20
            }
        ]
    },
    'id7': {
        id: 'id7',
        name: 'Messi',
        photoSrc: require('Assets/men4.png'),
        msgAry: [
            {
                msg: 'Thanks!!',
                time: 1530174000000, // 2018/06/28 16:20
            },
            {
                isMe: true,
                msg: 'Congratulations to Argentina on entering a round of 16.',
                time: 1530159600000, // 2018/06/28 16:20
            },
        ]
    },
    'id8': {
        id: 'id8',
        name: 'Sharapova',
        photoSrc: require('Assets/women3.png'),
        msgAry: [
            {
                msg: 'Can you lend me some money?? please!!!',
                time: 1530256800000, // 2018/06/29 15:20
                read: true
            }
        ]
    },
}

export default {
    getData: getData,
    getChatDataByID: getChatDataByID,
}

function getChatDataByID(id) {
    return testData[id];
}
/**
 * 0: sort newest to olded (default)
 * 1: sort olded to newest (default)
 * 2: sort newest to olded (unread priority)
 * @param {Number} sortMode 
 */
function getData(sortBy=0) {

    let result = [], newResult = [];

    // convert object to array
    Object.keys( testData ).map( (key) => result.push(testData[key]) );
    
    for(let i=0; i<result.length; i++) {

        let aTime = result[i].msgAry[0].time;

        for(let j=i+1; j<result.length; j++) {
            let bTime = result[j].msgAry[0].time;
            
            if( (sortBy==1)? bTime<aTime: bTime>aTime ) { // change
                let tmp = result[i];
                result[i] = result[j];
                result[j] = tmp;
            }

        }

    }
    
    return result;
}