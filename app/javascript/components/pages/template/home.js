import PropTypes from "prop-types";
import {Fragment, useEffect, useState} from "react";
import {getAll as getEpisodes} from "app/requests/episodes";
import {ActionText, Episode, Twitter} from "components/helpers";
import {Loading} from "components/pages";
import {useContent, useQueryParams} from "lib/hooks";
import {queryString} from "lib/object";
import {isBlankHTML} from "lib/string";

function Home({page}) {
  const announcements = useContent("General", "Announcements");
  const [episodes, setEpisodes] = useState(null);
  const [pages, setPages] = useState(null);
  const resources = useContent("General", "Resources");
  const sidebar = !!(announcements || resources);
  const twitter = useContent("Social", "Twitter");
  const params = useQueryParams();
  const [pageNumber, setPageNumber] = useState(+(params.get("page") || 1));
  const limit = +(params.get("limit") || 3);
  const search = params.get("search");
  const updatePage = (e) => {
    e.preventDefault();

    setPageNumber(+new URL(e.currentTarget.href).searchParams.get("page"));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getEpisodes({limit, page: pageNumber, search}).then((data) => {
      setEpisodes(data.episodes);
      setPages(data.pages);
    });
  }, [pageNumber]);

  if(!episodes) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={`col-md-6 offset-md-${sidebar ? 1 : 3}`}>
          {!isBlankHTML(page.content) && (
            <>
              <div className="custom-html text-center">
                <ActionText.Content html={page.content} />
              </div>
              <hr />
            </>
          )}
          {search && (
            <>
              <h3>Showing results for "{search}"</h3>
              <hr />
            </>
          )}
          {episodes.map((episode) => (
            <Fragment key={episode.uid}>
              <Episode episode={episode} />
              <hr />
            </Fragment>
          ))}
          {episodes.length === 0 && <div className="text-center">Nothing found</div>}
          <div className="text-center">Page {pageNumber} of {pages}</div>
          {pages > 1 && (
            <div className="mt-2 text-center">
              <div className="btn-group">
                {pageNumber > 1 ? (
                  <>
                    <a className="btn btn-themed" href={`${window.location.pathname}?${queryString({limit, page: 1, search})}`} onClick={updatePage}>
                      <i className="fas fa-angle-double-left" />
                    </a>
                    <a className="btn btn-themed" href={`${window.location.pathname}?${queryString({limit, page: pageNumber - 1, search})}`} onClick={updatePage}>
                      <i className="fas fa-angle-left" />
                    </a>
                  </>
                ) : (
                  <>
                    <button className="btn btn-themed disabled" type="button">
                      <i className="fas fa-angle-double-left" />
                    </button>
                    <button className="btn btn-themed disabled" type="button">
                      <i className="fas fa-angle-left" />
                    </button>
                  </>
                )}
                <button className="btn btn-themed disabled" type="button">{pageNumber}</button>
                {pageNumber + 1 > pages ? (
                  <>
                    <button className="btn btn-themed disabled" type="button">
                      <i className="fas fa-angle-right" />
                    </button>
                    <button className="btn btn-themed disabled" type="button">
                      <i className="fas fa-angle-double-right" />
                    </button>
                  </>
                ) : (
                  <>
                    <a className="btn btn-themed" href={`${window.location.pathname}?${queryString({limit, page: pageNumber + 1, search})}`} onClick={updatePage}>
                      <i className="fas fa-angle-right" />
                    </a>
                    <a className="btn btn-themed" href={`${window.location.pathname}?${queryString({limit, page: pages, search})}`} onClick={updatePage}>
                      <i className="fas fa-angle-double-right" />
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        {sidebar && (
          <div className="col-md-4">
            {!isBlankHTML(announcements) && (
              <div className="card border-success my-2">
                <div className="card-header bg-success text-white">Announcements</div>
                <div className="card-body custom-html">
                  <ActionText.Content html={announcements} />
                </div>
              </div>
            )}
            {twitter && <Twitter handle={twitter} />}
            {!isBlankHTML(resources) && (
              <div className="card border-success mt-2">
                <div className="card-header bg-success text-white">Cool Sites</div>
                <div className="card-body custom-html">
                  <ActionText.Content html={resources} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Home.propTypes = {
  page: PropTypes.shape({
    content: PropTypes.string.isRequired
  }).isRequired
};

export default Home;
