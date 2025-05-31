class CrudRepository{
    constructor(model){
        this.model=model;
    }
    async create(data){
        try{
            const result=await this.model.create(data);
            return result;
        }
        catch(error){
            console.log("Some error happened in repository");
            throw error;
        }
    }

    async destroy(id){
        try{
            const result = await this.model.findByIdAndRemove(id);
            return result;
        }
        catch(error){
            console.log("Some error happened in repository");
            throw {err};
        }
    }

    async get(id){
        try{
            const result=await this.model.findById(id);
            return result;
        }
        catch(error){
            console.log("Some error happened in repository");
            throw error;
        }
    }

    async getAll(){
        try{
            const result=await this.model.find({});
            return result;
        }
        catch(error){
            console.log("Some error happened in repository layer.");
            throw error;
        }
    }

    async update(id,data){
        try{
            const result=await this.model.findByIdAndUpdate(id,data,{ new:true }); //* { new:true } so that it returns you the updated data
            return result;
        }
        catch(error){
            console.log("Some error happened in repository layer.");
            throw error;
        }
    }
}

export default CrudRepository;