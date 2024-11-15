fetch('http://localhost:3000/peliculas')
  .then(response => response.json())
  .then(data => {


    console.log(data)
    let tab = ``;

    // Loop to access all rows
    for (let r of data) {
      tab += ` 
                        <div class="col-sm-3 mb-5">  
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${r.nombre}</h5>
                                    <p class="card-text">${r.director}</p>
                                    <p class="card-text">${r.clasificacion}</p>
                                </div>  
                            </div>
                        </div> 
               
                    `;

    }


    // Setting innerHTML as tab variable
    document.getElementById("datosregistrados").innerHTML = tab;
  });


  