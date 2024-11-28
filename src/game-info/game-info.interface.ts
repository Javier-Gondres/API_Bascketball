export interface GameInfo {
  CodJuego: string;
  FechaJuego: string;
  EquipoLocal: string;
  EquipoVisitante: string;
  ResultadoEquipoLocal: string;
  ResultadoEquipoVisitante: string;
}

export interface EstadisticaJugador {
  Equipo: string;
  Jugador: string;
  Puntos: number;
  Asistencias: number;
  Rebotes: number;
  'Bolas Robadas': number;
  Faltas: number;
  Tecnicas: number;
  'Bolas Perdidas': number;
}

export interface TotalesEquipo {
  Equipo: 'Visitantes' | 'Local';
  Total: 'Total'; // Este campo será "Total"
  Puntos: number;
  Asistencias: number;
  Rebotes: number;
  'Bolas Robadas': number;
  Faltas: number;
  Tecnicas: number;
  'Bolas Perdidas': number;
}

export interface EstadisticasDelJuegoResponse {
  gameInfo: GameInfo;
  estadisticasEquipoLocal: EstadisticaJugador[];
  totalesEquipoLocal: TotalesEquipo;
  estadisticasEquipoVisitante: EstadisticaJugador[];
  totalesEquipoVisitante: TotalesEquipo;
}
