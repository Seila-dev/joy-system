/**
 * Formata data para o formato brasileiro (DD/MM/YYYY)
 * @param dateString Data em formato string (ISO ou outro formato válido)
 * @returns String formatada no padrão DD/MM/YYYY
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    
    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
    
    // Formata para DD/MM/YYYY
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  /**
   * Obtém a data atual em formato ISO (YYYY-MM-DD)
   * @returns String data atual em formato ISO
   */
  export const getCurrentDateISO = (): string => {
    return new Date().toISOString().split('T')[0];
  };
  
  /**
   * Calcula a diferença em dias entre duas datas
   * @param dateA Primeira data
   * @param dateB Segunda data
   * @returns Número de dias entre as datas (resultado absoluto)
   */
  export const daysBetween = (dateA: string | Date, dateB: string | Date): number => {
    const a = new Date(dateA);
    const b = new Date(dateB);
    
    // Converter para UTC para evitar problemas com timezone
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    
    // Calcular diferença em milissegundos e converter para dias
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const difference = Math.floor(Math.abs(utc2 - utc1) / MS_PER_DAY);
    
    return difference;
  };