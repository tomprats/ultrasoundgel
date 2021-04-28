import {useContext} from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import {Context} from "app";
import * as Layout from "components/layout";
import * as Pages from "components/pages";

export default function Router() {
  const [{app, pages, user}] = useContext(Context);

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
                <Route path="/episodes/:uid" component={Pages.Episodes.Show} />
                <Route path="/profile" component={Pages.Profile} />
                <Route path="/session" component={Pages.Session} />
                {pages.map((page) => (
                  <Route key={page.path} component={Pages.Template} exact={true} path={`/${page.path}`} />
                ))}
                <Route path="/citations" component={Pages.Citations} />
                <Route path="/disclaimer" component={Pages.Disclaimer} />
                {(user && user.admin) ? (
                  <Redirect exact={true} from="/admin" to="/admin/messages" />
                ) : (
                  <Redirect from="/admin" to="/session" />
                )}
                <Route path="/admin/channels/new" component={Pages.Admin.Channels.New} />
                <Route path="/admin/channels/:id/edit" component={Pages.Admin.Channels.Edit} />
                <Route path="/admin/channels" component={Pages.Admin.Channels.List} />
                <Route path="/admin/sections/:id/edit" component={Pages.Admin.Sections.Edit} />
                <Route path="/admin/sections" component={Pages.Admin.Sections.List} />
                <Route path="/admin/users/new" component={Pages.Admin.Users.New} />
                <Route path="/admin/users/:id/edit" component={Pages.Admin.Users.Edit} />
                <Route path="/admin/users" component={Pages.Admin.Users.List} />
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
