export interface Grade {
  id: string
  name: string
  isBaseGrade: boolean
  grades: { [key: string]: string }
}

const FONT: Grade = {
  id: 'Fontainebleau',
  name: 'Fontainebleau',
  isBaseGrade: true,
  grades: {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '4+': '4+',
    '5': '5',
    '5+': '5+',
    '6A': '6A',
    '6A+': '6A+',
    '6B': '6B',
    '6B+': '6B+',
    '6C': '6C',
    '6C+': '6C+',
    '7A': '7A',
    '7A+': '7A+',
    '7B': '7B',
    '7B+': '7B+',
    '7C': '7C',
    '7C+': '7C+',
    '8A': '8A',
    '8A+': '8A+',
    '8B': '8B',
    '8B+': '8B+',
    '8C': '8C',
    '8C+': '8C+',
    '9A': '9A',
  },
}

const KIIPEILYAREENA: Grade = {
  id: 'KiipeilyAreena',
  name: 'KiipeilyAreena',
  isBaseGrade: false,
  grades: {
    '1': 'Gray',
    '2': 'Gray',
    '3': 'Gray',
    '4': 'Yellow',
    '4+': 'Yellow',
    '5': 'Green',
    '5+': 'Green',
    '6A': 'Orange',
    '6A+': 'Orange',
    '6B': 'Blue',
    '6B+': 'Blue',
    '6C': 'Red',
    '6C+': 'Red',
    '7A': 'Violet',
    '7A+': 'Violet',
    '7B': 'Pink',
    '7B+': 'Pink',
    '7C': 'Black',
    '7C+': 'Black',
    '8A': 'White',
    '8A+': 'White',
    '8B': 'White',
    '8B+': 'White',
    '8C': 'White',
    '8C+': 'White',
    '9A': 'White',
  },
}

export const defaultGrades = {
  Fontainebleau: FONT,
  KiipeilyAreena: KIIPEILYAREENA,
}

export function getGradeCounters(grade: Grade) {
  return [...new Set(Object.values(grade.grades))].map(grade => ({
    grade,
    count: 0,
  }))
}

export function getGradeFromId(id: string) {
  return defaultGrades[id]
}
