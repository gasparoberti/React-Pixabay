import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {
  state = {
    termino : '',
    imagenes : [], 
    pagina : ''
  }

  scroll = () => {
    const elemento= document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');

  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;
    
    if (pagina===1) return null;

    pagina--;

    this.setState({pagina},
      () => {
        this.consultarApi();
        this.scroll();
      });

    // console.log(pagina);
  }
  
  paginaSiguiente = () => {
    let pagina = this.state.pagina;
    
    pagina++;

    this.setState({pagina},
      () => {
        this.consultarApi();
        this.scroll();
      });

    // console.log(pagina);
  }

  datosBusqueda= (termino) => {
    // console.log(termino);
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url= `https://pixabay.com/api/?key=15263025-4b92212a1a574cf596a245571&q=${termino}&per_page=30&page=${pagina}`;
    // console.log(url);
    fetch(url)
    .then(respuesta => respuesta.json() )
    .then(resultado => this.setState({ imagenes : resultado.hits}) )
  }

  render(){
    return (
      <div className="app container">
        <div className="jumbotron">
          <h2 className="text-center">Buscador de imágenes</h2>
          <br/>
          <Buscador
            datosBusqueda={this.datosBusqueda}/>
        </div>
        <div className="row justify-content-center">
            <Resultado
              imagenes = {this.state.imagenes}
              paginaAnterior = {this.paginaAnterior}
              paginaSiguiente = {this.paginaSiguiente}
            />
        </div>
        
      </div>
    );
  }
}

export default App;
