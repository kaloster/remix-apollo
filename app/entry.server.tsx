import { getDataFromTree } from "@apollo/client/react/ssr";
import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { ServerStyleSheet } from "styled-components";

interface Request {
  headers: Record<string, string>;
  credentials: string | undefined;
  url: string
}

export default function handleRequest(
  request: Request, 
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: "https://countries.trevorblades.com/graphql",
      headers: request.headers,
      credentials: request.credentials ?? "same-origin", 
    }),
  });
  

  const App = (
    <ApolloProvider client={client}>
      <RemixServer context={remixContext} url={request.url} />
    </ApolloProvider>
  );

  return getDataFromTree(App).then(() => {
    const initialState = client.extract();
    const sheet = new ServerStyleSheet();

    let markup = renderToString(
      sheet.collectStyles(<>
        {App}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(
              initialState
            ).replace(/</g, "\\u003c")}`, // replaces < and script tags to prevent cross site scripting
          }}
        />
      </>)
    );
    const styles = sheet.getStyleTags();
    markup = markup.replace("__STYLES__", styles);
    responseHeaders.set("Content-Type", "text/html");

    return new Response("<!DOCTYPE html>" + markup, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  });
}