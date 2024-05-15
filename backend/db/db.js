import mongoose from 'mongoose';

mongoose.connect('mongodb://0.0.0.0:27017/Employeelist').then(()=>{
    console.log('Employee list is connected')
})
.catch(e=>{
    console.log(e.message)
})
export default mongoose;