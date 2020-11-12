import "./App.css"
import { gql, useQuery } from "@apollo/client"

const GET_LAUNCHES = gql`
  query Launches($limit: Int!) {
    launches(limit: $limit) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`

function App() {
  const { data, loading, error } = useQuery(GET_LAUNCHES, { variables: { limit: 5 } })
  if (loading) return "Loading ..."
  if (error) return `Error: ${error}`
  const launches = data.launches
  console.log(launches)
  return (
    <div>
      {launches.map((launch, i) => (
        <div key={i}>
          <h2>Launch numéro {i + 1}</h2>
          <p>{launch.launch_date_utc}</p>
          <p>{launch.details}</p>
          <a href={launch.links.video_link}>{launch.links.video_link}</a>
          <p>Rocket : {launch.rocket.rocket_name}</p>
          <p>Mission réussie : {launch.launch_success ? "Réussie" : "Echouée"}</p>
        </div>
      ))}
    </div>
  )
}

export default App
