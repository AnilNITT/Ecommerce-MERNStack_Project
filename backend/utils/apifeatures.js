class ApiFeatures {
    constructor(query,queryStr)
    {
        this.query=query;
        this.queryStr=queryStr;
    }

    search() {
        const keyword= this.queryStr.keyword ? {
            name:{
                $regex : this.queryStr.keyword,
                // "i" for also search capital n small both keyword
                $options:"i",
            },
        }
        :{};
        this.query =this.query.find({...keyword});
        return this;
    }


    filter(){
    
        // dnt do this  bcoz its get refrence not copy  so make changes effect quesryStr file
        //const queryCopy=this.queryStr;
        const queryCopy={ ...this.queryStr };
    
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        // Filter For Price and Raitng
        //console.log(queryCopy)
        let queryStr = JSON.stringify(queryCopy);  // to make him string from object
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        // convert string to object
        this.query=this.query.find(JSON.parse(queryStr));
        //console.log(queryStr);
        return this;
    }


    pagination(resultPerPage){

        const currentPage= Number(this.queryStr.page) || 1

        const skip = resultPerPage * (currentPage-1)   // 5*0=0 skip   5*1=5 skip

        this.query=this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures