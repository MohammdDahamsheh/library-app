

class ReviewTheBook{

     bookId:number;
     rating :number;
     description?:string;

     constructor(bookId:number,rating :number,description:string){
        this.bookId=bookId;
        this.rating=rating;
        this.description=description;

     }

}
export default ReviewTheBook;