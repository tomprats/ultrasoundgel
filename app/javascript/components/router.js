import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import * as Layout from "components/layout";
import * as Pages from "components/pages";
import useAppContext from "lib/hooks/use-app-context";

export default function Router() {
  const [{app, pages, user}] = useAppContext();
  const admin = user && user.admin;

  return (
    <BrowserRouter>
      <div className="app">
        {user && user.admin && <Layout.Admin.Navbar />}
        <Layout.Analytics />
        <Layout.Navbar />
        <Layout.Notifications />
        <div className="page d-flex flex-column mb-4">
          <Layout.ErrorBoundary>
            {app.loading ? (
              <Pages.Loading />
            ) : (
              <Switch>
                <Route exact={true} path="/" component={Pages.Template} />
                <Route path="/cases/:uid" component={Pages.Cases.Show} />
                <Route path="/episodes/:uid" component={Pages.Episodes.Show} />
                <Route path="/posts/:uid" component={Pages.Posts.Show} />
                <Route path="/profile" component={Pages.Profile} />
                <Route path="/session" component={Pages.Session} />
                {pages.map((page) => (
                  <Route key={page.path} component={Pages.Template} exact={true} path={`/${page.path}`} />
                ))}
                <Route path="/citations" component={Pages.Citations} />
                <Route path="/disclaimer" component={Pages.Disclaimer} />
                {admin ? (
                  <Redirect exact={true} from="/admin" to="/admin/messages" />
                ) : (
                  <Redirect from="/admin" to="/session" />
                )}
                <Route path="/admin/article-categories/new" component={Pages.Admin.ArticleCategories.New} />
                <Route path="/admin/article-categories/:id" component={Pages.Admin.ArticleCategories.Edit} />
                <Route path="/admin/article-categories" component={Pages.Admin.ArticleCategories.List} />
                <Route path="/admin/articles/new" component={Pages.Admin.Articles.New} />
                <Route path="/admin/articles/:id" component={Pages.Admin.Articles.Edit} />
                <Route path="/admin/articles" component={Pages.Admin.Articles.List} />
                <Route path="/admin/cases/new" component={Pages.Admin.Cases.New} />
                <Route path="/admin/cases/:uid" component={Pages.Admin.Cases.Edit} />
                <Route path="/admin/cases" component={Pages.Admin.Cases.List} />
                <Route path="/admin/channels/new" component={Pages.Admin.Channels.New} />
                <Route path="/admin/channels/:uid" component={Pages.Admin.Channels.Edit} />
                <Route path="/admin/channels" component={Pages.Admin.Channels.List} />
                <Route path="/admin/episodes/new" component={Pages.Admin.Episodes.New} />
                <Route path="/admin/episodes/:uid" component={Pages.Admin.Episodes.Edit} />
                <Route path="/admin/episodes" component={Pages.Admin.Episodes.List} />
                <Route path="/admin/pages/new" component={Pages.Admin.Pages.New} />
                <Route path="/admin/pages/:id" component={Pages.Admin.Pages.Edit} />
                <Route path="/admin/pages" component={Pages.Admin.Pages.List} />
                <Route path="/admin/posts/new" component={Pages.Admin.Posts.New} />
                <Route path="/admin/posts/:uid" component={Pages.Admin.Posts.Edit} />
                <Route path="/admin/posts" component={Pages.Admin.Posts.List} />
                <Route path="/admin/sections/:id" component={Pages.Admin.Sections.Edit} />
                <Route path="/admin/sections" component={Pages.Admin.Sections.List} />
                <Route path="/admin/stats" component={Pages.Admin.Stats.List} />
                <Route path="/admin/uploads" component={Pages.Admin.Uploads.List} />
                <Route path="/admin/users/:id" component={Pages.Admin.Users.Edit} />
                <Route path="/admin/users" component={Pages.Admin.Users.List} />
                {!admin && <Redirect from="/preview" to="/session" />}
                <Route path="/preview/cases/:uid" component={Pages.Preview.Cases.Show} />
                <Route path="/preview/cases" component={Pages.Preview.Cases.List} />
                <Route path="/preview/episodes/:uid" component={Pages.Preview.Episodes.Show} />
                <Route path="/preview/episodes" component={Pages.Preview.Episodes.List} />
                <Route path="/preview/posts/:uid" component={Pages.Preview.Posts.Show} />
                <Route path="/preview/posts" component={Pages.Preview.Posts.List} />
                <Route component={Pages.NotFound} />
              </Switch>
            )}
          </Layout.ErrorBoundary>
          <Layout.Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
