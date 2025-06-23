export const Footer=()=>{
    return(
        <div className="main-color">
            <footer className=" container d-flex flex-wrap main-color py-1 justify-content-between align-items-center ">
                <p className="col-4 mb-0 text-white">
                      © Library App
                </p>
                <ul className=" nav navbar-dark col-4 d-flex  justify-content-end">
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-white fs-6">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-white fs-6">search</a>
                    </li>

                </ul>


            </footer>
        </div>
    );
}