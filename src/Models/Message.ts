
class Message{

    id?:number
    title?:string;
    question?:string;
    userEmail?:string;
    closed?:boolean;
    response?:string;
    adminEmail?:string;


    constructor(title :string,question:string){
        this.question=question;
        this.title=title;
    }

}
export default Message;