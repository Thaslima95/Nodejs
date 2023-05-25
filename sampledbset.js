db.getCollectionInfos()

db.movies.find()

db.movies.aggregate([
    {
        $group:{
            _id:"$type"  ,
            pipeline:[
                {
                    $project:{
                        "title":1
                    }
                }
            ]
            
        }
        
    },
   
    
])