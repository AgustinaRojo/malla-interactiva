const materias = document.querySelectorAll('.materia');

materias.forEach(boton => {
  boton.addEventListener('click', () => {
    if (boton.classList.contains('bloqueada')) return;

    // ✅ Restricción adicional: no permitir aprobación si ciclo básico no está completo
    const cicloBasicoRestrictivo = [
      "aspectosLegales",
      "softwareLibre", "bioinformatica", "politicasPublicas", "seminarios",
      "videojuegos", "basesDatosII", "sig", "derechosDigitales", "ludificacion",
      "semanticaLenguajes", "redesNeuronales", "programacionCuantica",
      "cienciasDatos", "cienciaCiudadana", "calidadSoftware"
    ];

    const cicloBasicoFull = [
      "elementos", "lectura", "matematicas",
      "matematicaI", "introProg", "orgComp",
      "estructuraDatos", "progObjetosI", "basesDatos",
      "matematicaII", "progObjetosII", "redesComp", "sistemasOperativos", "progFuncional",
      "interfaces", "algoritmos", "persistencia", "labSistemas"
    ];

    const cicloCompleto = cicloBasicoFull.every(id => {
      return document.querySelector(`.materia[data-id="${id}"]`)?.classList.contains('aprobada');
    });

    if (!cicloCompleto && cicloBasicoRestrictivo.includes(boton.dataset.id)) {
      return;
    }

    // ✅ Aprobar visualmente
    boton.classList.add('aprobada');
    const id = boton.dataset.id;

    // ✅ Desbloquear materias dependientes
    materias.forEach(materia => {
      const requisitos = materia.dataset.prerrequisitos?.split(',') || [];
      const todosAprobados = requisitos.every(req => {
        return document.querySelector(`.materia[data-id="${req}"]`)?.classList.contains('aprobada');
      });

      if (materia.classList.contains('bloqueada') && todosAprobados) {
        materia.classList.remove('bloqueada');
      }
    });

    // ✅ Al completar ciclo básico, desbloquear materias adicionales
    if (cicloCompleto) {
      document.querySelectorAll('[data-id="aspectosLegales"], #nucleo-complementario .materia').forEach(m => {
        m.classList.remove('bloqueada');
      });

      const noti = document.getElementById('notificacion-exito');
      if (noti && noti.style.display === 'none') {
        noti.style.display = 'block';
        setTimeout(() => {
          noti.style.display = 'none';
        }, 4000);
      }
    }
  });
});
