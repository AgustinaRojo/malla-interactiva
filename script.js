const materias = document.querySelectorAll('.materia');

// Al hacer clic en una materia
materias.forEach(boton => {
  boton.addEventListener('click', () => {
    if (boton.classList.contains('bloqueada')) return;

    // Aprobar visualmente
    boton.classList.add('aprobada');

    const id = boton.dataset.id;

    // Desbloquear materias que dependen de esta
    materias.forEach(materia => {
      const requisitos = materia.dataset.prerrequisitos?.split(',') || [];
      const todosAprobados = requisitos.every(req => {
        return document.querySelector(`.materia[data-id="${req}"]`)?.classList.contains('aprobada');
      });

      if (materia.classList.contains('bloqueada') && todosAprobados) {
        materia.classList.remove('bloqueada');
      }
    });

    // 🔍 Verificar si se completó TODO el Núcleo Básico
    const idsNucleoBasico = [
      "matematicaI", "introProg", "orgComp",
      "estructuraDatos", "progObjetosI", "basesDatos",
      "matematicaII", "progObjetosII", "redesComp", "sistemasOperativos", "progFuncional"
    ];

    const nucleoCompleto = idsNucleoBasico.every(id => {
      return document.querySelector(`.materia[data-id="${id}"]`)?.classList.contains('aprobada');
    });

    // 🔓 Desbloquear Núcleo Complementario y Aspectos Legales
    if (nucleoCompleto) {
      document.querySelectorAll('[data-id="aspectosLegales"], #nucleo-complementario .materia').forEach(m => {
        m.classList.remove('bloqueada');
      });
    }
  });
});
