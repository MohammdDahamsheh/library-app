import { preProcessFile } from "typescript";

export const Pagenation = (props: {
  currentPage: number;
  totalPage: number;
  paginate: any;
}) => {
  const pageNumbers = [];
  if (props.currentPage === 1) {
    pageNumbers.push(1);
    if (props.totalPage >= 2) pageNumbers.push(2);
    if (props.totalPage >= 3) pageNumbers.push(3);
  } else if (props.currentPage > 1) {
    if (props.currentPage >= 3) {
      pageNumbers.push(props.currentPage - 2);
      pageNumbers.push(props.currentPage - 1);
    } else {
      pageNumbers.push(props.currentPage - 1);
    }
    pageNumbers.push(props.currentPage);

    if (props.totalPage >= props.currentPage + 1)
      pageNumbers.push(props.currentPage + 1);
    if (props.totalPage >= props.currentPage + 2)
      pageNumbers.push(props.currentPage + 2);
  }

  return (
    <nav aria-label="">
      <ul className="pagination">
        <li className="page-item" onClick={() => props.paginate(1)}>
          <button className="page-link">First Page</button>
        </li>
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={
              "page-item " + (props.currentPage === page ? "active" : "")
            }
            onClick={() => props.paginate(page)}
          >
            <button className="page-link">{page}</button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => props.paginate(props.totalPage)}
          >
            Last Page
          </button>
        </li>
      </ul>
    </nav>
  );
};
