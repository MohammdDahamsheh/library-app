
class HistoryModel{

    id ?:number;
    userEmail?:string;
    title?:string;
    author?:string;
    description?:string;
    img?:string;
    checkoutDate?:string;
    returnDate?:string;

    constructor (
         id ?:number,
    userEmail?:string,
    title?:string,
    author?:string,
    description?:string,
    img?:string,
    checkoutDate?:string,
    returnDate?:string
    ){

        this.author=author;
        this.checkoutDate=checkoutDate;
        this.description=description;
        this.id=id;
        this.img=img;
        this.returnDate=returnDate;
        this.title=title;
        this.userEmail=userEmail;
    }


}

export default HistoryModel;
