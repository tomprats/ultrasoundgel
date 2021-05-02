export default function Footer() {
  return (
    <footer className="pt-4">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-sm-12">
            <p>
              <a href="https://creativecommons.org/licenses/by-nc-sa/4.0" rel="noopener noreferrer" target="_blank">
                <i className="fab fa-creative-commons fa-lg ml-1" />
                <i className="fab fa-creative-commons-by fa-lg ml-1" />
                <i className="fab fa-creative-commons-nc fa-lg ml-1" />
                <i className="fab fa-creative-commons-sa fa-lg ml-1" />
              </a>
              <span className="mx-1"> | </span>
              <a href="/disclaimer">Disclaimer</a>
            </p>
            <p>
              Website by <a href="https://www.tomify.me" rel="noopener noreferrer" target="_blank">Tomify</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
