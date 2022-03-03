export function APIfeatures(query, queryString) {
    this.query = query; //Products.find();
    this.queryString = queryString; //req.query

    this.paginating = () => {
        //分页查询
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.limit(limit).skip(skip);
        return this;
    }

    //经过上一步
    //this.query = Products.find().limit(xx).skip(xx);

    this.sorting = () => {
        //排序查询
        const sort = this.queryString.sort || '-cratedAt';
        this.query = this.query.sort(sort);
        return this;
    }

    //经过上一步
    //this.query = Products.find().limit(xx).skip(xx).sort(xx);

    //search
    //在text里查找
    this.searching = () => {
        const search = this.queryString.search;
        if (search) {
            //查找的字符串(在索引title里面查找)
            this.query = this.query.find({
                $text: {
                    $search: search
                }
            });
        } else {
            this.query = this.query.find();
        }
        return this;
    }

    //经过上一步变成了
    //this.query = Products.find().find({
    //    $text: {
    //        $search: search
    //    }
    //}).limit(xx).skip(xx).sort(xx);

    //根据某个条件选出要查询的字段
    this.filtering = () => {
        // console.log(this.queryString);
        const queryObj = {
            ...this.queryString
        };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const newQuery = JSON.parse(queryStr);
        this.query = this.query.find(newQuery);

        return this;
    }

    //经过上一步
    //this.query = Products.find().find({
    //    {
    //      "price": { "$gt": "56" }
    //}).limit(xx).skip(xx).sort(xx);

}
