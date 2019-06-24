exports.formatDate = list => {
    return list.map(itemObj => {
        const obj = {...itemObj};
        const newDate = new Date(itemObj.created_at).toLocaleString()
        obj.created_at = newDate;
        return obj;
    })
};

exports.makeRefObj = list => {
    
};

exports.formatComments = (comments, articleRef) => {};



// const newDate = new Date(1478813209256).toLocaleString()
// console.log(newDate)
//8/18/2016, 1:07:52 PM