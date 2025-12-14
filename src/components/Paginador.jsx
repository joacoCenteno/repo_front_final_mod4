import React from 'react'

const Paginador = ({pagina, paginacion, filtradoo}) => {
      if (!paginacion) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-4 text-[#5c6b8a]">

      <button
        disabled={pagina === 1}
        onClick={() => filtradoo(pagina - 1)}
        className={`hover:text-[#91dbfd] cursor-pointer ${
          pagina === 1 ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        Anterior
      </button>

      <span className="mx-2">
        Página {paginacion.page} de {paginacion.pages}
      </span>

      <button
        disabled={pagina === paginacion.pages}
        onClick={() => filtradoo(pagina + 1)}
        className={`hover:text-[#91dbfd] cursor-pointer ${
          pagina === paginacion.pages ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        Siguiente
      </button>

    </div>
  );
}

export default Paginador