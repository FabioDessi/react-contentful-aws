import React, { useState, useEffect } from 'react';
import * as contentful from 'contentful';
import ArticleCard from "./components/ArticleCard";

const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.REACT_APP_CONTENTFUL_ENVIRONMENT
})

function App() {
  const [state, setState] = useState({})

  useEffect(() => {
    const getContent = () => {
      client
        .getEntries({'content_type': 'blogPost'})
        .then((entries) => setState(entries))
    }
    getContent();
  }, [])

  const { items } = state;

  return (
    <div className="App">
      { items && items.map(item => {
        const { title, publishDate, description, slug, heroImage } = item.fields;
        return <ArticleCard key={slug} title={title} publishDate={publishDate} description={description} heroImage={heroImage} />
      })}
    </div>
  );
}

export default App;
