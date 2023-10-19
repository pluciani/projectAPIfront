import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
      const [listEmpruntsRetard, setListEmpruntsRetard] = useState([])
      const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
      ListeEmpruntsRetard();
    }, [])

    async function ListeEmpruntsRetard() {
      const listEmpruntsRetard = await axios.get('http://localhost:8000/api/user/get/late/loan/list')
        .then(res=> {setListEmpruntsRetard(res.data); setIsLoaded(true)} )
        .catch(err => console.log(err))
    }

    let load;
    if (isLoaded) {
      load = <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">LivreISBN</th>
              <th scope="col">DateEmprunt</th>
              <th scope="col">DateRetourPrevu</th>
            </tr>
          </thead>
          <tbody>
          {listEmpruntsRetard.map(loan => {
          return (
              <tr>
                <th scope='row'>{loan.ID}</th>
                <td>{loan.LivreISBN}</td>
                <td>{loan.DateEmprunt}</td>
                <td>{loan.DateRetourPrevu}</td>
              </tr>
            )}
          )}
          </tbody>
        </table>
        </div>;
    } else {
      load = <p></p>;
    }

  return (
    <div className="App">
      {load}
     
    </div>
      );
}

export default App;
