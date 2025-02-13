export const getNumbersFabric = (length: number) => [...Array.from({ length }, (_, i) => String(i + 1))];

export const kitchenTypes = [
    'Нет кухни',
    'Отдельная кухня',
    'Кухонная зона',
    'Кухня-столовая',
];

export const conditionTypes = [
    'Без ремонта',
    'Косметический ремонт',
    'Евро ремонт',
    'Дизайнерский ремонт',
]