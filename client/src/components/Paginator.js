import React from "react";
import { render } from "react-dom";
import Pagination from "react-paginating";

const fruits = [
  ["apple", "orange"],
  ["banana", "avocado"],
  ["coconut", "blueberry"],
  ["payaya", "peach"],
  ["pear", "plum"]
];


const limit = 2;
const pageCount = 3;
const total = fruits.length * limit;

class Paginator extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPhoto: 1,
      photos: [],
    };
  }

  handlePageChange = page => {
    this.setState({
      currentPhoto: page
    });
    console.log("props in pa", this.props.state)
  };

  render() {
    const { currentPhoto } = this.state;
    return (     
      <div >        
        <ul >
          {fruits[currentPhoto - 1].map(item => <li key={item}>{item}</li>)}
        </ul>
        <Pagination
          total={total}
          limit={limit}
          pageCount={pageCount}
          currentPhoto={currentPhoto}
        >
          {({
            pages,
            currentPhoto,
            hasNextPage,
            hasPreviousPage,
            previousPage,
            nextPage,
            totalPages,
            getPageItemProps
          }) => (
            <div>
              <button
                {...getPageItemProps({
                  pageValue: 1,
                  onPageChange: this.handlePageChange
                })}
              >
                first
              </button>

              {hasPreviousPage && (
                <button
                  {...getPageItemProps({
                    pageValue: previousPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {"<"}
                </button>
              )}

              {pages.map(page => {
                let activePage = null;
                if (currentPhoto === page) {
                  activePage = { backgroundColor: "#fdce09" };
                }
                return (
                  <button
                    key={page}
                    style={activePage}
                    {...getPageItemProps({
                      pageValue: page,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    {page}
                  </button>
                );
              })}

              {hasNextPage && (
                <button
                  {...getPageItemProps({
                    pageValue: nextPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {">"}
                </button>
              )}

              <button
                {...getPageItemProps({
                  pageValue: totalPages,
                  onPageChange: this.handlePageChange
                })}
              >
                last
              </button>
            </div>
          )}
        </Pagination>
      </div>
    );
  }
}


export default Paginator;