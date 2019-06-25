exports.formatDate = list => {
    return list.map(itemObj => {
        const obj = {...itemObj};
        const newDate = new Date(itemObj.created_at).toLocaleString()
        obj.created_at = newDate;
        return obj;
    })
};

exports.makeRefObj = list => {
    const refObj = {};
    list.forEach(item => {
        refObj[item.title] = item.article_id
    })
    return refObj;
};

exports.formatComments = (comments, articleRef) => {
    return comments.map(comment => {
        let {created_by, belongs_to, created_at, ...restOfData} = comment;
        const author = created_by
        const article_id = articleRef[belongs_to];
        const newDate = new Date(created_at).toLocaleString()
        created_at = newDate
        return {author, created_at, article_id, ...restOfData};
    })
};