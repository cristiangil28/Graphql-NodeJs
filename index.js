const express= require('express');

const app= express();

const express_graphql=require('express-graphql');
const {buildSchema}=require('graphql');

const {courses}= require('./data.json');
const schema=buildSchema(`
    type Query{
        course(id:Int!):Course
        courses(title:String):[Course]
    }
    type Course{
        id: Int
        title:String
        autor:String
    }
`);
let getCourse=(args)=>{
    let id=args.id;
    return courses.filter(course =>{
        return course.id==id;    
    })[0];
}

let getCourses=(args)=>{
    if(args.title){
        let title=args.title;
        return courses.filter(course => course.title===title);
    }else{
        return courses;
    }
}
const root={
    course:getCourse,
    courses:getCourses
};
app.use('/graphql',express_graphql({
    schema:schema,
     rootValue:root,
     graphiql: true
}));
app.listen(4000,()=> console.log('server on port 3000'));