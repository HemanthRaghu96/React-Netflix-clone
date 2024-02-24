
import Row from "./Row";
import requests from "./requests";

function App() {
  const data = [
    { title: "Trending", fetchUrl: requests.fetchTrending },
    { title: "Top Rated", fetchUrl: requests.fetchTopRated },
    { title: "Action Movies", fetchUrl: requests.fetchActionMovies },
    { title: "Comedy Movies", fetchUrl: requests.fetchComedyMovies },
    { title: "Horror Movies", fetchUrl: requests.fetchHorrorMovies },
    { title: "Romance Movies", fetchUrl: requests.fetchRomanceMovies },
    { title: "Documentaries", fetchUrl: requests.fetchDocumentaries }
  ];
  return (
    <div className="bg-black">
      {data.map((item, index) => (
  <Row key={index} title={item.title} fetchUrl={item.fetchUrl} />
))}

    </div>
  );
}

export default App;
