import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getAll as getArticles} from "app/requests/articles";
import {ActionText} from "components/helpers";
import {Loading} from "components/pages";
import {isBlankHTML} from "lib/string";
import Section from "./section";

const oldDate = new Date().setFullYear(new Date().getFullYear() - 1);
const isOld = ({month, year}) => (oldDate > new Date(year, month - 1));
const newDate = new Date().setMonth(new Date().getMonth() - 2);
const isNew = ({month, year}) => (newDate < new Date(year, month - 1));

function Articles({page}) {
  const [sections, setSections] = useState(null);

  useEffect(() => {
    getArticles().then(({articles, categories}) => {
      const newArticles = [];
      const oldArticles = [];
      const currentArticles = {};
      const data = [];

      articles.forEach((article) => {
        if(isOld(article)) { return oldArticles.push(article); }
        if(isNew(article)) { newArticles.push(article); }
        if(!currentArticles[article.category_id]) { currentArticles[article.category_id] = []; }

        currentArticles[article.category_id].push(article);
      });

      if(newArticles.length > 0) { data.push({articles: newArticles, heading: "Newest Articles", id: "newest-articles"}); }

      categories
        .sort(({rank: rankA}, {rank: rankB}) => rankA - rankB)
        .filter(({id}) => currentArticles[id])
        .forEach(({id, name: heading}) => data.push({articles: currentArticles[id], heading, id: `category-${id}`}));

      if(oldArticles.length > 0) { data.push({articles: oldArticles, heading: "Archive", id: "articles-archive"}); }

      setSections(data);
    });
  }, []);

  if(!sections) { return <Loading />; }

  const onChange = ({target: {value}}) => {
    if(!value) { return; }

    window.location.href = "#article";
    window.location.href = value;
  };

  return (
    <div className="container-fluid" id="top">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {!isBlankHTML(page.content) && (
            <div className="custom-html text-center">
              <ActionText.Content html={page.content} />
            </div>
          )}
          <div>
            <select className="form-control mx-auto w-auto" onChange={onChange}>
              <option value="">Skip to Category</option>
              {sections.map(({heading, id}) => <option key={id} value={`#${id}`}>{heading}</option>)}
            </select>
          </div>
          {sections.map(({articles, heading, id}) => (
            <Section key={id} articles={articles} heading={heading} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
}

Articles.propTypes = {
  page: PropTypes.shape({
    content: PropTypes.string.isRequired
  }).isRequired
};

export default Articles;
