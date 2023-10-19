import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
      const [listEmpruntsRetard, setListEmpruntsRetard] = useState([])
      const [listuserLoan, setListuserLoan] = useState([])
      const [listTitleByCategory, setListTitleByCategory] = useState([])
      const [isLoadedCategory, setIsLoadedCategory] = useState(false)
      const [isLoadedLoan, setIsLoadedLoan] = useState(false)
      const [isLoadedUser, setIsLoadedUser] = useState(false)

    useEffect(() => {
      ListeEmpruntsRetard()
      getUserLoan()
      getTitleByCategory("Science-fiction")
    }, [])

    async function ListeEmpruntsRetard() {
      const listEmpruntsRetard = await axios.get('http://localhost:8000/api/user/get/late/loan/list')
        .then(res=> {setListEmpruntsRetard(res.data); setIsLoadedLoan(true)} )
        .catch(err => console.log(err))
    }

    async function getUserLoan() {
      const listuserLoan = await axios.get('http://localhost:8000/api/user/get/user/by/loan')
        .then(res=> {setListuserLoan(res.data); setIsLoadedUser(true)} )
        .catch(err => console.log(err))
    }

    async function getTitleByCategory(title) {
      const listTitleByCategory = await axios.get('http://localhost:8000/api/user/get/title/by/category/' + title)
        .then(res=> {setListTitleByCategory(res.data); setIsLoadedCategory(true)} )
        .catch(err => console.log(err))
    }

    let load;
    if (isLoadedLoan && isLoadedUser && isLoadedCategory) {
      load = <div class="container">
        
      <div class="row">
        <div class="col">
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
        </div>
        <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
            </tr>
          </thead>
          <tbody>
          {listuserLoan.payload.map(loan => {
          return (
              <tr>
                <th>{loan.Nom}</th>
                <th>{loan.Prenom}</th>
              </tr>
            )}
          )}
          </tbody>
        </table>
        </div>
        <div>
          {listTitleByCategory.resultList.map(title => {
          return (
              <div>
                <b>
                <p>Titre du livre: {title}</p>
                </b>
              </div>
            )}
          )}
        </div>
      </div>
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
